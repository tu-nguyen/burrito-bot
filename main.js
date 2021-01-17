require('dotenv').config();
const request = require('request');
// ripped from https://github.com/mangosango/clive
// (twitch.tv\/.*\/clip) check https://www.twitch.tv/username/clip/clip_id
// (clips.twitch.tv) checks https://clips.twitch.tv/clip_id
const CLIPS_REGEX = /(twitch.tv\/.*\/clip)|(clips.twitch.tv)\/\w+/i;

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

tmiClient.connect().catch(console.error);

tmiClient.on('message', (channel, userstate, message, self) => {
	if(self) return;
	var channel_url = 'https://www.twitch.tv/' + channel.replace(/[^0-9A-Z]+/gi,"");
	console.log(userstate);
	if(message.toLowerCase() === '!hello') {
		tmiClient.say(channel, `@${userstate.username}, heya!`);
	} else if(message.toLowerCase() === '!test') {
		discordClient.emit('test', userstate, message);
	} else if (message.startsWith('!ayo')) {
		var input = message.split(' ')[1];
		discordClient.emit('ayo', channel_url, input);
	}
	checkForClips(channel, userstate, message)
});

discordClient.once('ready', () => {
    console.log('burrito-guy is online!');
});

discordClient.on('test', (userstate, message) => {
    discordClient.channels.cache.get(process.env.DISCORD_CHANNEL_ID).send(userstate.username + ' sent test command: ' + message);
})

discordClient.on('ayo', (channel_url, input) => {
	if(input.toLowerCase() === 'osu') {
		discordClient.channels.cache.get(process.env.DISCORD_CHANNEL_ID).send(channel_url + ' is about to play <@&' + process.env.DISCORD_ROLE_ID_OSU + '> come thru!');
	} else if (input.toLowerCase() === 'valorant') {
		discordClient.channels.cache.get(process.env.DISCORD_CHANNEL_ID).send(channel_url + ' is about to play <@&' + process.env.DISCORD_ROLE_ID_VALORANT + '> come thru!');
	} else if (input.toLowerCase() === 'league') {
		discordClient.channels.cache.get(process.env.DISCORD_CHANNEL_ID).send(channel_url + ' is about to play <@&' + process.env.DISCORD_ROLE_ID_LEAGUE + '> come thru!');
	} else if (input.toLowerCase() === 'among') {
		discordClient.channels.cache.get(process.env.DISCORD_CHANNEL_ID).send(channel_url + ' is about to play <@&' + process.env.DISCORD_ROLE_ID_AMONG_US + '> come thru!');
	} else if (input.toLowerCase() === 'apex') {
		discordClient.channels.cache.get(process.env.DISCORD_CHANNEL_ID).send(channel_url + ' is about to play <@&' + process.env.DISCORD_ROLE_ID_APEX + '> come thru!');
	} else if (input.toLowerCase() === 'cod') {
		discordClient.channels.cache.get(process.env.DISCORD_CHANNEL_ID).send(channel_url + ' is about to play <@&' + process.env.DISCORD_ROLE_ID_COD + '> come thru!');
	} else if (input.toLowerCase() === 'rust') {
		discordClient.channels.cache.get(process.env.DISCORD_CHANNEL_ID).send(channel_url + ' is about to play <@&' + process.env.DISCORD_ROLE_ID_RUST + '> come thru!');
	} else if (input.toLowerCase() === 'fall') {
		discordClient.channels.cache.get(process.env.DISCORD_CHANNEL_ID).send(channel_url + ' is about to play <@&' + process.env.DISCORD_ROLE_ID_FALL_GUYS + '> come thru!');
	} 
})

discordClient.on('clip', (channel, userstate, message) => {
    discordClient.channels.cache.get(process.env.DISCORD_CHANNEL_ID).send(userstate.username + ' posted a clip from ' + channel + '\'s chat: ' + message);
})
discordClient.login(DISCORD_TOKEN);

// main functionailties
function checkForClips(channel, userstate, message){
	let isClip = false
	isClip = CLIPS_REGEX.test(message);

	if(isClip) {
		tmiClient.say(channel, `Clip detected, sent to #game-related on burrito-guy server`);
		discordClient.emit('clip', channel, userstate, message);
	}
}