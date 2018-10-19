# DeathReapers - elune Discord Bot

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