import hello from 'hellojs';

export default ({ app }) => {
  // Initialize Hello.js with your API keys and configurations
  hello.init({
    // Add your social network configurations here, for example:
    facebook: 'YOUR_FACEBOOK_APP_ID',
    google: 'YOUR_GOOGLE_CLIENT_ID',
    twitter: 'YOUR_TWITTER_APP_KEY',
    // Add other networks as needed
  });

  // Make Hello.js available globally in the app
  app.config.globalProperties.$hello = hello;
};
