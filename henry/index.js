require("dotenv").config();
const { Client, MessageAttachment, ReactionCollector } = require("discord.js");
const client = new Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });
const sqlite3 = require("sqlite3").verbose();
const guildId = process.env.GUILD_ID;
const locationRoles = ["LA", "SF", "NY", "SEA", "BER", "ATL"];
const locationIdSql = "SELECT id FROM reaction_messages where role='location'";
const henry_token = process.env.HENRY_TOKEN;
let db = new sqlite3.Database("./henry.db", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the henry database.");
});

client.on("ready", async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  //  client.guilds.cache.forEach(async g => {
  //            if (g.id !== '643355916959219722') return
  //            try {
  //                          await g.fetchInvites().then(gi => gi.map(m => console.log(m.code, m.uses)))
  //                        } catch (e) {
  //                                      console.log(e);
  //                                    }
  // });
});

client.on("guildMemberAdd", (member) => {
  const raptorHatchGif =
    "https://thumbs.gfycat.com/MemorableDefiniteAmericancrocodile-size_restricted.gif";
  const attachment = new MessageAttachment(raptorHatchGif);
  member.guild.channels.cache
    .find((c) => c.name === "hatchery")
    .send(`aww hello! ${member.user}`, attachment);
});

client.on("message", (msg) => {
  console.log(msg);
  if (msg.content.includes("change lid")) {
    const lid = msg.content.split(":")[1].trim();
    const sql = `UPDATE reaction_messages SET id=? where role='location'`;
    db.run(sql, [lid], function (err) {
      if (err) {
        return console.log(err.message);
      }
      // get the last insert id
      console.log(`A row has been inserted with rowid ${this.lastID}`);
    });
  }
});

client.on("messageReactionAdd", async (reaction, user) => {
  db.serialize(() => {
    db.each(locationIdSql, (err, row) =>
      processEmoji(row.id, reaction, user, guildId, "add")
    );
  });
});

client.on("messageReactionRemove", (reaction, user) => {
  db.serialize(() => {
    db.each(locationIdSql, (err, row) =>
      processEmoji(row.id, reaction, user, guildId, "remove")
    );
  });
});

client.login(henry_token);

async function processEmoji(lId, reaction, user, guildId, method) {
  if (reaction.message.id !== lId) return;
  const locationTag = `${reaction._emoji.name.replace("_RAPTOR", "")}`;
  if (!locationRoles.includes(locationTag)) return reaction.remove();
  const guild = client.guilds.cache.find((g) => g.id === guildId);
  if (locationRoles.includes(locationTag)) {
    const member = guild.members.cache.get(user.id);
    member.roles[method](guild.roles.cache.find((r) => r.name === locationTag));
  }
}
process.on("SIGINT", () => {
  db.close();
});
