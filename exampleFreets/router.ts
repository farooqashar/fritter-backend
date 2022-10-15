import type {NextFunction, Request, Response} from 'express';
import express from 'express';
import ExampleFreetCollection from './collection';
import * as userValidator from '../user/middleware';
import * as exampleFreetValidator from '../exampleFreets/middleware';
import * as util from './util';

const router = express.Router();

/**
 * Get exampleFreets by author.
 *
 * @name GET /api/exampleFreets?authorId=id
 *
 * @return {ExampleFreetResponse[]} - An array of exampleFreets created by user with id, authorId
 * @throws {400} - If authorId is not given
 * @throws {404} - If no user has given authorId
 *
 */
router.get(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    // Check if authorId query parameter was supplied
    if (req.query.authorId === undefined) {
      res.status(400).json('{error: authorId is not provided}');
    }

    next();
  },
  [
    userValidator.isAuthorExists
  ],
  async (req: Request, res: Response) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const authorExampleFreets = await ExampleFreetCollection.findAllByUsername(req.query.authorId as string);
    res.status(200).json(authorExampleFreets);
  }
);

/**
 * Create a new exampleFreet.
 *
 * @name POST /api/exampleFreets
 *
 * @param {string} content - The content of the exampleFreet
 * @return {ExampleFreetResponse} - The created exampleFreet
 * @throws {403} - If the user is not logged in
 * @throws {400} - If the exampleFreet content is empty or a stream of empty spaces
 * @throws {413} - If the exampleFreet content is more than 140 characters long
 */
router.post(
  '/',
  [
    userValidator.isUserLoggedIn
  ],
  async (req: Request, res: Response) => {
    const userId = (req.session.userId as string) ?? ''; // Will not be an empty string since its validated in isUserLoggedIn
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const exampleFreet = await ExampleFreetCollection.addOne(userId, req.body.content);
    res.status(201).json({
      message: 'Your exampleFreet was created successfully.',
      freet: util.constructExampleFreetResponse(exampleFreet)
    });
  }
);

/**
 * Delete an exampleFreet
 *
 * @name DELETE /api/exampleFreets/:id
 *
 * @return {string} - A success message
 * @throws {403} - If the user is not logged in or is not the author of
 *                 the freet
 * @throws {404} - If the freetId is not valid
 */
router.delete(
  '/:exampleFreetId?',
  [
    userValidator.isUserLoggedIn
  ],
  async (req: Request, res: Response) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    await ExampleFreetCollection.deleteOne(req.params.exampleFreetId);
    res.status(200).json({
      message: 'Your exampleFreet was deleted successfully.'
    });
  }
);

export {router as exampleFreetRouter};
