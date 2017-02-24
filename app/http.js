module.exports.isGet        = (event) => event.httpMethod === 'GET';

module.exports.isSubscribe  = (event) => event.queryStringParameters['hub.mode'] === 'subscribe';

module.exports.isTokenValid = (token) => {
  return (event) => event.queryStringParameters['hub.verify_token'] === token;
};

module.exports.respondWith  = (body) => {
  return (fn) => {
    return fn(null,  {
      statusCode: 200,
      body: body
    });
  };
};

module.exports.clientError = (fn) => {
  return fn(null, {
    statusCode: 400,
    body: null
  });
};
