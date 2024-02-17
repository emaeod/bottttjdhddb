module.exports = async (req, res, next) => {
  if (!req.session.user) {
    const redirectURL = req.originalUrl.includes("login") || req.originalUrl === "/" ? "/selector" : req.originalUrl;
    const state = Math.random().toString(36).substring(5);
    req.client.states[state] = redirectURL;
    return res.redirect(`https://ydheueuehshdd7281.onrender.com`);
  }
  return next();
};
