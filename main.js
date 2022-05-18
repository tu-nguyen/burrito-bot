require('dotenv').config();
const request = require('request');
const {tmi, discord} = require('./clients.js');
const commands = require('./commands.js')
const tmiClient = tmi;
const discordClient = discord;
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const PREFIX = process.env.PREFIX;
const CLIPS_REGEX = /(twitch.tv\/.*\/clip)|(clips.twitch.tv)\/\w+/i;

tmiClient.connect().catch(console.error);

// Command handler for Twitch Chat
tmiClient.on('message', (channel, userstate, message, self) => {
	if (self) return;

	// Will only reconize command if message starts with the prefix !
	if ((message.indexOf(PREFIX)) !== -1) {
		commands.call(channel, userstate, message);
	}

	checkForClips(channel, userstate, message)
});

// Discord bot login
discordClient.login(DISCORD_TOKEN);

// Clip detection
function checkForClips(channel, userstate, message){
	let isClip = false;
	isClip = CLIPS_REGEX.test(message);

	if (isClip) {
		tmiClient.say(channel, `Clip detected, sent to #game-related on burrito-guy server`);
		discordClient.emit('clip', channel, userstate, message);
	}
}