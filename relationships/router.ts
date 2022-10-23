import type {Request, Response} from 'express';
import express from 'express';
import UserRelationshipCollection from './collection';
import UserCollection from '../user/collection';
import * as userValidator from '../user/middleware';
import * as relationshipValidator from '../relationships/middleware';
import * as util from './util';

const router = express.Router();

/**
 * Create a new userRelationshipObject.
 *
 * @name POST /api/users/relationships
 *
 * @param {string} relationshipStatus - The relationship status of a user
 * @param {string[]} bestFriends - The list of best friends(users) ids for a user
 * @return {UserRelationshipObjectResponse} - The created userRelationshipObject
 * @throws {403} - If the user is not logged in
 * @throws {400} - the relationship status is not in the appropiate set{Single, Complicated, Married}
 * @throws {404} - If a user best friend does not exist
 */
router.post(
  '/',
  [
    userValidator.isUserLoggedIn,
    relationshipValidator.isValidRelationshipStatus,
    relationshipValidator.isValidBestFriends
  ],
  async (req: Request, res: Response) => {
    const userId = (req.session.userId as string) ?? ''; // Will not be an empty string since its validated in isUserLoggedIn
    const userRelationshipObject = await UserRelationshipCollection.addOne(userId, req.body.relationshipStatus, req.body.bestFriends);
    res.status(201).json({
      message: 'Your relationship status object was created successfully.',
      relationshipObject: util.constructUserRelationshipResponse(userRelationshipObject)
    });
  }
);

/**
 * Update a user's relationship status.
 *
 * @name PUT /api/users/relationships
 *
 * @param {string} newRelationshipStatus - The user's new Relationship Status
 * @return {newRelationshipStatusObject} - The updated Relationship Status Object
 * @throws {403} - If user is not logged in
 */
router.put(
  '/',
  [
    userValidator.isUserLoggedIn,
    relationshipValidator.isValidRelationshipStatus,
    relationshipValidator.isValidBestFriends
  ],
  async (req: Request, res: Response) => {
    const userId = (req.session.userId as string) ?? ''; // Will not be an empty string since its validated in isUserLoggedIn

    const newRelationshipStatus = await UserRelationshipCollection.updateOne(userId, req.body);
    res.status(200).json({
      message: 'Your relationship status was updated successfully.',

      newRelationshipStatus: util.constructUserRelationshipResponse(newRelationshipStatus)
    });
  }
);

/**
 * Get User Relationships by user.
 *
 * @name GET /api/users/relationships?userId=id
 *
 * @return {UserRelationshipResponse[]} - User Relationship Status
 * @throws {400} - If userId is not given
 * @throws {404} - If no user has given userId
 *
 */
router.get(
  '/',
  [
    userValidator.isUserLoggedIn,
    relationshipValidator.isUserExisting
  ],
  async (req: Request, res: Response) => {
    // Check if authorId query parameter was supplied
    if (req.query.userId === undefined) {
      res.status(400).json({
        error: 'Provided userId must be nonempty.'
      });
      return;
    }

    const relationshipStatus = await UserRelationshipCollection.findUserRelationshipByUsername(req.query.userId as string);
    const response = util.constructUserRelationshipResponse(relationshipStatus);
    res.status(200).json(response);
  }
);

export {router as userRelationshipRouter};
