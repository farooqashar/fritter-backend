import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import FreetCollection from '../freet/collection';

/**
 * Checks if a freet with freetId is req.params exists
 */
const isFreetExists = async (req: Request, res: Response, next: NextFunction) => {
  const validFormat = Types.ObjectId.isValid(req.params.freetId);
  const freet = validFormat ? await FreetCollection.findOne(req.params.freetId) : '';
  if (!freet) {
    res.status(404).json({
      error: {
        freetNotFound: `Freet with freet ID ${req.params.freetId} does not exist.`
      }
    });
    return;
  }

  next();
};

/**
 * Checks if the content of the freet in req.body is valid, i.e not a stream of empty
 * spaces and not more than 140 characters
 */
const isValidFreetContent = (req: Request, res: Response, next: NextFunction) => {
  const {content} = req.body as {content: string};
  if (!content.trim()) {
    res.status(400).json({
      error: 'Freet content must be at least one character long.'
    });
    return;
  }

  if (content.length > 140) {
    res.status(413).json({
      error: 'Freet content must be no more than 140 characters.'
    });
    return;
  }

  next();
};

/**
 * Checks if the reactions-based content of the freet in req.body is valid, i.e not negative
 */
const isValidFreetReactions = (req: Request, res: Response, next: NextFunction) => {
  const {likes} = req.body as {likes: number};
  const {laughs} = req.body as {laughs: number};
  const {loves} = req.body as {loves: number};
  const {angries} = req.body as {angries: number};
  const {sadness} = req.body as {sadness: number};
  const {reports} = req.body as {reports: number};

  if (likes < 0) {
    res.status(400).json({
      error: 'Freet likes must be non-negative'
    });
    return;
  }

  if (laughs < 0) {
    res.status(400).json({
      error: 'Freet laughs must be non-negative'
    });
    return;
  }

  if (loves < 0) {
    res.status(400).json({
      error: 'Freet loves must be non-negative'
    });
    return;
  }

  if (angries < 0) {
    res.status(400).json({
      error: 'Freet angries must be non-negative'
    });
    return;
  }

  if (sadness < 0) {
    res.status(400).json({
      error: 'Freet sadness must be non-negative'
    });
    return;
  }

  if (reports < 0) {
    res.status(400).json({
      error: 'Freet reports must be non-negative'
    });
    return;
  }

  next();
};

/**
 * Checks if the current user is the author of the freet whose freetId is in req.params
 */
const isValidFreetModifier = async (req: Request, res: Response, next: NextFunction) => {
  const freet = await FreetCollection.findOne(req.params.freetId);
  const userId = freet.authorId._id;
  if (req.session.userId !== userId.toString()) {
    res.status(403).json({
      error: 'Cannot modify other users\' freets.'
    });
    return;
  }

  next();
};

export {
  isValidFreetContent,
  isFreetExists,
  isValidFreetModifier,
  isValidFreetReactions
};
