// private data
const config = require('./config');
// google vision API, initializing with CONFIG
const vision = require('@google-cloud/vision')(config);
// for easy REST queries
const REST = require('restler');
const TelegramBot = require('node-telegram-bot-api');
const api_url = 'https://api.telegram.org/';
const bot_url = api_url + 'bot' + config.token + '/'

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(config.token, {polling: true});

// default start message, fires when user clicks on START button right after
// adding a bot to contacts or manually by typing /start
bot.onText(/\/start/, (msg, match) => {
  bot.sendMessage(msg.chat.id, 'Hello there, my name is Rick! Send me a photo and I\'ll tell you what I see on it.');
});

// basic help message
bot.onText(/help/gi, (msg, match) => {
  bot.sendMessage(msg.chat.id,
    `My name is Rick, I\'m a bot that uses Google vision API to recognize image labels. \n
    If you like me - leave a star here: <a href="https://github.com/always-oles/TelegramRecognizerBot">Github page</a>`, {parse_mode: 'HTML'});
});

// Listen for any kind of message
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  // if bot received a photo (as intended)
  if(msg.photo) {
    // ask nicely to wait
    bot.sendMessage(chatId, '<pre>Just a moment...</pre>', {parse_mode : 'HTML'});

    // get the best quality photo (last one in array)
    const file = msg.photo[msg.photo.length-1];

    // make URL for request
    const file_url = bot_url + 'getFile?file_id=' + file.file_id;

    // make a GET request to Telegram servers, asking for a file path by file ID
    REST.get(file_url).on('complete', (response) => {

      if (response.result) {
        // final URL of the best quality image sent by user
        const fullsize_url = api_url + 'file/bot' + config.token + '/' + response.result.file_path;

        // detect labels
        vision.labelDetection({ source: { imageUri: fullsize_url } })
        .then((results) => {
          const labels = results[0].labelAnnotations;

          // let's init a final message to user
          let result = '<b>I\'m ready, here is what I see:</b>\n';

          // concat all labels descriptions and scores + format them nicely
          labels.forEach((label) => {
            result += '<code>' + label.description + ': ' + Math.round(label.score*100) + '%; </code> \n';
          });

          bot.sendMessage(chatId, result, {parse_mode : "HTML"});
        })
        .catch((error) => {
          console.error('ERROR:', error);
          bot.sendMessage(chatId, 'Oops, something went wrong...');
        });
      }
    });
  }
});
