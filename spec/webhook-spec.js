'use strict';

const webhook         = require('../app/webhook');
const requestTemplate = require('./fixtures/webhook-request');
const container       = require('../app/container');
const config          = container.fetch('config');

describe('webhook.extractMessage', function() {
  it('returns a first order function that will take an event object as the first argument but also have present the string to parse', function() {
    let fn     = webhook.extractMessage({ body: requestTemplate });
    let result = fn((object) => {
      return object.text;
    });

    expect(result).toEqual("trying one more time");
  });
});

describe('webhook.understandMessage', function() {
  describe('under valid circumstances', function() {
    it('makes an HTTP request to wit.ai and returns a function that will receive as a first argument the response from wit', function() {
      const text    = 'Hello world';
      const fn      = webhook.understandMessage({ text: text });
      const payload = {
        confidence: 0.17692120631776423,
        type: "action",
        entities: {
          intent: [
            {
              confidence: 1.0,
              value: "create-order"
            }
          ]
        }
      };

      const client       = container.get('httpClient');
      const mockedClient = (options, callback) => {
        expect(options.method).toEqual('POST');
        expect(options.url).toEqual('https://api.wit.ai/');
        expect(options.headers).toEqual({
          'Authorization': `Bearer ${config.wit.token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.wit.20160526+json'
        });
        expect(options.qs).toEqual({ q: text });

        callback(null, { statusCode: 200 }, JSON.stringify(payload));
      };

      container.register('httpClient', mockedClient);

      const result = fn((body) => {
        return body;
      });


      container.register('httpClient', client);
    });
  });

  describe('under invalid circumstances', function() {
    it('when the HTTP request fails', function() {

    });
  });
});
