// config-overrides.js
module.exports = function override(config) {
    // Check if config object and devServer property are defined
    if (config && config.devServer) {
      // Set port directly
      // Change the port number here
      config.devServer.port = 3007;
    } else {
      console.error('Config or devServer property is undefined');
    }
  
    return config;
  };
  