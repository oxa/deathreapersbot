# DeathReapers - elune Discord Bot

Discord.js reference
Blizzard API reference

## usage

### local

Export environment variables
```bash
export BOT_TOKEN=NDkxNTkyNzY5NTg4OTUzMDg4.DobwDA.-JWvBmM4vEstas9LSJqLyIrhLbQ
export BLIZZ_KEY=<your_blizzard_api_token>
```

Run the bot
```bash
node bot.js
```

### Docker

Build container 
```bash
docker build -t deathreapersbot:latest .
```

Run container
```bash
docker run -it -e 'BOT_TOKEN=NDkyNzEzODcwODU1NTAzODky.DoekAA.SDrDxR09YqX5vrXFohO2oYztx9Q' -e 'BLIZZ_KEY=<your_blizzard_api_token>' deathreapersbot:latest"
```

## add command
```javascript
exports.run = (client, message, args) => {
    //<...your code here..>
};

exports.conf = {
  name:"your_command_name",
  enabled: true,
  aliases: ["your_command_alias"],
};

```