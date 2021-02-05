require('dotenv').config();
const request = require('request');
const { tmi, discord} = require('./clients.js');
const tmiClient = tmi;
const discordClient = discord;
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const commands = require('./commands.js')
const CLIPS_REGEX = /(twitch.tv\/.*\/clip)|(clips.twitch.tv)\/\w+/i;
tmiClient.connect().catch(console.error);

// command handler
tmiClient.on('message', (channel, userstate, message, self) => {
	if (self) return;

	// commands
	if ((message.indexOf('!')) !== -1) {
		commands.call(channel, userstate, message);
	}

	checkForClips(channel, userstate, message)
});

// discord bot login
discordClient.login(DISCORD_TOKEN);

// main functionailties - clip detection
function checkForClips(channel, userstate, message){
	let isClip = false;
	isClip = CLIPS_REGEX.test(message);

	if (isClip) {
		tmiClient.say(channel, `Clip detected, sent to #game-related on burrito-guy server`);
		discordClient.emit('clip', channel, userstate, message);
	}
}