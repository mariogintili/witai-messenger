const handler = require('../handler');

describe('handler.verify', function() {
  describe('when is a GET and its a verify request', function() {
    it('returns the challenge on the body of the response with a status code of 200', function() {
      const challenge = '7b77691171fe47454a42';
      const options   = {
        event: {
          body: {},
          headers: {
            'Content-Type': 'application/json'
          },
          httpMethod: 'GET',
          queryStringParameters: {
            'hub.mode': 'subscribe',
            'hub.verify_token': process.env.FACEBOOK_PAGE_VERIFY_TOKEN,
            'hub.challenge': challenge
          }
        },
        context: {},
        callback: function(_, response) {
          expect(response.statusCode).toEqual(200);
          expect(response.body).toEqual(challenge);
        }
      };
      handler.verify(options.event, {}, options.callback);
    });
  });
});

xdescribe('handler.webhook', function() {
  xdescribe('when is a POST and its an incoming webhook', function() {
    xit('parses the text and executes an action', function() {
    });
  });
});
