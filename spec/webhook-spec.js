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

      const client       = container.fetch('httpClient');
      const mockedClient = (options, callback) => {
        expect(options.method).toEqual('POST');
        expect(options.url).toEqual('https://api.wit.ai/');
        expect(options.headers).toEqual({
          'Authorization': `Bearer ${config.wit.token}`,
          'Content-Type': 'application/json',
          'Accept': config.wit.version
        });
        expect(options.qs).toEqual({ q: text });

        callback(null, { statusCode: 200 }, JSON.stringify(payload));
      };

      container.register('httpClient', mockedClient, { allowOverwrite: true });

      fn((body) => {
        expect(body.confidence).toBe(payload.confidence);
        expect(body.type).toBe(payload.type);
      });

      container.register('httpClient', client, { allowOverwrite: true });
    });
  });

  describe('under invalid circumstances', function() {
    it('throws an error', function() {
      const text    = 'Hello world';
      const fn      = webhook.understandMessage({ text: text });
      const client  = container.fetch('httpClient');

      const error = new Error('Whoops!');
      const mockedClient = (_, callback) => {
        callback(error, { statusCode: 403 }, null);
      };

      container.register('httpClient', mockedClient, { allowOverwrite: true });
      expect(fn).toThrow(error);
      container.register('httpClient', client, { allowOverwrite: true });
    });
  });
});
