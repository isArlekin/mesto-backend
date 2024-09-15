import { NextFunction, Request, Response } from 'express';
import User from '../models/user';
import { CREATED, SUCCESS } from '../constants/responseCodes';
import NotFoundError from '../errors/NotFoundError';

export const findAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return next(error);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, about, avatar } = req.body;
    const user = await User.create({
      name,
      about,
      avatar,
    });
    return res.status(CREATED).json(user);
  } catch (error) {
    return next(error);
  }
};

export const findUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      throw new NotFoundError(`User with id ${req.params.userId} not found`);
    }

    return res.status(SUCCESS).json(user);
  } catch (error) {
    return next(error);
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user._id;
    const { name, about } = req.body;

    const user = await User.findByIdAndUpdate({ _id: userId }, { name, about }, { new: true });

    if (!user) {
      throw new NotFoundError(`User with id ${req.params.userId} not found`);
    }

    return res.status(SUCCESS).json(user);
  } catch (error) {
    return next(error);
  }
};

export const updateAvatar = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user._id;
    const { avatar } = req.body;

    const user = await User.findByIdAndUpdate({ _id: userId }, { avatar }, { new: true });

    if (!user) {
      throw new NotFoundError(`User with id ${req.params.userId} not found`);
    }

    return res.status(SUCCESS).json(user);
  } catch (error) {
    return next(error);
  }
};
