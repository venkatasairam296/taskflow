import express from 'express';
import { getCurrentUser, login, register } from '../services/authService.js';

const router = express.Router();

router.post('/register', async (req, res, next) => {
  try {
    const user = await register(req.body.email, req.body.password);

    return res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const user = await login(req.body.email, req.body.password);

    req.session.regenerate((error) => {
      if(error){
        return next(error);
      }

      req.session.userId = user.id;

      req.session.save((error) => {
        if(error){
          return next(error);
        }

        return res.status(200).json(user);
      });
    });

  } catch (error) {
    next(error);
  }
});

router.get('/me', async (req, res, next) => {
  try {
    const user = await getCurrentUser(req.session.userId);

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

router.post('/logout', async (req, res, next) => {
  req.session.destroy((error) => {
    if(error){
      return next(error);
    }

    res.clearCookie('taskflow.sid',{
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });

    return res.status(200).json({
      message: 'User logout successfully.'
    })
  });
});

export default router;