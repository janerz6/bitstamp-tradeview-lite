const uuid = require('uuid');

const sanitizedUuid = uuid.v4().replace(/-/gi, '_');

module.exports = {
  output: {
    uniqueName: 'webpackJsonpBetterWidgets_' + sanitizedUuid,
    library: 'betterWidgets_' + sanitizedUuid
  }
};
