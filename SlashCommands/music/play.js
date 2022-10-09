const Discord = require("discord.js");

module.exports = {
   catogory: "music",
   data: new Discord.SlashCommandBuilder()
      .setName("play")
      .setDescription("Play music in voice channel")
      .addStringOption((option) => 
         option.setName("search")
            .setDescription("Enter here Your song name")
            .setRequired(true)),
   run: async function(Bot, interaction, distube) {
  let type = interaction.options.getString("search");
  let channel = interaction.member.voice.channel;

  if(channel) {
   distube.play(channel, type, {
    interaction,
    textChannel: interaction.channel,
    member: interaction.member,
   });
  } else {
   return interaction.reply({ content: "You are not any Voice Channel. Please join voice channel fist", ephemeral: true });
  }
  await interaction.reply({ content: "Let me Play The Song", ephemeral: true });
 }
}