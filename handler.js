const R = require('ramda');
const VERIFY_TOKEN = null;

const isGet            = (event) => event.method === 'GET';
const isSubscribe      = (event) => event.query['hub.mode'] === 'subscribe';
const isTokenValid     = (event) => event.query['hub.verify_token'] === VERIFY_TOKEN;

const isVeryfyingToken = R.allPass([isGet, isSubscribe, isTokenValid]);

const writeToken = (query) => {
  return (fn) => {
    fn(null, {
      statusCode: 200,
      body: query['hub.challenge']
    });
  };
};

module.exports.main = (event, context, callback) => {
  if (isVeryfyingToken(event)) {
    return writeToken(event.query)(callback);
  }
};

