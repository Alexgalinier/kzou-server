let middlewares = [];

export const add = (func) => {
  middlewares.push(func);
};

export const exec = (req, res) => {
  let trackReq = req;
  let trackRes = res;

  const next = (index) => (reqUpdated = trackReq, resUpdated = trackRes) => {
    trackReq = reqUpdated !== undefined ? reqUpdated : trackReq;
    trackRes = resUpdated !== undefined ? resUpdated : trackRes;

    if (middlewares[index]) {
      middlewares[index](trackReq, trackRes, next(index + 1));
    }
  };

  next(0)(trackReq, trackRes);
}