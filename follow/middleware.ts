import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import UserRelationshipCollection from '../freet/collection';
import UserCollection from '../user/collection';
import UserModel from '../user/model';
import EnemiesModel from '../enemies/model';
import EnemiesCollection from '../enemies/collection';
import mongoose from 'mongoose';

/**
 * Checks if the users a given user is following
 */
const isValidFollowing = async (req: Request, res: Response, next: NextFunction) => {
  if (req.body.following) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {following} = req.body;
    for (const eachFollowing of following) {
      try {
      // eslint-disable-next-line no-await-in-loop, @typescript-eslint/no-unsafe-assignment
        const actualUser = await UserModel.findOne({_id: eachFollowing});
        if (!actualUser) {
          res.status(404).json({
            error: {noValidUser: `A user with id ${eachFollowing as string} does not exist.`}
          });
          return;
        }
      } catch (err: unknown) {
        res.status(404).json({
          error: {noValidUser: `A user with id ${eachFollowing as string} does not exist.`}
        });
        return;
      }
    }
  }

  next();
};

export {
  isValidFollowing
};
