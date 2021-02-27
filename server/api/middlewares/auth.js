import jwt from 'jsonwebtoken';

export function authFromCookie(request, response, next) {
  try {
    const token = request.cookies.token;
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    if (verified) {
      request.user = verified.id;
      next();
    } else {
      response
        .status(401)
        .cookie('token', '', {
          httpOnly: true,
          sameSite: 'Strict',
          expires: new Date(0),
        })
        .json({ message: 'Unauthorized' });
    }
  } catch (error) {
    console.error(`❌ ${error.message}`);
    response
      .status(401)
      .cookie('token', '', {
        httpOnly: true,
        sameSite: 'Strict',
        expires: new Date(0),
      })
      .json({ message: 'Unauthorized' });
  }
}
