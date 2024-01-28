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
    const randomResponse = positiveResponses[Math.floor(Math.random() * positiveResponses.length)];
    const issueComment = context.issue({ body: randomResponse });
    await context.octokit.issues.createComment(issueComment);
  });

  // Respond to any message in the channel
  app.on('issue_comment.created', async (context) => {
    const randomResponse = positiveResponses[Math.floor(Math.random() * positiveResponses.length)];
    const comment = context.issue({ body: randomResponse });
    await context.octokit.issues.createComment(comment);
  });
};

// Initialize Probot
const probot = new Probot({});

// Load the app
probot.load(require('./index'));

// Run the bot
probot.start();
