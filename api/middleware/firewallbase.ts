const admin = require("firebase-admin");

export default function firewallbase(req, res, next) {
  const authorization = req.header("Authorization");
  if (authorization) {
    let token = authorization.split(" ");
    admin
      .auth()
      .verifyIdToken(token[1])
      .then(decodedToken => {
        res.locals.uid = decodedToken.uid;
        next();
      })
      .catch(err => {
        console.log("error", err.code);
        res.sendStatus(401);
      });
  } else {
    console.log("Authorization header is not found");
    res.sendStatus(405);
  }
}
