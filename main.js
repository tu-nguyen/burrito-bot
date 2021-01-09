require('dotenv').config();
const tmi = require('tmi.js');
const tmiClient = new tmi.Client({
	options: { debug: true, messagesLogLevel: "info" },
	connection: {
		reconnect: true,
		secure: true
	},
	identity: {
		username: process.env.TWITCH_USERNAME,
		password: process.env.TWITCH_PASSWORD
	},
	channels: [ 'jt1gaming', 'ascidgaming' ]
});
tmiClient.connect().catch(console.error);
tmiClient.on('message', (channel, tags, message, self) => {
    if(self) return;
    console.log(message);
    console.log(tags);
	if(message.toLowerCase() === '!hello') {
		tmiClient.say(channel, `@${tags.username}, heya!`);
	}
});

const Discord = require('discord.js');

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;

const discordClient = new Discord.Client();


discordClient.once('ready', () => {
    console.log('burrito-guy is online!');
});



discordClient.login(DISCORD_TOKEN);

