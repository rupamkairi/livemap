import { createServer } from "http";
import app from "./app";
import { Server, Socket } from "socket.io";
import { instrument } from "@socket.io/admin-ui";

const server = createServer(app);

export const socketEvents = {
  createRoom: "create-room",
  joinRoom: "join-room",
  sendToRoom: "send-to-room",
  broadcastToRoom: "broadcast-to-room",
};

// const agentId = "66eb0e871acdc16eb4f6407b";

const io = new Server(server, {
  cors: {
    origin: ["https://admin.socket.io"],
    credentials: true,
  },
});
io.on("connection", (socket) => {
  // createDummyRoom(socket);
  console.log("A user connected", socket.id);

  socket.on(socketEvents.createRoom, (data) => {
    socket.join("ROOM_" + data.agentId);
    console.log("create-room event received", socket.id);
  });

  socket.on(socketEvents.joinRoom, (data) => {
    socket.join("ROOM_" + data.agentId);
    console.log("join-room event received", socket.id);
  });

  socket.on(socketEvents.sendToRoom, (data) => {
    console.log(
      "send received, broadcasting to",
      "ROOM_" + data.agentId,
      socket.id
    );
    socket.to("ROOM_" + data.agentId).emit(socketEvents.broadcastToRoom, data);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
  });
});

instrument(io, {
  auth: false,
});

const port = process.env.PORT || 8000;
server.listen(8000, () => {
  console.log(`Server is running on port ${port}`);
});
