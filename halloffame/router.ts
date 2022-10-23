import type {Request, Response} from 'express';
import express from 'express';
import HOFCollection from './collection';
import UserCollection from '../user/collection';
import * as userValidator from '../user/middleware';
import * as hofValidator from '../halloffame/middleware';
import * as freetValidator from '../freet/middleware';
import * as relationsValidator from '../relationships/middleware';
import * as util from './util';

const router = express.Router();

/**
 * Initialize Hall of Fame
 *
 * @name POST /api/halloffame
 *
 * @param {string} user - The id of the user of the Hall of Fame
 * @return {HOFResponse} - The created HOF object
 * @throws {403} - If the user is not logged in
 */
router.post(
  '/',
  [
    userValidator.isUserLoggedIn,
    hofValidator.isInitializedHOF
  ],
  async (req: Request, res: Response) => {
    const userId = (req.session.userId as string) ?? ''; // Will not be an empty string since its validated in isUserLoggedIn
    const HOFobj = await HOFCollection.initializeHallOfFame(userId);
    res.status(201).json({
      message: 'Your Hall of Fame has been successfully created.',
      HOFobj: util.constructHOFResponse(HOFobj)
    });
  }
);

/**
 * Toggle a Freet for the Hall of Fame
 *
 * @name PUT /api/halloffame/freets
 *
 * @param {string} user - The id of the user of the Hall of Fame
 * @param {string} freetId - The id of the freet to be added to the Hall of Fame
 * @return {HOFResponse} - The created HOF object
 * @throws {403} - If the user is not logged in
 */
router.put(
  '/freets',
  [
    userValidator.isUserLoggedIn,
    hofValidator.isNotInitializedHOF,
    hofValidator.isFreetExists
  ],
  async (req: Request, res: Response) => {
    const userId = (req.session.userId as string) ?? ''; // Will not be an empty string since its validated in isUserLoggedIn
    const HOFobj = await HOFCollection.toggleFreetForHOF(userId, req.body.freetId as string);
    res.status(201).json({
      message: 'Your Hall of Fame has been successfully updated.',
      HOFobj: util.constructHOFResponse(HOFobj)
    });
  }
);

/**
 * Get HOF Object by user.
 *
 * @name GET /api/halloffame/freets?userId=id
 *
 * @return {HOFResponse} - User HOF Object
 * @throws {400} - If userId is not given
 * @throws {404} - If no user has given userId
 *
 */
router.get(
  '/freets', [
    userValidator.isUserLoggedIn,
    relationsValidator.isUserExisting
  ], async (req: Request, res: Response) => {
    // Check if authorId query parameter was supplied
    if (req.query.userId === undefined) {
      return;
    }

    const HOFObject = await HOFCollection.findHallOfFameObj(req.query.userId as string);
    const response = util.constructHOFResponse(HOFObject);
    res.status(200).json(response);
  }
);

export {router as HOFRouter};
