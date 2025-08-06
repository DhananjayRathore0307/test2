const noteUsers = {}; // Track active users per noteId

export default function initSocket(io) {
  io.on('connection', (socket) => {
    console.log('✅ Socket connected:', socket.id);

    socket.on('join_note', (noteId) => {
      socket.join(noteId);

      // Track active users in this note
      if (!noteUsers[noteId]) noteUsers[noteId] = new Set();
      noteUsers[noteId].add(socket.id);

      // Broadcast updated count
      io.to(noteId).emit('active_users', noteUsers[noteId].size);

      // Handle incoming edits
      socket.on('note_update', ({ noteId, content, editorId }) => {
        socket.to(noteId).emit('note_update', { content, editorId });
      });

      // Cleanup on disconnect
      socket.on('disconnect', () => {
        for (const room in noteUsers) {
          noteUsers[room].delete(socket.id);
          io.to(room).emit('active_users', noteUsers[room].size);
        }
        console.log('❌ Socket disconnected:', socket.id);
      });
    });
  });
}
