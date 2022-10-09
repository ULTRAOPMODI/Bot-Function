const Discord = require("discord.js");

module.exports = {
   catogory: "music",
   data: new Discord.SlashCommandBuilder()
      .setName("volume")
      .setDescription("You can change the song's volume")
      .addNumberOption((option) => 
         option.setName("number")
            .setDescription("Enter Here Volume Number")
            .setRequired(true)),
   run: async function(Bot, interaction, distube) {
  let queue = distube.getQueue(interaction);
  if(!queue) {
   return interaction.reply({ content: "There has no Song", ephemeral: true });
  }
           
  let volume = interaction.options.getNumber("number");

   if(volume > 100) return interaction.reply({ content: "Please enter valid numbers. Number limit **100**", ephemeral: true });

  queue.setVolume(volume);
           
  await interaction.reply({ content: `Volume set: **${volume}%**` });
 }
}