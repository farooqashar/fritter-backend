import type {Request, Response} from 'express';
import express from 'express';
import UserRelationshipCollection from './collection';
import UserCollection from '../user/collection';
import * as userValidator from '../user/middleware';
import * as util from './util';

const router = express.Router();

/**
 * Create a new userRelationshipObject.
 *
 * @name POST /api/users/relationships
 *
 * @param {string} relationshipStatus - The relationship status of a user
//  * @param {string[]} bestFriends - The list of best friends(users) ids for a user
 * @return {UserRelationshipObjectResponse} - The created userRelationshipObject
 * @throws {403} - If the user is not logged in
 */
router.post(
  '/',
  [
    userValidator.isUserLoggedIn
  ],
  async (req: Request, res: Response) => {
    const userId = (req.session.userId as string) ?? ''; // Will not be an empty string since its validated in isUserLoggedIn
    const userRelationshipObject = await UserRelationshipCollection.addOne(userId, req.body.relationshipStatus);
    res.status(201).json({
      message: 'Your relationship status object was created successfully.',
      relationshipObject: util.constructUserRelationshipResponse(userRelationshipObject)
    });
  }
);

export {router as userRelationshipRouter};
