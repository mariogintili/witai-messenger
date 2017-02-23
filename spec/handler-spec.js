const handler = require('../handler');

describe('handler.main', function() {
  describe('when is a GET and its a verify request', function() {
    it('returns the challenge on the body of the response with a status code of 200', function() {
      const challenge = '7b77691171fe47454a42';
      const options   = {
        event: {
          body: {},
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'GET',
          query: {
            'hub.mode': 'subscribe',
            'hub.verify_token': null,
            'hub.challenge': challenge
          }
        },
        context: {},
        callback: function(_, response) {
          expect(response.statusCode).toEqual(200);
          expect(response.body).toEqual(challenge);
        }
      };
      handler.main(options.event, {}, options.callback);
    });
  });
});
