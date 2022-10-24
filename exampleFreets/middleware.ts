import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import ExampleFreetCollection from '../exampleFreets/collection';
import ExampleFreetModel from '../exampleFreets/model';
import FreetCollection from '../freet/collection';

/**
 * Checks if the content of the exampleFreet in req.body is valid, i.e not a stream of empty
 * spaces and not more than 140 characters
 */
const isValidExampleFreetContent = (req: Request, res: Response, next: NextFunction) => {
  const {content} = req.body as {content: string};
  if (!content.trim()) {
    res.status(400).json({
      error: {emptyFreet: 'Example Freet content must be at least one character long. It is currently empty.'}
    });
    return;
  }

  if (content.length > 140) {
    res.status(413).json({
      error: {tooLongFreet: `Example Freet content must be no more than 140 characters. It is currently ${content.length} characters.`}
    });
    return;
  }

  next();
};

/**
 * Checks if a freet with freetId is req.params exists
 */
const isExampleFreetExists = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const freet = await ExampleFreetModel.findOne({_id: req.params.exampleFreetId});
    if (!freet) {
      res.status(404).json({
        error: {freetNotFound: `Freet with freet ID ${req.params.exampleFreetId} does not exist.`}
      });
      return;
    }
  } catch (err: unknown) {
    res.status(404).json({
      error: {freetNotFound: `Freet with freet ID ${req.params.exampleFreetId} does not exist.`}
    });
    return;
  }

  next();
};

/**
 * Checks if the current user is the author of the freet whose freetId is in req.params
 */
const isValidFreetModifier = async (req: Request, res: Response, next: NextFunction) => {
  const freet = await ExampleFreetModel.findOne({_id: req.params.exampleFreetId});
  const userId = freet.authorId._id;
  if (req.session.userId !== userId.toString()) {
    res.status(403).json({
      error: {noAccess: 'Cannot modify other users\' freets.'}
    });
    return;
  }

  next();
};

export {
  isValidExampleFreetContent,
  isExampleFreetExists,
  isValidFreetModifier
};
