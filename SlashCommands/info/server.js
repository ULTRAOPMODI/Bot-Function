const Discord = require("discord.js");
const moment = require("moment");

module.exports = {
   catogory: "info",
   data: new Discord.SlashCommandBuilder()
      .setName("server-info")
      .setDescription("Lets Know This Server Info"),
   run: async function(Bot, interaction, distube) {

  var embed = new Discord.EmbedBuilder()
     .setTitle("Here Full Informations Of This Server")
     .addFields(
   {name: "Server Name:", value: `${interaction.guild.name}`},
   {name: "Server ID:", value: `${interaction.guild.id}`},
   {name: "Server Created At:", value: `${moment(interaction.guild.createdAt).format("DD MMM YYYY")}`},
   {name: "Server Total Members:", value: `${interaction.guild.memberCount} Members`}
     )
     .setTimestamp()
     .setThumbnail(interaction.guild.iconURL())
     .setImage(interaction.guild.iconURL())
     .setColor(Discord.Colors.Blue)

  await interaction.reply({ embeds: [embed] });
 }
}