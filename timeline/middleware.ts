import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import UserRelationshipCollection from '../freet/collection';
import UserCollection from '../user/collection';
import UserModel from '../user/model';
import EnemiesModel from '../enemies/model';
import EnemiesCollection from '../enemies/collection';
import mongoose from 'mongoose';

/**
 * Checks if the personal users are valid
 */
const isValidPersonal = async (req: Request, res: Response, next: NextFunction) => {
  if (req.body.personal) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {personal} = req.body;
    for (const eachPersonal of personal) {
      if (eachPersonal) {
        try {
          // eslint-disable-next-line no-await-in-loop, @typescript-eslint/no-unsafe-assignment
          const actualUser = await UserModel.findOne({_id: eachPersonal});
          // eslint-disable-next-line max-depth
          if (!actualUser) {
            res.status(404).json({
              error: {invalidUser: `A personal user with id ${eachPersonal as string} does not exist.`}
            });
            return;
          }
        } catch (err: unknown) {
          // eslint-disable-next-line max-depth
          if (eachPersonal) {
            res.status(404).json({
              error: {invalidUser: `A personal user with id ${eachPersonal as string} does not exist.`}
            });
            return;
          }

          next();
        }
      }
    }
  }

  next();
};

/**
 * Checks if the corporate users are valid
 */
const isValidCorporate = async (req: Request, res: Response, next: NextFunction) => {
  if (req.body.corporate) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {corporate} = req.body;
    for (const eachCorporate of corporate) {
      if (eachCorporate) {
        try {
          // eslint-disable-next-line no-await-in-loop, @typescript-eslint/no-unsafe-assignment
          const actualUser = await UserModel.findOne({_id: eachCorporate});
          // eslint-disable-next-line max-depth
          if (!actualUser) {
            res.status(404).json({
              error: {invalidUser: `A corporate user with id ${eachCorporate as string} does not exist.`}
            });
            return;
          }
        } catch (err: unknown) {
          res.status(404).json({
            error: {invalidUser: `A corporate user with id ${eachCorporate as string} does not exist.`}
          });
          return;
        }
      }
    }
  }

  next();
};

export {
  isValidPersonal,
  isValidCorporate
};
