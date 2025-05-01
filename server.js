const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Store active sessions
const activeSessions = new Map();

// Socket.IO connection handling
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Handle teacher joining a session
    socket.on('teacher-join', (sessionId) => {
        socket.join(sessionId);
        activeSessions.set(sessionId, {
            teacherId: socket.id,
            students: new Set()
        });
        console.log(`Teacher ${socket.id} joined session ${sessionId}`);
    });

    // Handle student joining a session
    socket.on('student-join', (sessionId) => {
        const session = activeSessions.get(sessionId);
        if (session) {
            socket.join(sessionId);
            session.students.add(socket.id);
            console.log(`Student ${socket.id} joined session ${sessionId}`);
        }
    });

    // Handle pose broadcasting from teacher
    socket.on('broadcast-pose', (data) => {
        const { sessionId, pose } = data;
        socket.to(sessionId).emit('teacher-pose', pose);
    });

    // Handle pose matching from student
    socket.on('pose-match', (data) => {
        const { sessionId, matchScore } = data;
        socket.to(sessionId).emit('match-update', {
            studentId: socket.id,
            matchScore
        });
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        
        // Clean up sessions
        for (const [sessionId, session] of activeSessions.entries()) {
            if (session.teacherId === socket.id) {
                // Teacher disconnected, notify students
                io.to(sessionId).emit('teacher-disconnected');
                activeSessions.delete(sessionId);
            } else if (session.students.has(socket.id)) {
                // Student disconnected
                session.students.delete(socket.id);
                if (session.students.size === 0) {
                    activeSessions.delete(sessionId);
                }
            }
        }
    });
});

// API endpoint for pose broadcasting
app.post('/api/broadcast-pose', (req, res) => {
    const { sessionId, pose } = req.body;
    if (!sessionId || !pose) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const session = activeSessions.get(sessionId);
    if (!session) {
        return res.status(404).json({ error: 'Session not found' });
    }

    // Broadcast pose to all students in the session
    io.to(sessionId).emit('teacher-pose', pose);
    res.json({ success: true });
});

// Start server
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 