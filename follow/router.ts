import type {Request, Response} from 'express';
import express from 'express';
import FollowCollection from './collection';
import UserCollection from '../user/collection';
import * as userValidator from '../user/middleware';
import * as relationsValidator from '../relationships/middleware';
import * as followValidator from '../follow/middleware';
import * as util from './util';

const router = express.Router();

/**
 * Create a new Follow Object.
 *
 * @name POST /api/users/following
 *
 * @param {string[]} following - The list of other users (following) ids a user is following
 * @return {FollowResponse} - The created Follow object
 * @throws {403} - If the user is not logged in
 */
router.post(
  '/',
  [
    userValidator.isUserLoggedIn,
    followValidator.isValidFollowing
  ],
  async (req: Request, res: Response) => {
    const userId = (req.session.userId as string) ?? ''; // Will not be an empty string since its validated in isUserLoggedIn
    const followObj = await FollowCollection.addFollowObject(userId, req.body.following);
    res.status(201).json({
      message: 'Your Follow object was created successfully.',
      followObject: util.constructFollowResponse(followObj)
    });
  }
);

/**
 * Update user's following other users.
 *
 * @name PUT /api/users/following
 *
 * @return {newFollow} - The updated Follow Object
 * @throws {403} - If user is not logged in
 */
router.put(
  '/',
  [
    userValidator.isUserLoggedIn,
    followValidator.isValidFollowing
  ],
  async (req: Request, res: Response) => {
    const userId = (req.session.userId as string) ?? ''; // Will not be an empty string since its validated in isUserLoggedIn

    const newFollow = await FollowCollection.updateFollowing(userId, req.body);
    res.status(200).json({
      message: 'Your Following Users were updated successfully.',
      followObj: util.constructFollowResponse(newFollow)
    });
  }
);

/**
 * Get Follow Object by user.
 *
 * @name GET /api/users/following?userId=id
 *
 * @return {FollowResponse} - User Following
 * @throws {400} - If userId is not given
 * @throws {404} - If no user has given userId
 *
 */
router.get(
  '/',
  [
    userValidator.isUserLoggedIn,
    relationsValidator.isUserExisting
  ],
  async (req: Request, res: Response) => {
    // Check if authorId query parameter was supplied
    if (req.query.userId === undefined) {
      return;
    }

    const followObject = await FollowCollection.findFollowingByUser(req.query.userId as string);
    const response = util.constructFollowResponse(followObject);
    res.status(200).json(response);
  }
);

export {router as followRouter};
