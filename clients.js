require('dotenv').config();
let tmi = require('tmi.js');
let Discord = require('discord.js');

let tmiClient = new tmi.client({
    options: { debug: true, messagesLogLevel: "info" },
    connection: {
        reconnect: true,
        secure: true
    },
    identity: {
        username: process.env.TWITCH_USERNAME,
        password: process.env.TWITCH_PASSWORD
    },
    channels: [process.env.TWITCH_CHANNEL]
});
let discordClient = new Discord.Client();

exports.tmi = tmiClient;
exports.discord = discordClient;