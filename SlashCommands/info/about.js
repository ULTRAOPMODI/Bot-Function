const Discord = require("discord.js");
const moment = require("moment");

module.exports = {
   catogory: "info",
   data: new Discord.SlashCommandBuilder()
      .setName("user-info")
      .setDescription("Lets Know all Users Info")
      .addUserOption(option => 
         option.setName("user")
            .setDescription("Choose a User You Want To See His/Her Informations")
            .setRequired(true)),
   run: async function(Bot, interaction, distube) {
  let member = interaction.options.getMember("user");

  let statuses = {
   online: "Online",
   dnd: "Do Not Disturb",
   idle: "Idle",
   offline: "offline/Invisible",
  };

  var embed = new Discord.EmbedBuilder()
     .setTitle("Here Is This User's Informations")
     .addFields(
   {name: "Username:", value: `${member.user.tag}`},
   {name: "User ID:", value: `${member.user.id}`},
   {name: "User Status:", value: `${statuses[member.presence.status]}`},
   {name: "Joined On Discord:", value: `${moment(member.user.createdAt).format("DD MMM YYYY")}`},
   {name: "Is Bot:", value: `${member.user.bot}`}
     )
     .setFooter({text: `Requested By ${interaction.user.username}`})
     .setColor(Discord.Colors.Blue)
     .setThumbnail(member.user.displayAvatarURL())
           
  await interaction.reply({ embeds: [embed] });
 }
}