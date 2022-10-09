module.exports = {
   catogory: "music",
   data: {
    name: "btn3",
   },
   run: async function(Bot, interaction, distube) {
  let queue = distube.getQueue(interaction);
  if(!queue) return interaction.reply({ content: "Here is no Queue **Playing!**", ephemeral: true });
  distube.stop(interaction);
  distube.voices.leave(interaction);
  await interaction.reply({ content: `<@${interaction.member.id}>, Used ⏹️ to Stop the song` });
 }
}