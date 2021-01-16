# burrito-bot
Simple bot for the [Burrito-Guy discord server](https://discord.gg/zWHqYfEnwh), mainly because at first I struggled to get [CLive](https://github.com/mangosango/clive) to work for myself.

## Table of contents

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

1. Node.js v12.0.0, Discord.js, and Tmi.js
2. Discord Bot Token **[Guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)**
3. Discord channel's ID **[Guide](https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-)**
4. ([Twitch auth](https://twitchapps.com/tmi/))

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

## Example-Usage

## TODO
- ~~Make core functionality work aka twitch clips to discord channel~~
- Relearn nodejs basics and clean up code
- Filter out previously posted clips
- When game changes, depending on game, post to discord and @ groups

## Link

- 

## Help

- [Burrito-Guy discord server](https://discord.gg/zWHqYfEnwh)