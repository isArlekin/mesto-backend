import { NextFunction, Request, Response } from 'express';
import Card from '../models/card';
import { CREATED, SUCCESS } from '../constants/responseCodes';
import NotFoundError from '../errors/NotFoundError';

export const findAllCards = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cards = await Card
      .find()
      .populate('owner')
      .populate('likes');
    return res.status(SUCCESS).json(cards);
  } catch (error) {
    return next(error);
  }
};

export const createCard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, link } = req.body;
    const card = await Card.create({
      name,
      link,
      owner: req.user._id,
    });
    return res.status(CREATED).json(card);
  } catch (error) {
    return next(error);
  }
};

export const deleteCard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { cardId } = req.params;
    const deletionResult = await Card.deleteOne({ _id: cardId });

    if (deletionResult.deletedCount === 0) {
      throw new NotFoundError(`Card with id ${cardId} not found`);
    }

    return res.status(SUCCESS).send();
  } catch (error) {
    return next(error);
  }
};

export const likeCard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { cardId } = req.params;
    const userId = req.user._id;
    const card = await Card.findByIdAndUpdate(
      { _id: cardId },
      { $addToSet: { likes: userId } },
      { new: true },
    );

    if (!card) {
      throw new NotFoundError(`Card with id ${cardId} not found`);
    }

    return res.status(SUCCESS).json(card);
  } catch (error) {
    return next(error);
  }
};

export const dislikeCard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { cardId } = req.params;
    const userId = req.user._id;
    const card = await Card.findByIdAndUpdate(
      { _id: cardId },
      { $pull: { likes: userId } },
      { new: true },
    );

    if (!card) {
      throw new NotFoundError(`Card with id ${cardId} not found`);
    }

    return res.status(SUCCESS).json(card);
  } catch (error) {
    return next(error);
  }
};
