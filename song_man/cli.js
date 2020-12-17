const { Client, Attachment } = require("discord.js");
const client = new Client();

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

client.login("NjQ0Mjk0OTk1ODI1Nzg2OTEx.Xcx8kA.YqCq6vY3HfzAX7XNwe1GHP5PnPQ");
module.exports = client;
