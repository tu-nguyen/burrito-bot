const { tmi, discord} = require('./clients.js');
const tmiClient = tmi;
const discordClient = discord;

// Commands from Twitch chat
let call = (channel, userstate, message) => {
    var channel_url = 'https://www.twitch.tv/' + channel.replace(/[^0-9A-Z]+/gi,"");

    if (message.toLowerCase() === '!hello') {
        tmiClient.say(channel, `@${userstate.username}, heya!`);
    } else if (message.toLowerCase().startsWith() === '!setgame') {
        tmiClient.say(channel, `@${userstate.username}, ayo command or nah?`);
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

// Discord actions and commands from discord channel
discordClient.once('ready', () => {
    console.log('burrito-guy bot is online!');
});

discordClient.on('test', (userstate, message, channel) => {
    // channel_name = discordClient.channels.cache.get(process.env.DISCORD_CHANNEL_ID).name
    // server_name = discordClient.channels.cache.get(process.env.DISCORD_CHANNEL_ID).guild.name
    discordClient.channels.cache.get(process.env.DISCORD_CHANNEL_ID).send(userstate.username + ' sent test command: ' + message + ' from ' + channel);
    
})

// Commands from main channel provided in env
discordClient.on('message', msg => {
    if (msg.author.bot) return; // Ignore all bots

    if (msg.content.startsWith("!" + "test")) {
        parts = msg.content.split(" ");
        

        if (parts.length == 1) {
            msg.reply("No twitch channel provided but this is indeed a test!")
        } else {
            if (parts[1].startsWith("#")) {
                channel = parts[1]
            } else {
                channel = "#" + parts[1]
            }
            server_name = discordClient.channels.cache.get(process.env.DISCORD_CHANNEL_ID).guild.name

            if (parts.length == 2) {
                if (parts[1].startsWith("#")) {
                    channel = parts[1]
                } else {
                    channel = "#" + parts[1]
                }
                server_name = discordClient.channels.cache.get(process.env.DISCORD_CHANNEL_ID).guild.name
                tmiClient.say(channel, msg.author.username + " sent a test from " + server_name);
            } else {
                if (parts[1].startsWith("#")) {
                    channel = parts[1]
                } else {
                    channel = "#" + parts[1]
                }
                message = parts.splice(0, 2)
                console.log(message)
                tmiClient.say(channel, msg.content);
            }
        }
        
        
        
        
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

discordClient.on('clip', (channel, userstate, message) => {
    discordClient.channels.cache.get(process.env.DISCORD_CHANNEL_ID).send(userstate.username + ' posted a clip from ' + channel + '\'s chat: ' + message);
})

module.exports.call = call;