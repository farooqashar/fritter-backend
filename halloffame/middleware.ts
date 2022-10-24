import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import UserRelationshipCollection from '../freet/collection';
import UserCollection from '../user/collection';
import FreetCollection from '../freet/collection';
import UserModel from '../user/model';
import EnemiesModel from '../enemies/model';
import EnemiesCollection from '../enemies/collection';
import mongoose from 'mongoose';
import HOFModel from '../halloffame/model';

/**
 * Checks if the hall of fame exists
 */
const isInitializedHOF = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const actualHOF = await HOFModel.findOne({user: req.session.userId});
    if (actualHOF) {
      res.status(403).json({
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        error: {hofExists: `Hall of Fame already exists for user with user id ${req.session.userId}`}
      });
      return;
    }
  } catch (err: unknown) {
    next();
  }

  next();
};

/**
 * Checks if the hall of fame does not exist
 */
const isNotInitializedHOF = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const actualHOF = await HOFModel.findOne({user: req.session.userId});
    if (!actualHOF) {
      res.status(404).json({
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        error: {noHof: `Hall of Fame does not exists for user with user id ${req.session.userId}.`}
      });
      return;
    }
  } catch (err: unknown) {
    res.status(404).json({
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      error: {noHof: `Hall of Fame does not exists for user with user id ${req.session.userId}.`}
    });
    return;
  }

  next();
};

/**
 * Checks if a freet with freetId is req.params exists
 */
const isFreetExists = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const freet = await FreetCollection.findOne(req.body.freetId);
    if (!freet) {
      res.status(404).json({
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        error: {noFreetFound: `Freet with freet ID ${req.body.freetId} does not exist.`}
      });
      return;
    }
  } catch (err: unknown) {
    res.status(404).json({
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      error: {noFreetFound: `Freet with freet ID ${req.body.freetId} does not exist.`}
    });
    return;
  }

  next();
};

export {
  isInitializedHOF,
  isNotInitializedHOF,
  isFreetExists
};
