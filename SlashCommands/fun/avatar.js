const Discord = require("discord.js");

module.exports = {
   catogory: "fun",
   data: new Discord.SlashCommandBuilder()
      .setName("avatar")
      .setDescription("You will Get Your avatar logo with Image")
      .addUserOption(option => 
         option.setName("user")
            .setDescription("Choose a User You Want To See His/Her Logo")
            .setRequired(true)),
   run: async function(Bot, interaction, distube) {
  let logo = interaction.options.getMember("user");

  let embed = new Discord.EmbedBuilder()
     .setTitle("Here Is The Avatar Image")
     .setImage(logo.user.displayAvatarURL({size: 1024, format: "png", dynamic: true}))
     .setTimestamp()
     .setColor(Discord.Colors.Green)

  await interaction.reply({ embeds: [embed] });
 }
}