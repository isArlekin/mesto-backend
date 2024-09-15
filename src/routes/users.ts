import { Router } from 'express';
import { Joi, celebrate, Segments } from 'celebrate';
import {
  findAllUsers, findUserById, createUser, updateUser, updateAvatar,
} from '../controllers/users';

const router = Router();

router.get('/', findAllUsers);

router.get('/:userId', celebrate({
  [Segments.PARAMS]: Joi.object({
    userId: Joi.string().hex().length(24),
  }),
}), findUserById);

router.post('/', celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(200),
    avatar: Joi.string().required(),
  }),
}), createUser);

router.patch('/me', celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
  }).min(1),
}), updateUser);

router.patch('/me/avatar', celebrate({
  [Segments.BODY]: Joi.object({
    avatar: Joi.string().required(),
  }),
}), updateAvatar);

export default router;
