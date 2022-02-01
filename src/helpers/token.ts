import { verify, sign } from "jsonwebtoken";

export function generateToken (body: {id: number, name: string, username: string}, key: string = process.env.JWT_SECRET) {
  let token = sign({
    id: body.id,
    name: body.name,
    username: body.username
  }, key, {
    expiresIn: "24h"
  });

  return token;
};

export function verifyToken (token: string, key: string = process.env.JWT_SECRET): any {
  return new Promise((resolve, reject) => {
    let secret = key;

    verify(token, secret, async (err, decoded) => {
      if (err) return reject(err);

      return resolve(decoded);
    });
  });
};
