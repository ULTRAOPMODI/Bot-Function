const Discord = require("discord.js");
const util = require("minecraft-server-util");

module.exports = {
   catogory: "info",
   data: new Discord.SlashCommandBuilder()
      .setName("java")
      .setDescription("Minecraft Java Edition")
      .addSubcommand((subcommand) => 
         subcommand.setName("status")
            .setDescription("You can see Your Minecraft Java Edition Server's status")
            .addStringOption((option) => 
         option.setName("ip")
            .setDescription("Enter here Server's IP Address")
            .setRequired(true))
      .addNumberOption((option) => 
         option.setName("port")
            .setDescription("Enter here the Server's Port")
            .setRequired(true))),
   run: async function(Bot, interaction, distube) {
  let IP = interaction.options.getString("ip");
  let Port = interaction.options.getNumber("port");

  util.status(IP, {port: Port}).then((res) => {
   var embed = new Discord.EmbedBuilder()
      .setTitle("Minecraft Server Status")
      .addFields(
        {name: "IP Address:", value: `${res.host}`},
        {name: "Port:", value: `${res.port}`},
        {name: "Total Players:", value: `${res.maxPlayers}`},
        {name: "Online Players:", value: `${res.onlinePlayers}`},
        {name: "Version:", value: `${res.version}`},
       )
       .setColor(Discord.Colors.Blue)
       .setTimestamp()

   interaction.reply({ embeds: [embed] });
  }).catch((error) => {
   if(error) console.error(error);
   return;
  });
 }
}