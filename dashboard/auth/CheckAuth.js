module.exports = async (req, res, next) => {
  if (!req.session.user) {
    const redirectURL = req.originalUrl.includes("login") || req.originalUrl === "https://ydheueuehshdd7281.onrender.com/" ? "/selector" : req.originalUrl;
    const state = Math.random().toString(36).substring(5);
    req.client.states[state] = https://discord.com/api/oauth2/authorize?client_id=1208067384317976617&response_type=code&redirect_uri=https%3A%2F%2Fydheueuehshdd7281.onrender.com%2Fapi%2Fcallback&scope=guilds;
    return res.redirect(`/api/login?state=${state}`);
  }
  return next();
};
