const { tmi, discord} = require('./clients.js');
const tmiClient = tmi;
const discordClient = discord;

//tmi commands
let call = (channel, userstate, message) => {
    var channel_url = 'https://www.twitch.tv/' + channel.replace(/[^0-9A-Z]+/gi,"");

    if (message.toLowerCase() === '!hello') {
        tmiClient.say(channel, `@${userstate.username}, heya!`);
    } else if (message.toLowerCase().startsWith() === '!setgame') {
        tmiClient.say(channel, `@${userstate.username}, ayo command or nah?`);
    } else if (message.toLowerCase() === '!test') {
        discordClient.emit('test', userstate, message);
    } else if (message.toLowerCase().startsWith('!ayo')) {
        if ((userstate.badges.moderator == '1' || userstate.badges.broadcaster == '1') && userstate.username != 'streamlabs') {
            var input = message.split(' ')[1];
            if (input === undefined || input === null) {
                tmiClient.say(channel, `[osu, valorant, league, among us, apex, cod, rust, fall guys]`);
                return;
            } else {
                discordClient.emit('ayo', channel, channel_url, input);
            }
        } else {
            tmiClient.say(channel, `@${userstate.username}, ayo command can only be executed by mods`);
        }
    }
}

//discord action
discordClient.once('ready', () => {
    console.log('burrito-guy bot is online!');
});

discordClient.on('test', (userstate, message) => {
    discordClient.channels.cache.get(process.env.DISCORD_CHANNEL_ID).send(userstate.username + ' sent test command: ' + message);
})

discordClient.on('ayo', (channel, channel_url, input) => {
	if (input.toLowerCase() === 'osu') {
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
	} else {
		tmiClient.say(channel, `[osu, valorant, league, among us, apex, cod, rust, fall guys]`);
	}
})

discordClient.on('clip', (channel, userstate, message) => {
    discordClient.channels.cache.get(process.env.DISCORD_CHANNEL_ID).send(userstate.username + ' posted a clip from ' + channel + '\'s chat: ' + message);
})

module.exports.call = call;