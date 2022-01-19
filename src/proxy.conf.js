const PROXY_CONFIG = {
  "/api": {
    target: "https://www.bitstamp.net",
    changeOrigin: true,
    router: function (req) {
      // console.log('intercepting API call')
      return this.target;
    },
    secure: true,
    logLevel: "debug"
  }
};

module.exports = PROXY_CONFIG;
