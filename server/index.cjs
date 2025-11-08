// ===============================
// ✅ SERVER CHAT (Socket.IO + JSON storage)
// ===============================
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const fs = require("fs");
const path = require("path");

// --- Khởi tạo app và server HTTP ---
const app = express();
const server = http.createServer(app);

// --- Cấu hình Socket.IO ---
const io = new Server(server, {
  cors: { origin: "*" }, // Cho phép mọi kết nối (để test dễ)
});

// ===============================
// 🗂️ File JSON lưu tin nhắn
// ===============================
const messagesFile = path.join(__dirname, "messages.json");

// ✅ Nếu file chưa tồn tại, tạo file rỗng {}
if (!fs.existsSync(messagesFile)) {
  fs.writeFileSync(messagesFile, JSON.stringify({}, null, 2), "utf8");
  console.log("🆕 Created new messages.json file");
}

// ===============================
// 🧠 HÀM ĐỌC & GHI FILE
// ===============================
function readMessages() {
  try {
    const raw = fs.readFileSync(messagesFile, "utf8");
    return JSON.parse(raw || "{}");
  } catch (err) {
    console.error("❌ Lỗi đọc file messages.json:", err);
    return {};
  }
}

function saveMessages(data) {
  try {
    fs.writeFileSync(messagesFile, JSON.stringify(data, null, 2), "utf8");
  } catch (err) {
    console.error("❌ Lỗi ghi file messages.json:", err);
  }
}

// ===============================
// ⚡ SOCKET.IO HANDLER
// ===============================
io.on("connection", (socket) => {
  console.log("✅ A user connected:", socket.id);

  // --- Khi user tham gia phòng chat ---
  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log(`📦 Joined room: ${roomId}`);

    const all = readMessages();
    const oldMsgs = all[roomId] || [];

    // ✅ Gửi lại lịch sử tin nhắn cũ cho người vừa join
    socket.emit("messageHistory", oldMsgs);
  });

  // --- Khi user gửi tin nhắn ---
  socket.on("sendMessage", (msg) => {
    console.log("💬 Message received:", msg);

    const all = readMessages();
    if (!all[msg.roomId]) all[msg.roomId] = [];

    const fullMsg = { ...msg, time: new Date().toISOString() };
    all[msg.roomId].push(fullMsg);

    // ✅ Ghi vào file JSON
    saveMessages(all);

    // ✅ Phát lại tin nhắn cho tất cả người trong room
    io.to(msg.roomId).emit("receiveMessage", fullMsg);
  });

  // --- Khi user ngắt kết nối ---
  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

// ===============================
// 🚀 CHẠY SERVER
// ===============================
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
