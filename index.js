const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } = require('discord.js');

const TOKEN = process.env.TOKEN;
const CLIENT_ID = '1501089567674204260';

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

const commands = [
  new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!')
].map(cmd => cmd.toJSON());

const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
  await rest.put(
    Routes.applicationCommands(CLIENT_ID, '770132425321611276'),
    { body: commands }
  );
  console.log('Command registered');
})();

client.once('ready', () => {
  console.log('Bot online');
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }
});

client.login(TOKEN);