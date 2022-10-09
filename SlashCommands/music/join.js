const Discord = require("discord.js");

module.exports = {
   catogory: "music",
   data: new Discord.SlashCommandBuilder()
      .setName("join")
      .setDescription("Bot can Join Voice Channels"),
   run: async function(Bot, interaction, distube) {
  let channel = interaction.member.voice.channel;
  if(channel) {
   distube.voices.join(channel);
   await interaction.reply({ content: "Successfully Joined the Voice Channel!" });
  } else {
   return interaction.reply({ content: `<@${interaction.user.id}>, You need to join voice channel first`, ephemeral: true });
  }
 }
}