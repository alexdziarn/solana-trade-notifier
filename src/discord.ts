import { Client, GatewayIntentBits, TextChannel } from 'discord.js';
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
import { config } from 'dotenv';
config();

let channel;

client.on('ready', () => {
  
  console.log(`SERVER STARTED! Logged in as ${client.user.tag}!`);
  channel = client.channels.cache.get(process.env.DISCORD_CHANNEL) as TextChannel;
  if (!channel) {
      console.error('Channel not found');
      return;
  }
  channel.send("BOT STARTED!").catch(console.error);
});

// Listen for messages
client.on('messageCreate', message => {
  // If the message is "ping"
  if (message.content === 'ping') {
      // Send "pong" to the same channel
      message.channel.send('pong');
  }
});


; //remove later

export { client, channel };
