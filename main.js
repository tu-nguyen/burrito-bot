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
	channels: ['jt1gaming', 'ascidgaming']
});

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

	checkForClips(channel, userstate, message)
});

function checkForClips(channel, userstate, message){
	let isClip = false
	isClip = CLIPS_REGEX.test(message);

	if(isClip) {
		tmiClient.say(channel, `clip detected`);

		postToDiscord(userstate, message);
	}
}

function postToDiscord(userstate, message){
	//temp
	// console.log('nani');
	discordClient.emit('test', userstate, message);
}

const Discord = require('discord.js');
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const discordClient = new Discord.Client();

discordClient.once('ready', () => {
    console.log('burrito-guy is online!');
});

discordClient.on('test', (userstate, message) => {
		// console.log(message);
        discordClient.channels.cache.get(process.env.DISCORD_CHANNEL_ID).send(userstate.username + ' created a clip: ' + message);
	})
	
discordClient.login(DISCORD_TOKEN);

