const { Probot } = require('probot');

const positiveResponses = [
  'Thank you for your kind words!',
  'We appreciate your feedback!',
  'Glad to hear you liked it!',
  'Thanks for taking the time to share your thoughts!',
  'Your positive feedback made our day!',
  // Add more positive responses as needed
];

module.exports = (app) => {
  app.on('issues.opened', async (context) => {
    if (context.payload.issue && context.payload.issue.user) {
      const randomResponse = positiveResponses[Math.floor(Math.random() * positiveResponses.length)];
      const issueComment = context.issue({ body: randomResponse });
      await context.octokit.issues.createComment(issueComment);
    }
  });

  // Respond to any message in the specific channel
  app.on('issue_comment.created', async (context) => {
    if (context.payload.issue && context.payload.issue.user && context.payload.comment && context.payload.comment.user) {
      const channelId = '1200954439859708024'; // Replace with your channel ID
      if (context.payload.issue.user.id === channelId || context.payload.comment.user.id === channelId) {
        const randomResponse = positiveResponses[Math.floor(Math.random() * positiveResponses.length)];
        const comment = context.issue({ body: randomResponse });
        await context.octokit.issues.createComment(comment);
      }
    }
  });
};

// Initialize Probot
const probot = new Probot({});

// Load the app
probot.load(require('./index'));

// Run the bot
probot.start();
