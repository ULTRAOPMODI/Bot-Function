const Discord = require("discord.js");
const search = require("yt-search");

module.exports = {
   catogory: "fun",
   data: new Discord.SlashCommandBuilder()
      .setName("youtube")
      .setDescription("Search YouTube Videos From YouTube")
      .addStringOption(option => 
         option.setName("search")
            .setDescription("Enter Your Video Name")
            .setRequired(true)),
   run: async function(Bot, interaction, distube) {
  let result = interaction.options.getString("search");
  let iostream = await search(`${result}`);

  let videos = iostream.videos[0].slice( 0, 3 );
  videos.forEach(async function( v ) {
   var embed = new Discord.EmbedBuilder()
      .setTitle("The Result")
      .addFields(
        {name: "Video Duration:", value: `${v.timestamp}`},
        {name: "Author Name:", value: `${v.author.name}`}
      )
      .setDescription(`**[${v.title}](${v.url})**\n\n\n${v.description}`)
      .setColor(Discord.Colors.Red)
      .setImage(v.image)

   var raw = new Discord.ActionRowBuilder()
      .addComponents(
        new Discord.ButtonBuilder()
         .setLabel("Watch This Video")
         .setStyle(Discord.ButtonStyle.Link)
         .setURL(`${v.url}`)
      )

    await interaction.reply({ embeds: [embed], components: [raw] });
  });
 }
}