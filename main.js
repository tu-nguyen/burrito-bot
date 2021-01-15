require('dotenv').config();
// init tmi.js
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
	channels: ['jt1gaming', 'ascidgaming']
});
// init discord.js
const Discord = require('discord.js');
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const discordClient = new Discord.Client();

// ripped from https://github.com/mangosango/clive
// (twitch.tv\/.*\/clip) check https://www.twitch.tv/username/clip/clip_id
// (clips.twitch.tv) checks https://clips.twitch.tv/clip_id
const CLIPS_REGEX = /(twitch.tv\/.*\/clip)|(clips.twitch.tv)\/\w+/i;

tmiClient.connect().catch(console.error);

tmiClient.on('message', (channel, userstate, message, self) => {
    if(self) return;
    console.log(message);
    console.log(userstate);
	if(message.toLowerCase() === '!hello') {
		tmiClient.say(channel, `@${userstate.username}, heya!`);
	}
	else if(message.toLowerCase() === '!test') {
		commandToDiscord(userstate, message);
	}

	checkForClips(channel, userstate, message)
});

discordClient.once('ready', () => {
    console.log('burrito-guy is online!');
});

discordClient.on('command', (userstate, message) => {
	// console.log(message);
    discordClient.channels.cache.get(process.env.DISCORD_CHANNEL_ID).send(userstate.username + ' sent test command: ' + message);
})

discordClient.on('clip', (userstate, message) => {
	// console.log(message);
    discordClient.channels.cache.get(process.env.DISCORD_CHANNEL_ID).send(userstate.username + ' posted a clip in chat: ' + message);
})

discordClient.login(DISCORD_TOKEN);

// main functionailties
function checkForClips(channel, userstate, message){
	let isClip = false
	isClip = CLIPS_REGEX.test(message);

	if(isClip) {
		tmiClient.say(channel, `Clip detected, sent to #game-related on burrito-guy server`);
		clipsToDiscord(userstate, message);
	}
}

function clipsToDiscord(userstate, message){
	//temp
	// console.log('nani');
	discordClient.emit('clip', userstate, message);
}

function commandToDiscord(userstate, message){
	//temp
	// console.log('nani');
	discordClient.emit('command', userstate, message);
}