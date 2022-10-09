module.exports = {
   catogory: "music",
   data: {
    name: "btn1",
   },
   run: async function(Bot, interaction, distube) {
  let queue = distube.getQueue(interaction);
  if(!queue) return interaction.reply({ content: "Here is no Queue **Playing!**", ephemeral: true });
  distube.pause(interaction);
  await interaction.reply({ content: `<@${interaction.member.id}>, Used ⏸ to Pause the song` });
 }
}