const Xhttp = require('../app/http');

describe('Xhttp.isGet', function () {
  it('checks if event.httpMethod === "GET"', function() {
    expect(Xhttp.isGet({ httpMethod: 'GET' })).toBe(true);
    expect(Xhttp.isGet({ httpMethod: 'POST' })).toBe(false);
  });
});

describe('Xhttp.isSubscribe', function() {
  it('checks if event.queryStringParameters.hub.mode === "subscribe"', function() {
    expect(Xhttp.isSubscribe({ queryStringParameters: { 'hub.mode': 'subscribe' } })).toBe(true);
    expect(Xhttp.isSubscribe({ queryStringParameters: { 'hub.mode': 'false' } })).toBe(false);
  });
});

describe('Xhttp.isTokenValid', function() {
  it('returns a function that validates if the first argument matches the events verify token param', function() {
    const token = 'yolo-swag';
    const fn    = Xhttp.isTokenValid(token);

    expect(fn({ queryStringParameters: { 'hub.verify_token': token } })).toBe(true);
  });
});

describe('Xhttp.respondWith', function() {
  it('returns a first order function that will call its argument with null and a response object', function() {
    const body     = { foo: 'bar' };
    const fn       = Xhttp.respondWith(body);
    const argument = (_, payload) => payload;
    const result   = fn(argument);

    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(body);
  });
});

describe('Xhttp.clientError', function() {
  it('returns a first order function that will call its argument with null and a response object', function() {
    const argument = (_, payload) => payload;
    const result   = Xhttp.clientError(argument);

    expect(result.statusCode).toEqual(400);
    expect(result.body).toEqual(null);
  });
});
