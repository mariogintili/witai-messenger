const R = require('ramda');
const VERIFY_TOKEN = process.env.FACEBOOK_PAGE_VERIFY_TOKEN;

const isGet            = (event) => event.httpMethod === 'GET';
const isSubscribe      = (event) => event.queryStringParameters['hub.mode'] === 'subscribe';
const isTokenValid     = (event) => event.queryStringParameters['hub.verify_token'] === VERIFY_TOKEN;
const isVeryfyingToken = R.allPass([isGet, isSubscribe, isTokenValid]);

const writeToken = (query) => {
  return (fn) => {
    fn(null, {
      statusCode: 200,
      body: query['hub.challenge']
    });
  };
};

const clientError = (callback) => {
  return callback(null, {
    statusCode: 400,
    body: null
  });
};

module.exports.verify = (event, context, callback) => {
  if (isVeryfyingToken(event)) {
    writeToken(event.queryStringParameters)(callback);
  } else {
    clientError(callback);
  }
};

module.exports.webhook = (event, context, callback) => {};
