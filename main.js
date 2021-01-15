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
    console.log(tags);
	if(message.toLowerCase() === '!hello') {
		tmiClient.say(channel, `@${userstate.username}, heya!`);
	}

	checkForClips(userstate, message)

});

function checkForClips(username, message){
	let isClip = false
	isClip = CLIPS_REGEX.test(message);

	if(isClip) {
		tmiClient.say(channel, `clip detected`);
	}

}

function postToDiscord(){

}



// const Discord = require('discord.js');

// const DISCORD_TOKEN = process.env.DISCORD_TOKEN;

// const discordClient = new Discord.Client();


// discordClient.once('ready', () => {
//     console.log('burrito-guy is online!');
// });



// discordClient.login(DISCORD_TOKEN);

