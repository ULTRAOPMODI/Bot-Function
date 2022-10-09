const Discord = require("discord.js");
const weather = require("weather-js");

module.exports = {
   catogory: "info",
   data: new Discord.SlashCommandBuilder()
      .setName("weather")
      .setDescription("You can see Your location's weather info")
      .addStringOption((option) => 
         option.setName("location")
            .setDescription("Enter Your Location Name")
            .setRequired(true)),
   run: async function(Bot, interaction, distube) {
  let local = interaction.options.getString("location");

  weather.find({search: local, degreeType: "C"}, function(result, error) {
   if(error) return interaction.reply(error);

   let current = result[0].current;

   if(result.length === 0) return interaction.reply({ content: "**Invalid** Location. Please Enter a Valid Location.", ephemeral: true });
          
   var embed = new Discord.EmbedBuilder()
      .setTitle("Weather Information")
      .addFields(
   {name: "Degree Type:", value: "Celsius (°C)"},
   {name: "Tamperature:", value: `${current.tamperature}°`},
   {name: "Feels Like:", value: `${current.feelslike}°`},
   {name: "Humidity:", value: `${current.humidity}%`},
   {name: "Sky Text:", value: `${current.skytext}`},
   {name: "Wind:", value: `${current.winddisplay}`},
      )
      .setFooter({text: "Google Weather"})
      .setThumbnail(Bot.user.displayAvatarURL())
      .setImage(current.imageUrl)

    interaction.reply({ embeds: [embed] });
  });
 }
}