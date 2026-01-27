const { Server } = require("socket.io");
const { socketauthMiddleware } = require("../middleware/socket.auth.middleware");

function connectSocket(server) {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            credentials: true,
        },
    });

    const userSocketMap = {};

    function getReceiverSocketId(userId) {
        return userSocketMap[userId];
    }

    io.use(socketauthMiddleware);

    io.on("connection", (socket) => {
        const userId = socket.user?.id || socket.userId;
        const fullName = socket.user?.fullName || "Unknown User";

        console.log("A user connected:", fullName);

        // overwrite old socket if exists
        userSocketMap[userId] = socket.id;

        io.emit("presence:getOnlineUsers", Object.keys(userSocketMap));

        socket.on("disconnect", () => {
            console.log("A user disconnected:", fullName);
            delete userSocketMap[userId];
            io.emit("presence:getOnlineUsers", Object.keys(userSocketMap));
        });
    });

    return { io, getReceiverSocketId };
}

module.exports = connectSocket;