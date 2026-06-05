const { App } = require('@slack/bolt');

// Initialize the app with your bot token and Signing Secret
// (You can find Signing Secret under "Basic Information" > "App Credentials")
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,   // Uses WebSocket – no need for public URL in development
  appToken: process.env.SLACK_APP_TOKEN, // For Socket Mode (see note below)
});

// Listen for messages in channels
app.message(async ({ message, say }) => {
  // Avoid replying to our own messages
  if (message.subtype === 'bot_message') return;

  // Example: echo the user's message
  await say(`You said: ${message.text}`);
});

// Start the app
(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Slack bot is running!');
})();
