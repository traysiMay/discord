require("dotenv").config();
const { Client, Attachment, ReactionCollector } = require("discord.js");
const io = require("socket.io");
const server = io.listen(3000);

server.on("connection", function (socket) {
  console.log("user connected");
  socket.emit("welcome", "welcome man");

  const client = new Client({ partials: ["MESSAGE", "REACTION"] });
  const guildId = process.env.GUILD_ID;
  const token = process.env.TOKEN;
  client.on("ready", async () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });

  client.on("message", (msg) => {
    if (msg.content.includes("!")) {
      socket.emit("new_song", msg.content.replace("!", ""));
    }
  });

  client.login(token);

  process.on("SIGINT", () => {
    db.close();
  });
});
