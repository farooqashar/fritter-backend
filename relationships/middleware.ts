import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import UserRelationshipCollection from '../freet/collection';
import UserCollection from '../user/collection';
import UserModel from '../user/model';
import mongoose from 'mongoose';

/**
 * Checks if the relationship status is not valid
 */
const isValidRelationshipStatus = async (req: Request, res: Response, next: NextFunction) => {
  const validRelationships = new Set();
  validRelationships.add('single');
  validRelationships.add('married');
  validRelationships.add('complicated');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {relationshipStatus} = req.body;
  if (!validRelationships.has(relationshipStatus)) {
    res.status(400).json({
      error: {invalidRelationshipStatus: 'Not a valid relationship status. It must be either single,married, or complicated.'}
    });
    return;
  }

  next();
};

/**
 * Checks if the best friends are valid
 */
const isValidBestFriends = async (req: Request, res: Response, next: NextFunction) => {
  if (req.body.bestFriends) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {bestFriends} = req.body;

    for (const eachFriend of bestFriends) {
      try {
        // eslint-disable-next-line no-await-in-loop, @typescript-eslint/no-unsafe-assignment
        const actualUser = await UserModel.findOne({_id: eachFriend});
        if (!actualUser) {
          res.status(404).json({
            error: {invalidUser: `A best friend with id ${eachFriend as string} does not exist.`}
          });
          return;
        }
      } catch (err: unknown) {
        res.status(404).json({
          error: {invalidUser: `A best friend with id ${eachFriend as string} does not exist.`}
        });
        return;
      }
    }
  }

  next();
};

/**
 * Checks if a user exists and is provided
 */
const isUserExisting = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const actualUser = await UserModel.findOne({_id: req.query.userId});
    if (!actualUser) {
      res.status(404).json({
        error: {invalidUser: `A user with id ${req.query.userId as string} does not exist.`}
      });
      return;
    }
  } catch (err: unknown) {
    res.status(404).json({
      error: {invalidUser: `A user with id ${req.query.userId as string} does not exist.`}
    });
    return;
  }

  next();
};

export {
  isValidRelationshipStatus,
  isValidBestFriends,
  isUserExisting
};
