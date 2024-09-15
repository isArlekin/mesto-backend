import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import {
  findAllCards, deleteCard, createCard, likeCard, dislikeCard,
} from '../controllers/cards';

const router = Router();

router.get('/', findAllCards);

router.post('/', celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required(),
  }),
}), createCard);

router.delete('/:cardId', celebrate({
  [Segments.PARAMS]: Joi.object({
    cardId: Joi.string().hex().length(24),
  }),
}), deleteCard);

router.put('/:cardId/likes', celebrate({
  [Segments.PARAMS]: Joi.object({
    cardId: Joi.string().hex().length(24),
  }),
}), likeCard);

router.delete('/:cardId/likes', celebrate({
  [Segments.PARAMS]: Joi.object({
    cardId: Joi.string().hex().length(24),
  }),
}), dislikeCard);

export default router;
