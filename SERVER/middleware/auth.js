import jwt, { decode } from "jsonwebtoken";
const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ").pop();

    // const decryptedToken =
    jwt.verify(token, process.env.SECRET_PASSPHRASE, (err, decode) => {
      if (err) {
        res.send({
          success: false,
          message: "Invalid token",
        });
      } else {
        req.body.user_id = decode.user_id;
        next();
      }
    });
  } catch (err) {
    res.send({
      success: false,
      message: "Invalid token",
    });
  }
};

export default auth;
