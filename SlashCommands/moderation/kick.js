const Discord = require("discord.js");

module.exports = {
   catogory: "moderation",
   data: new Discord.SlashCommandBuilder()
      .setName("kick")
      .setDescription("You can kick members from server")
      .addUserOption((option) => 
         option.setName("member")
            .setDescription("choose a member You will kick it")
            .setRequired(true))
      .addStringOption((option) => 
         option.setName("reason")
            .setDescription("why are You kick this member?")
            .setRequired(false)),
   run: async function(Bot, interaction) {
  let member = interaction.options.getMember("member");
  let reason = interaction.options.getString("reason");

  if(!reason) reason = "No Reason";

  if(interaction.member.permissions.has(Discord.PermissionsBitField.KickMembers)) {
   if(interaction.member == member) {
    var nope = new Discord.EmbedBuilder()
       .setTitle("Error")
       .setDescription(":x: | You can not kick Yourself")
       .setColor(Discord.Colors.Red)
       .setThumbnail(Bot.user.displayAvatarURL())

    await interaction.reply({ embeds: [nope] });
    return;
   } else if(interaction.guild.owner == member) {
    var wrong = new Discord.EmbedBuilder()
       .setTitle("Error")
       .setDescription(":x: | No one can kick the **Server Owner!**")
       .setColor(Discord.Colors.Red)
       .setThumbnail(Bot.user.displayAvatarURL())

    await interaction.reply({ embeds: [wrong] });
    return;
   } else if(Bot.user.id == member.user.id) {
    var error = new Discord.EmbedBuilder()
       .setTitle("Error")
       .setDescription(":x: | Please Do not kick me")
       .setColor(Discord.Colors.Red)
       .setThumbnail(interaction.user.displayAvatarURL())

    await interaction.reply({ embeds: [error] });
    return;
   } else if(interaction.member.roles.highest < member.roles.highest) {
    var bruh = new Discord.EmbedBuilder()
       .setTitle("Error")
       .setDescription(":x: | This member higher than You! So You can not kick this member")
       .setColor(Discord.Colors.Red)
       .setThumbnail(Bot.user.displayAvatarURL())

    await interaction.reply({ embeds: [bruh] });
    return;
   } else {
    var embed = new Discord.EmbedBuilder()
       .setTitle("Success to kick this member")
       .setDescription(`${member.user.username} Kicked by ${interaction.user.username}\nReason: **${reason}**`)
       .setColor(Discord.Colors.Green)
       .setThumbnail(interaction.guild.iconURL())

    await member.kick({ reason: `${reason}` });
    void interaction.reply({ embeds: [embed] });
   }
  } else {
   interaction.reply({ content: "You do not have **Permission** to use this **Command**, ephemeral: true });
   return;
  }
 }
}
