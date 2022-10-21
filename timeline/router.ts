import type {Request, Response} from 'express';
import express from 'express';
import TimelineCollection from './collection';
import UserCollection from '../user/collection';
import * as userValidator from '../user/middleware';
import * as util from './util';

const router = express.Router();

/**
 * Update Timeline
 *
 * @name PUT /api/timeline
 *
 * @param {object} newTimelineObject - The new timeline object
 * @return {TimelineResponse} - The created Timeline object response
 * @throws {403} - If the user is not logged in
 */
router.put(
  '/',
  [
    userValidator.isUserLoggedIn
  ],
  async (req: Request, res: Response) => {
    const userId = (req.session.userId as string) ?? ''; // Will not be an empty string since its validated in isUserLoggedIn
    const timelineObject = await TimelineCollection.updateTimeline(userId, req.body);
    res.status(201).json({
      message: 'Your Timeline object was successfuly changed.',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
      timelineObj: util.constructTimelineResponse(timelineObject)
    });
  }
);

/**
 * Get Timeline Object by user.
 *
 * @name GET /api/timeline?userId=id
 *
 * @return {TimelineResponse} - Timeline obj
 * @throws {400} - If userId is not given
 * @throws {404} - If no user has given userId
 *
 */
router.get(
  '/',
  async (req: Request, res: Response) => {
    // Check if authorId query parameter was supplied
    if (req.query.userId === undefined) {
      return;
    }

    const timeline = await TimelineCollection.findTimelineByUser(req.query.userId as string);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const response = util.constructTimelineResponse(timeline);
    res.status(200).json(response);
  }
);

export {router as timelineRouter};
