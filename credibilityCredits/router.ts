import type {NextFunction, Request, Response} from 'express';
import express from 'express';
import CredibilityCollection from './collection';
import * as userValidator from '../user/middleware';
import * as credibilityCreditValidator from '../credibilityCredits/middleware';
import * as relationsValidator from '../relationships/middleware';

import * as util from './util';

const router = express.Router();

/**
 * Update User Credibility Scores
 *
 * @name PUT /api/users/credibilitycredits
 *
 * @param {number} score - the new score for the user
 * @param {number} verifiedColor - potentially new verified color for the user
 * @return {CredibilityResponse} - the updated Credibility Credit Response
 * @throws {403} - If the user is not logged in
 */
router.put(
  '/',
  [
    userValidator.isUserLoggedIn,
    credibilityCreditValidator.isValidCredit
  ],
  async (req: Request, res: Response) => {
    const userId = (req.session.userId as string) ?? ''; // Will not be an empty string since its validated in isUserLoggedIn

    const updatedCredibilityObj = await CredibilityCollection.updateOne(userId, req.body.score);
    res.status(200).json({
      message: 'Your Credibility Credit was updated successfully.',

      credibilityCredit: util.constructCredibilityCreditResponse(updatedCredibilityObj)
    });
  }
);

/**
 * Get Credibility Credit Object by user.
 *
 * @name GET /api/users/credibilitycredits?userId=id
 *
 * @return {CredibilityResponse} - User Credibility Credit
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

    const credObj = await CredibilityCollection.findUserCredibilityCredit(req.query.userId as string);

    const response = util.constructCredibilityCreditResponse(credObj);
    res.status(200).json(response);
  }
);

export {router as credibilityCreditRouter};
