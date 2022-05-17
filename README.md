# burrito-bot
Simple bot for the [Burrito-Guy discord server](https://discord.gg/zWHqYfEnwh).

## Table of Contents

1. [About](#about)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [TODO](#todo)
5. [Links](#links)
6. [Help](#help)

## About
Made using [nodejs](https://nodejs.org/en/), [tmi.js](https://github.com/tmijs), and [discord.js](https://github.com/discordjs/discord.js/)

Wanted to have clips posted from twitch chat automatically be shared to a specific channel on discord, this is the main purpose of starting this project, but I will add some small commands and share publically here. Privately I will have commands tailored towards the twitch/discord. Regex for clips from [CLive](https://github.com/mangosango/clive).


When viewers post any clips on Twitch chat..
<img src="https://raw.githubusercontent.com/tu-nguyen/burrito-bot/main/screenshots/example1.PNG" title="Clip Example" />

When command is sent on Twitch chat, "!ayo osu" for example below..
<img src="https://raw.githubusercontent.com/tu-nguyen/burrito-bot/main/screenshots/example2.PNG" title="Game Example" />

## Prerequisites

1. Node.js v12.0.0 **[Guide](https://nodejs.org/en/download/)**
2. Twitch OAuth Token **[Twitch auth](https://twitchapps.com/tmi/)**
3. Discord Bot Token **[Guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)**
4. Discord channel's ID **[Guide](https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-)**

## Installation

1. Clone, and install
```bash
$ git clone https://github.com/tu-nguyen/burrito-bot.git && cd burrito-bot
$ mv .env-example .env
$ npm install
```

2. Add discord token, discord channel id, twitch username, and twitch password/oauth in .env with a text editor.

`TWITCH_USERNAME` Username of the Twitch bot account

`TWITCH_PASSWORD` Password as in oauth for the Twitch account ("oauth:" not included)

`DISCORD_TOKEN` Token from Discord Developer Portal for the bot (Under the Bot tab NOT OAuth2)

`DISCORD_CHANNEL_ID` Channel ID for the channel bot will post to

`DISCORD_ROLE_ID_OSU` Role ID for the builtin command to mention a specific role

3. Run to test
```bash
$ node .
```

4. (Optional) Deploy to server of your choice, example AWS as a background process

SSH into your instance and run the above steps

Control-Z to see the the job number (most likely will be 1)

```bash
$ bg %1
$ exit
```

## TODO
- ~~Make core functionality work aka twitch clips to discord channel~~
- ~~When game changes, depending on game, post to discord and @ groups~~
- ~~Relearn nodejs basics and clean up code lol~~
- Twitch stats and post to channel?
- Filter out previously posted clips, probably implement a db
- Implement Twitch API calls for twitch clip titles
- Somehow get invite code from game? Hard maybe here

## Links

- [CLive](https://github.com/mangosango/clive) Better version that I couldn't get working cause I'm new to js.. 

## Help

- I'm almost always on here, ask for Tu: [Burrito-Guy discord server](https://discord.gg/zWHqYfEnwh)