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
const isValidEnemies = async (req: Request, res: Response, next: NextFunction) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {enemies} = req.body;

  for (const enemy of enemies) {
    try {
      // eslint-disable-next-line no-await-in-loop, @typescript-eslint/no-unsafe-assignment
      const actualUser = await UserModel.findOne({_id: enemy});
      if (!actualUser) {
        res.status(404).json({
          error: `An enemy with id ${enemy as string} does not exist.`
        });
        return;
      }

      console.log('attempting to find enemy');
      // eslint-disable-next-line no-await-in-loop
      const potentialEnemy = await EnemiesCollection.findEnemiesByUser(enemy);

      if (!potentialEnemy) {
        res.status(404).json({
          error: 'This user has no enemies.'
        });
        return;
      }
    } catch (err: unknown) {
      res.status(404).json({
        error: `An enemy with id ${enemy as string} does not exist.`
      });
      return;
    }
  }

  next();
};

export {
  isValidEnemies
};
