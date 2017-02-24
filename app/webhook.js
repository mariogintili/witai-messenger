const container = require('./container');
const config    = container.fetch('config');

module.exports.extractMessage = (event) => {
  return (fn) => {
    const text = JSON.parse(event.body)['messages'][0]['text'];
    return fn({ text: text });
  };
};

module.exports.understandMessage = (object) => {
  const text = object.text;

  return (fn) => {
    const request = container.fetch('httpClient');
    request({
      url: 'https://api.wit.ai/',
      method: 'POST',
      qs: {
        q: text
      },
      headers: {
        'Authorization': `Bearer ${config.wit.token}`,
        'Content-Type': 'application/json',
        'Accept': config.wit.version
      }
    }, (error, response, body) => {

      if (!error && response.statusCode >= 200) {
        return fn(JSON.parse(body));
      } else if (error) {
        throw error;
      } else {
        throw {
          name: 'Error',
          message: `Unable to process response - server replied with ${response.statusCode}`
        }
      }
    });
  };
};

module.exports.validateIntent = (event) => {
  return (fn) => {

  };
};

module.exports.lookUpAction = (event) => {
  return (fn) => {

  };
};
