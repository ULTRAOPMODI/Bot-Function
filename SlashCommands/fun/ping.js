const Discord = require("discord.js");

module.exports = {
   catogory: "fun",
   data: new Discord.SlashCommandBuilder()
      .setName("ping")
      .setDescription("You can See Your Network Speed"),
   run: async function(Bot, interaction, distube) {
  await interaction.reply({ content: `<@${interaction.member.id}>, Your Avarage Network Speed: **${Date.now() - interaction.createdTimestamp}**ms` });
 }
}