module.exports = httpResponse => {
  return {
    error: statusCode => {
      httpResponse.statusCode = statusCode;
      httpResponse.end();
    },
    ok: () => {
      httpResponse.statusCode = 200;
      httpResponse.end();
    },
    send: (obj, statusCode) => {
      if (statusCode) httpResponse.statusCode = statusCode;
      httpResponse.write(JSON.stringify(obj));
      httpResponse.end();
    },
  };
};
