import express from "express";
import { WebSocketServer, WebSocket } from "ws";
import { createServer } from "http";
import cors from "cors";

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });
const PORT = 8080;

// data
const messages = [];
const clients = [];

// express app setup
app
  .use(cors())
  .use(express.json())

  .get("/", (req, res) =>
    res.send("Hello from Express, go to /messages to see all messages"),
  )

  .get("/messages", (req, res) => res.send(messages))

  .post("/message", (req, res) => {
    try {
      let newMessage = req.body
      console.log('New message posted:', newMessage)
      messages.push(newMessage);

      // Важный момент! Уведомляем всех ожидающих клиентов о новом сообщении
      notifyAllClients(newMessage);

      res.send({ status: "success", messages });
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  })

  // Маршрут для ожидания сообщений (Long Polling)
  .get("/wait-for-new-message", (req, res) => {
    // Сохраняем объект ответа, чтобы ответить на него позже
    clients.push(res);

    // (Опционально) Таймаут, чтобы клиент не ждал вечно
    req.on("close", () => {
      // Если клиент закрыл соединение, удаляем его из очереди
      const index = clients.indexOf(res);
      if (index !== -1) clients.splice(index, 1);
    });
  })


// wss setup
wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", (message) => {
    const newMessage = JSON.parse(message+'');
    console.log(newMessage);
    messages.push(newMessage);

    // Отправка сообщения всем ожидающим клиентам
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(`${message}`);
      }
    });
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });

  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
  console.log(`WebSocket server on ws://localhost:${PORT}`);
});


// Функция для уведомления всех клиентов
function notifyAllClients(newMessage) {
  // Отправляем сообщение каждому клиенту, который ждет
  clients.forEach((res) => {
    res.json({ newMessage }); // Отправляем новое сообщение всем ожидающим клиентам
  });
  // Очищаем массив, так как на каждый ответ клиент подключится заново
  clients.length = 0;
}

