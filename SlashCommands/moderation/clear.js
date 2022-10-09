const Discord = require("discord.js");

module.exports = {
   catogory: "moderation",
   data: new Discord.SlashCommandBuilder()
      .setName("clear")
      .setDescription("Use for instant delete messages")
      .addNumberOption((option) => 
         option.setName("value")
            .setDescription("Enter here specify value to delete messages")
            .setRequired(true)),
   run: async function(Bot, interaction, distube) {
  let msgs = interaction.options.getNumber("value");
  var embed = new Discord.EmbedBuilder()
        .setTitle("Deleted Messages")
        .setDescription("I cleared messages")
        .setColor(Discord.Colors.Green)
        .setThumbnail(interaction.user.displayAvatarURL())

  var error = new Discord.EmbedBuilder()
        .setTitle("Error")
        .setDescription("You do not have **Permission** to use this **Command!**")
        .setColor(Discord.Colors.Red)

  if(interaction.member.permissions.has(Discord.PermissionsBitField)) {
   await interaction.bulkDelete(msgs);
   await interaction.reply({ embeds: [embed], ephemeral: true });
  } else {
   await interaction.reply({ embeds: [error], ephemeral: true });
   return;
  }
 }
}