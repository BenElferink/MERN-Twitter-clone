import jwt from 'jsonwebtoken';

export function authFromCookie(request, response, next) {
  try {
    const token = request.cookies.token;
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    if (verified) {
      request.user = verified.id;
      next();
    } else {
      return response
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
    return response
      .status(401)
      .cookie('token', '', {
        httpOnly: true,
        sameSite: 'Strict',
        expires: new Date(0),
      })
      .json({ message: 'Unauthorized' });
  }
}

export function authFromHeaders(request, response, next) {
  try {
    const token = request.headers.authorization.split(' ')[1];

    console.log(token);

    const verified = jwt.verify(token, process.env.JWT_SECRET);

    if (verified) {
      request.user = verified.id;
      next();
    } else {
      return response.status(401).json({
        message: 'Unauthorized',
      });
    }
  } catch (error) {
    console.error(`❌ ${error.message}`);
    return response.status(401).json({
      message: 'Unauthorized',
    });
  }
}
