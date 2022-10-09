const Discord = require("discord.js");
const moment = require("moment");

module.exports = {
   catogory: "info",
   data: new Discord.SlashCommandBuilder()
      .setName("informations")
      .setDescription("Lets Know My Full Informations"),
   run: async function(Bot, interaction, distube) {
  var embed = new Discord.EmbedBuilder()
     .setTitle("Here Is My Full Informations")
     .addFields(
        {name: "Bot Name:", value: `${Bot.user.tag}`},
        {name: "Bot User ID:", value: `${Bot.user.id}`},
        {name: "Bot Libary Name:", value: "Discord.JS"},
        {name: "Bot Libary Version:", value: "v14.1.2"},
        {name: "Bot API Speed:", value: `${Math.round(Bot.ws.ping)}ms`},
        {name: "Bot Created At:", value: `${moment(Bot.user.createdAt).format("DD MMM YYYY")}`},
        {name: "Engine Name:", value: "Replit Engine"},
        {name: "Bot Coded In:", value: "JavaScript (JS)"},
        {name: "Developer Tools:", value: "Node.JS"},
        {name: "Bot Language:", value: "English (United Kingdom)"},
     )
     .setColor(Discord.Colors.Blue)
     .setTimestamp()
     .setThumbnail(Bot.user.displayAvatarURL())

  await interaction.reply({ embeds: [embed] });
 }
}