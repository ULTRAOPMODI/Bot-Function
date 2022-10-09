const Discord = require("discord.js");

module.exports = {
   catogory: "Music",
   data: new Discord.SlashCommandBuilder()
      .setName("loop")
      .setDescription("You can set repeat mode in queue")
      .addStringOption((option) => 
         option.setName("type")
            .setDescription("Select here which loop You want to set")
            .setRequired(true)
            .addChoices(
         {name: "Off", value: "off"},
         {name: "Song", value: "song"},
         {name: "Queue", value: "queue"}
            )),
   run: async function(Bot, interaction) {
  let mode = interaction.options.getString("type");
  let lua;

  let queue = Bot.distube.getQueue(interaction);
  if(!queue) return interaction.reply({ content: "There is no any queue **Playing!**", ephemeral: true });
           
  switch(mode) {
   case "off":
    lua = 0;
   break;
   case "song":
    lua = 1;
   break;
   case "queue":
    lua = 2;
   break;
  }

  lua = queue.setRepeatMode(lua);
  lua = lua ? (lua === 2 ? "Repeat queue" : "Repeat song") : "Off";
  await interaction.reply({ content: `Set repeat mode to: \`${lua}\``, ephemeral: true });
 }
}