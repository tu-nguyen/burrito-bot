const { tmi, discord} = require('./clients.js');
const tmiClient = tmi;
const discordClient = discord;

// Use discordClient.emit('example', userstate, message, etc) to post/perform actions to DISCORD_CHANNEL_ID
//      'example' here will be the name of the event, and the event action must be create, see CUSTOM EVENT below
//      discordClient.on('example', (userstate, message, channel) => { some action or message here }
// Use tmiClient.say(channel, 'example of something to say') to post to channel

// Commands and actions from Twitch chat
// Bot will always read from the TWITCH_CHANNEL in .env
let call = (channel, userstate, message) => {
    var channel_url = 'https://www.twitch.tv/' + channel.replace(/[^0-9A-Z]+/gi,"");

    if (message.toLowerCase() === '!hello') {
        tmiClient.say(channel, `@${userstate.username}, heya!`);
    } else if (message.toLowerCase().startsWith() === '!setgame') {
        DISCORD_CHANNEL_ID.say(channel, `@${userstate.username}, ayo command or nah?`);
    } else if (message.toLowerCase() === '!test') {
        discordClient.emit('test', userstate, message, channel);
    } 
    // else if (message.toLowerCase().startsWith('!ayo')) {
    //     if ((userstate.badges.moderator == '1' || userstate.badges.broadcaster == '1') && userstate.username != 'streamlabs') {
    //         var input = message.split(' ')[1];
    //         if (input === undefined || input === null) {
    //             tmiClient.say(channel, `[osu, valorant, league, among us, apex, cod, rust, fall guys]`);
    //             return;
    //         } else {
    //             discordClient.emit('ayo', channel, channel_url, input);
    //         }
    //     } else {
    //         tmiClient.say(channel, `@${userstate.username}, ayo command can only be executed by mods`);
    //     }
    // }
}

// CUSTOM EVENTS triggered by the call function above
// call function above reads from twitch chat and any that is meant to trigger an event on discord happens here
// add as many as you'd like here, below is a test example: sending "!test" in Twitch chat will have the bot send a test message to DISCORD_CHANNEL_ID
discordClient.on('test', (userstate, message, channel) => {
    discordClient.channels.cache.get(process.env.DISCORD_CHANNEL_ID).send(userstate.username + ' sent test command: ' + message + ' from ' + channel);
    
})

// Commands and actions from Discord
// Bot will always read from main DISCORD_CHANNEL_ID assigned on .env
// msg will be what the user sends on the main channel
// to have it send to Twitch chat use tmiClient.say(channel, "example message")
discordClient.on('message', msg => {
    server_name = discordClient.channels.cache.get(process.env.DISCORD_CHANNEL_ID).guild.name
    channel = process.env.TWITCH_CHANNEL
    if (msg.author.bot) return; // Ignore all bots
    if (msg.content == "!test") {
        // when user sends "!test" from DISCORD_CHANNEL_ID, this will trigger the bot to post in Twitch chat
        tmiClient.say(channel, msg.author.username + " sent a test from " + server_name);
    }
    if (msg.content.startsWith("!" + "ping")) { // When a player does '!ping'
      msg.reply("Pong!") // The bot will say @Author, Pong!
    }
 });

// discordClient.on('ayo', (channel, channel_url, input) => {
// 	if (input.toLowerCase() === 'osu') {
// 		discordClient.channels.cache.get(process.env.DISCORD_CHANNEL_ID).send(channel_url + ' is about to play <@&' + process.env.DISCORD_ROLE_ID_OSU + '> come thru!');
// 	} else if (input.toLowerCase() === 'valorant') {
// 		discordClient.channels.cache.get(process.env.DISCORD_CHANNEL_ID).send(channel_url + ' is about to play <@&' + process.env.DISCORD_ROLE_ID_VALORANT + '> come thru!');
// 	} else if (input.toLowerCase() === 'league') {
// 		discordClient.channels.cache.get(process.env.DISCORD_CHANNEL_ID).send(channel_url + ' is about to play <@&' + process.env.DISCORD_ROLE_ID_LEAGUE + '> come thru!');
// 	} else if (input.toLowerCase() === 'among') {
// 		discordClient.channels.cache.get(process.env.DISCORD_CHANNEL_ID).send(channel_url + ' is about to play <@&' + process.env.DISCORD_ROLE_ID_AMONG_US + '> come thru!');
// 	} else if (input.toLowerCase() === 'apex') {
// 		discordClient.channels.cache.get(process.env.DISCORD_CHANNEL_ID).send(channel_url + ' is about to play <@&' + process.env.DISCORD_ROLE_ID_APEX + '> come thru!');
// 	} else if (input.toLowerCase() === 'cod') {
// 		discordClient.channels.cache.get(process.env.DISCORD_CHANNEL_ID).send(channel_url + ' is about to play <@&' + process.env.DISCORD_ROLE_ID_COD + '> come thru!');
// 	} else if (input.toLowerCase() === 'rust') {
// 		discordClient.channels.cache.get(process.env.DISCORD_CHANNEL_ID).send(channel_url + ' is about to play <@&' + process.env.DISCORD_ROLE_ID_RUST + '> come thru!');
// 	} else if (input.toLowerCase() === 'fall') {
// 		discordClient.channels.cache.get(process.env.DISCORD_CHANNEL_ID).send(channel_url + ' is about to play <@&' + process.env.DISCORD_ROLE_ID_FALL_GUYS + '> come thru!');
// 	} else {
// 		tmiClient.say(channel, `[osu, valorant, league, among us, apex, cod, rust, fall guys]`);
// 	}
// })

discordClient.once('ready', () => {
    console.log('burrito-guy bot is online!');
});

// Function that posts any twitch clip from DISCORD_CHANNEL_ID to TWITCH_CHANNEL
discordClient.on('clip', (channel, userstate, message) => {
    discordClient.channels.cache.get(process.env.DISCORD_CHANNEL_ID).send(userstate.username + ' posted a clip from ' + channel + '\'s chat: ' + message);
})

module.exports.call = call;