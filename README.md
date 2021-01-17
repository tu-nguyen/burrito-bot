# burrito-bot
Simple bot for the [Burrito-Guy discord server](https://discord.gg/zWHqYfEnwh), mainly because at first I struggled to get [CLive](https://github.com/mangosango/clive) to work for myself.

<img src="screenshots/example1.png" height="400" alt="Screenshot"/> <img src="screenshots/example1.png" height="400" alt="Screenshot"/> 
<img src="screenshots/example2.png" height="400" alt="Screenshot"/> <img src="screenshots/example2.png" height="400" alt="Screenshot"/> 

## Table of Contents

1. [About](#about)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Example Usage](#example-usage)
5. [TODO](#todo)
6. [Links](#links)
7. [Help](#help)

## About
Made using [nodejs](https://nodejs.org/en/), [tmi.js](https://github.com/tmijs), and [discord.js](https://github.com/discordjs/discord.js/)

Wanted to have clips posted from twitch chat automatically be shared to a specific channel on discord, this is the main purpose of starting this project, but I will add some small commands and share publically here. Privately I will have commands tailored torwards the twitch/discord.

## Prerequisites

1. Node.js v12.0.0
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

2. Add discord token, discord channel id, twitch username, and twitch password ([auth](https://twitchapps.com/tmi/)) in .env with a text editor.

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

## Example-Usage

## TODO
- ~~Make core functionality work aka twitch clips to discord channel~~
- ~~When game changes, depending on game, post to discord and @ groups~~
- Relearn nodejs basics and clean up code
- Filter out previously posted clips, probably implement a db
- Implement Twitch API calls for twitch clip titles
- Somehow get invite code from game? Hard maybe here

## Link

- [CLive](https://github.com/mangosango/clive)

## Help

- [Burrito-Guy discord server](https://discord.gg/zWHqYfEnwh)