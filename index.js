const Discord = require("discord.js");
const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord.js");
const { DisTube } = require("distube");
const { SoundCloudPlugin } = require("@distube/soundcloud");
const { SpotifyPlugin } = require("@distube/spotify");
const { YtDlpPlugin} = require("@distube/yt-dlp");
const config = require("./config.json");

let Bot = new Discord.Client({ intents: 32767 });

Bot.once("ready", async () => {
 console.log(`${Bot.user.tag} Has Been Joined!`);
 Bot.user.setPresence({
  activities: [
   {
    name: `Watching ${Bot.guilds.cache.size} and ${Bot.users.cache.size}`,
    type: Discord.ActivityType.Playing,
   }
  ], 
  status: "online",
 });
 
 let CLIENT_ID = Bot.user.id;
 let GUILD_ID = Bot.guilds.id;
 let rest = new REST({version: "10"}).setToken(config.TOKEN);

 (async () => {
  try {
   if(process.env.ENV === "production") {
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
     body: commands
    })
    consol.log("Successfully Registered Global Commands");
   } else {
    await rest.put(Routes.applicationCommands(CLIENT_ID), {
     body: commands
    })
    console.log("Successfully Registered Local Commands");
   }
  } catch (error) {
   if(error) console.error(error);
   return;
  }
 })();
});

let distube = new DisTube(Bot, {
   plugins: [new YtDlpPlugin({update: true}), new SoundCloudPlugin({update: true}), new SpotifyPlugin()],
   searchSongs: 5,
   searchCooldown: 30,
   leaveOnEmpty: false,
   leaveOnStop: false,
   leaveOnFinish: false,
  });

/*
 * Slash Commands Handler Setup
 */

Bot.commands = new Discord.Collection();
const commands = [];
const commandFolders = fs.readdirSync("./SlashCommands");

for(const folder of commandFolders) {
 const commandFiles = fs.readdirSync(`./SlashCommands/${folder}`).filter(file => file.endsWith(".js"));
 for(const file of commandFiles) {
  const command = require(`./SlashCommands/${folder}/${file}`);
  commands.push(command.data.toJSON());

  Bot.commands.set(command.data.name, command);
 }
}

/*
 * Button Event Handler Setup
 */

Bot.buttons = new Discord.Collection();
const buttonFolders = fs.readdirSync("./Buttons");

for(const folder of buttonFolders) {
 const buttonFiles = fs.readdirSync(`./Buttons/${folder}`).filter(file => file.endsWith(".js"));
 for(const file of buttonFiles) {
  const button = require(`./Buttons/${folder}/${file}`);

  Bot.buttons.set(button.data.name, button);
 }
}

/*
 * All Functions
 */

Bot.on("interactionCreate", async (interaction) => {
 if(interaction.isChatInputCommand()) {
  const command = Bot.commands.get(interaction.commandName);
  if(!command) return;
         
  try {
  await command.run(Bot, interaction, distube);
  } catch (error) {
   if(error) console.error(error);

   await interaction.reply({ content: "There Was An Error While Executing This Command!", ephemeral: true });
   return;
  } 
 } else if(interaction.isButton()) {
  const button = Bot.buttons.get(interaction.customId);
  if(!button) return;

  try {
   await button.run(Bot, interaction, distube);
  } catch (error) {
   if(error) console.error(error);

   await interaction.reply({ content: "There Was An Problem In This Button's Script!", ephemeral: true });
   return;
  }
 }
});

distube.on("playSong", async (queue, song) => {
 var embed = new Discord.EmbedBuilder()
    .setTitle("Media Player On")
    .addFields(
   {name: "Now Playing:", value: `${song.name}`},
   {name: "Song Duration:", value: `${song.formattedDuration}`},
    )
    .setTimestamp()
    .setColor(Discord.Colors.Gold)

 var raw = new Discord.ActionRowBuilder()
    .addComponents(
     new Discord.ButtonBuilder()
        .setLabel("⏸ Pause")
        .setCustomId("btn1")
        .setStyle(Discord.ButtonStyle.Primary),

     new Discord.ButtonBuilder()
        .setLabel("▶️ Resume")
        .setCustomId("btn2")
        .setStyle(Discord.ButtonStyle.Primary),

     new Discord.ButtonBuilder()
        .setLabel("⏹️ Stop")
        .setCustomId("btn3")
        .setStyle(Discord.ButtonStyle.Danger),

     new Discord.ButtonBuilder()
        .setLabel("🔊 Volume Up")
        .setCustomId("gooo")
        .setStyle(Discord.ButtonStyle.Success),

     new Discord.ButtonBuilder()
        .setLabel("🔉 Volume Down")
        .setCustomId("run")
        .setStyle(Discord.ButtonStyle.Success),
    )

  queue.textChannel?.send({ embeds: [embed], components: [raw] });
});

distube.on("finishSong", async (queue) => {
 queue.textChannel?.send("Queue Finished! Now You Play other music");
});

let Token = config.TOKEN || process.env.TOKEN

Bot.login(Token)
