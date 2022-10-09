module.exports = {
   data: {
  name: "gooo",
 },
   run: async function(Bot, interaction, distube) {
  let queue = distube.getQueue(interaction);
  if(!queue) return interaction.reply({ content: "Here is no Queue **Playing!**", ephemeral: true });

  if(queue.volume < 1) {
   void interaction.reply({ content: "You can not mute the queue!", ephemeral: true });
   return;
  } else if(queue.volume > 100) {
   void interaction.reply({ content: "You can set volume maximum **100%**", ephemeral: true });
   return;
  } else {
   await queue.setVolume(queue.volume += 1);
   await interaction.reply({ content: `Volume set to **${queue.volume}%**`, ephemeral: true });
  }
 }
}