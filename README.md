# Discord Midjourney Bot

A opensource Discord Midjourney bot for all AI lovers. No more paywalls to AI. Enjoy your AI Art freedom with us

#
<a href="https://imgur.com/Bmf1J3P"><img src="https://i.imgur.com/Bmf1J3P.png" title="source: imgur.com" /></a>
#

## Support Server
<a href="https://discord.gg/cqSEc9FNrE"><img src="https://discord.com/api/guilds/886462690153857054/widget.png?style=banner2"></a>

## Installation
Clone the repository

```sh
git clone https://github.com/sandarutharuneth/midjourney-bot
```

Fill your Token and other dependencies at [config.json](https://github.com/sandarutharuneth/midjourney-bot/blob/master/src/config/config.json)
```json
{
    "TOKEN": "YOUR TOKEN",
    "CLIENTID": "YOUR BOT ID",
    "OWNER": ["YOUR ID"]
}
```

Install dependencies
```sh
npm i
```

Start the bot
```sh
node .
```

## Usage
On your discord server use slash command `/imagine` to get results
Ex: `/imagine midjourney style anime landscape, genshin impact style`

## Model Swapping
Now you can change the AI model to whatever you want from [Replicate](https://replicate.com/explore)

### Step 1
Go to [Replicate](https://replicate.com/explore) and search your desired model

### Step 2
Copy the model link. Should look like this:
```js
"prompthero/openjourney:9936c2001faa2194a261c01381f90e65261879985476014a0a37a334593a05eb"
```

### Step 3
Paste your model link on `imagine.js`
```js
const prediction = await replicate.default.model(
                "PASTE YOUR MODEL LINK HERE",
            )
```

### Step 4
Run the bot and enjoy!

### PS:
- Add `midjourney style` or `mdjrny-v4` key word somewhere on your promt for better results
- Full beginners guide at my blog: [click here](https://blog.ivongiveaways.com/2023/03/imagine-command-tutorials.html)

## Credits
- [@oelin](https://github.com/oelin) for the [MidJourney Client](https://github.com/oelin/midjourney-client)

If you enjoy our work, please consider giving a start to the repository ⭐️
#

<h6 align="center">©️ Project Razer</h6>
