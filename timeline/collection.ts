import type {HydratedDocument, Types} from 'mongoose';
import type {Timeline} from './model';
import TimelineModel from './model';
import UserCollection from '../user/collection';

class TimelineCollection {
  /**
   * Update user's Timeline
   *
   * @param {string} userId - The userId of the user to update
   * @param {Object} newTimelineObj - An object with the user's updated timeline
   * @return {Promise<HydratedDocument<Timeline>>} - updated timeline
   */
  static async updateTimeline(userId: Types.ObjectId | string, newTimelineObj: any): Promise<HydratedDocument<Timeline>> {
    const databaseTimeline = await TimelineModel.findOne({user: userId});

    // Updating personal or corporate user ids
    if (databaseTimeline) {
      if (databaseTimeline.personal) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        databaseTimeline.personal = newTimelineObj.personal;
      }

      if (databaseTimeline.corporate) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        databaseTimeline.corporate = newTimelineObj.corporate;
      }

      await databaseTimeline.save();
      return databaseTimeline;
      // Adding new timeline object
    }

    const timelineObj = new TimelineModel({
      user: userId,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      personal: newTimelineObj.personal,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      corporate: newTimelineObj.corporate
    });
    await timelineObj.save(); // Saves to MongoDB
    return timelineObj.populate('user');
  }

  /**
     * Get User Timeline
     *
     * @param {string} userId - The userid used to get the timeline of the user
     * @return {Promise<HydratedDocument<Timeline>>} - the timeline object
     */

  static async findTimelineByUser(userId: string): Promise<HydratedDocument<Timeline>> {
    return TimelineModel.findOne({user: userId}).populate('user');
  }
}

export default TimelineCollection;
