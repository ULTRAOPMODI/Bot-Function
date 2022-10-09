module.exports = {
   catogory: "music",
   data: {
    name: "btn2",
   },
   run: async function(Bot, interaction, distube) {
  let queue = distube.getQueue(interaction);
  if(!queue) return interaction.reply({ content: "Here is no Queue **Playing!**", ephemeral: true });
  distube.resume(interaction);
  await interaction.reply({ content: `<@${interaction.member.id}>, Used ▶️ to Resume the song` });
 }
}