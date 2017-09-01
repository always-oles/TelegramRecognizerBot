## Hello! This is a Telegram image/label recognition bot, called Rick.
### He is written in NodeJS and uses Google Vision/Translate APIs to recognize an image and tell us what's on it.
#### Currently working version of Rick (try me): https://t.me/ao_recognizer_bot
*`Important note: bot is not saving any of your messages/photos, he respects your privacy. But he does save your username for /stats`*


To **get started** - you must have installed NPM (my version is 5.3.0) and Node (8.4.0).
Then just perform a command
```
  npm install
```
in the project folder to install all nodejs project dependencies.

### Important:
You have to **manually** add files that are **not included** (*because of the rules of privacy*) but required to launch a bot:
* Google console project key (a JSON file) (https://cloud.google.com/iam/docs/creating-managing-service-accounts#creating_a_service_account) (*I used a Google cloud console to create one*)
* **Config file, which includes** `Telegram bot token` (https://core.telegram.org/bots#3-how-do-i-create-a-bot)
* *Optional: deploy config file (see the Gulp section below)*

I managed to create a file called `config.js` that's required at the start of
`index.js` and it's structure looks like this:

```javascript
  module.exports = {
    token: '<Your Telegram token>',
    projectId: '<Google console project ID>',
    keyFilename: '<Path to google service key *.json>'
  };
```


So when you **already have** your `config.js` and a `.json` key inside the project directory,
installed all dependencies - feel free to start an app:
```
  node index.js
```
then send your Rick a message (*/start*, */stats*, *help*, *sticker* or a *photo*)

That's it, enjoy!

### Also I'm using Gulp to automate deployment of Rick to remote server.
For this you have to add another config file that's not included to this repo, I have a file called `deploy_config.js` that is mentioned (required) in `gulpfile.js`.
The structure of `deploy_config.js` looks like this:
``` javascript
  module.exports = {
    host: <YOUR VPS IP ADDRESS>,
    port: 22,
    username: <YOUR USERNAME>,
    password: <YOUR PASSWORD>
  };
```
And when I added something new - I run a
```
  gulp manual-deploy
```
to check changes on live mode and when I'm done - I just push changes to github and perform a
```
  gulp deploy
```
command that pulls everything from github and restarts the bot.

Rick is currently up and running on Digital Ocean VPS (Ubuntu 16.04 + nginx).
There is a nice tutorial right here: https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04
