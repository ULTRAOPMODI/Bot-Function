const Discord = require("discord.js");

module.exports = {
   catogory: "fun",
   data: new Discord.SlashCommandBuilder()
      .setName("disconnect")
      .setDescription("Bot can leave Your voice channel"),
   run: async function(Bot, interaction, distube) {
let channel = interaction.member.voice.channel;
if(channel) {
 distube.voices.leave(interaction);
 await interaction.reply({ content: "I Disconnected from VC", ephemeral: true });
  } else {
  return interaction.reply({ content: "You are not in my Voice channel!", ephemeral: true });
  }
 }
}