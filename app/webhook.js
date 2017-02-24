module.exports.extractMessage = (event) => {
  return (fn) => {
    const text = JSON.parse(event.body)['messages'][0]['text'];
    return fn({ text: text });
  };
};

module.exports.understandMessage = (object) => {
  const text = object.text;

  return (fn) => {

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
