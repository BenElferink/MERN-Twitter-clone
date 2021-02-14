import jwt from 'jsonwebtoken';

export function authFromCookie(request, response, next) {
  try {
    const token = request.cookies.token;
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    if (verified) {
      request.user = verified.id;
      next();
    } else {
      response.status(401).json({ message: 'Unauthorized' });
    }
  } catch (error) {
    console.log(error);
    response.status(401).json({ message: 'Unauthorized' });
  }
}
