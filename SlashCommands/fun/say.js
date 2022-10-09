const Discord = require("discord.js");

module.exports = {
   catogory: "fun",
   data: new Discord.SlashCommandBuilder()
      .setName("say")
      .setDescription("Reponse With Your Input")
      .addStringOption(option => 
         option.setName("input")
            .setDescription("Enter Here Your Message")
            .setRequired(true)),
   run: async function(Bot, interaction, distube) {
  let jar = interaction.options.getString("input");

  await interaction.reply(jar);
 }
}