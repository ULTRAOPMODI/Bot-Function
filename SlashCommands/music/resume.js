Discord = require("discord.js");

module.exports = {
   catogory: "music",
   data: new Discord.SlashCommandBuilder()
      .setName("resume")
      .setDescription("You can resume the queue"),
   run: async function(Bot, interaction, distube) {
  let queue = distube.getQueue(interaction);
  if(!queue) {
   return interaction.reply({ content: "There has no Song", ephemeral: true });
  }

  queue.resume(interaction);
           
  await interaction.reply({ content: "Queue resumed by ```/resume``` **Slash Command!**" });
 }
}