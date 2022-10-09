Discord = require("discord.js");

module.exports = {
   catogory: "music",
   data: new Discord.SlashCommandBuilder()
      .setName("pause")
      .setDescription("You can pause the queue"),
   run: async function(Bot, interaction, distube) {
  let queue = distube.getQueue(interaction);
  if(!queue) {
   return interaction.reply({ content: "There has no Song", ephemeral: true });
  }

  queue.pause(interaction);
           
  await interaction.reply({ content: "Queue paused by ```/pause``` **Slash Command!**" });
 }
}