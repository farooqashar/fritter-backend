import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import UserRelationshipCollection from '../freet/collection';
import UserCollection from '../user/collection';
import UserModel from '../user/model';
import EnemiesModel from '../enemies/model';
import EnemiesCollection from '../enemies/collection';
import mongoose from 'mongoose';

/**
 * Checks if the enemies are valid
 */
const isValidCredit = async (req: Request, res: Response, next: NextFunction) => {
  if (req.body.score) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {score} = req.body;
    if (score < 0) {
      res.status(400).json({
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        error: {score: `Credibility Score cannot be negative. It is currently ${score}`}
      });
      return;
    }
  }

  next();
};

export {
  isValidCredit
};
