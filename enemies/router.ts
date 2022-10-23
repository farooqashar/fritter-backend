import type {Request, Response} from 'express';
import express from 'express';
import EnemiesCollection from './collection';
import UserCollection from '../user/collection';
import * as userValidator from '../user/middleware';
import * as enemiesValidator from '../enemies/middleware';
import * as relationsValidator from '../relationships/middleware';
import * as util from './util';

const router = express.Router();

/**
 * Create a new Enemies Object.
 *
 * @name POST /api/users/enemies
 *
 * @param {string[]} enemies - The list of enemies (users) ids for a user
 * @return {UserRelationshipObjectResponse} - The created Enemy object
 * @throws {403} - If the user is not logged in
 */
router.post(
  '/',
  [
    userValidator.isUserLoggedIn,
    enemiesValidator.isValidEnemies
  ],
  async (req: Request, res: Response) => {
    const userId = (req.session.userId as string) ?? ''; // Will not be an empty string since its validated in isUserLoggedIn
    const enemyObj = await EnemiesCollection.addEnemyObject(userId, req.body.enemies);
    res.status(201).json({
      message: 'Your Enemy object was created successfully.',
      enemyObject: util.constructEnemiesResponse(enemyObj)
    });
  }
);

/**
 * Update user's enemies.
 *
 * @name PUT /api/users/enemies
 *
 * @return {newEnemyObj} - The updated Enemies Object
 * @throws {403} - If user is not logged in
 */
router.put(
  '/',
  [
    userValidator.isUserLoggedIn,
    enemiesValidator.isValidEnemies
  ],
  async (req: Request, res: Response) => {
    const userId = (req.session.userId as string) ?? ''; // Will not be an empty string since its validated in isUserLoggedIn

    const newEnemy = await EnemiesCollection.updateEnemies(userId, req.body);
    res.status(200).json({
      message: 'Your Enemies were updated successfully.',
      newEnemy: util.constructEnemiesResponse(newEnemy)
    });
  }
);

/**
 * Get Enemies Object by user.
 *
 * @name GET /api/users/enemies?userId=id
 *
 * @return {EnemiesResponse} - User Enemies
 * @throws {400} - If userId is not given
 * @throws {404} - If no user has given userId
 *
 */
router.get(
  '/',
  [userValidator.isUserLoggedIn,
    relationsValidator.isUserExisting],

  async (req: Request, res: Response) => {
    // Check if authorId query parameter was supplied
    if (req.query.userId === undefined) {
      return;
    }

    const enemyObject = await EnemiesCollection.findEnemiesByUser(req.query.userId as string);
    const response = util.constructEnemiesResponse(enemyObject);
    res.status(200).json(response);
  }
);

export {router as enemiesRouter};
