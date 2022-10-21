import type {HydratedDocument, Schema} from 'mongoose';
import moment from 'moment';
import type {Timeline, TimelinePopulated} from './model';

// Update this if you add a property to the Timeline object type!
type TimelineResponse = {
  _id: string;
  personal: string[]; // List of user ids that the user considers personal
  corporate: string[]; // List of user ids that the user considers non-personal
};

/**
 * Transform a raw Timeline object from the database into an object
 * with all the information needed by the frontend
 *
 * @param {HydratedDocument<Timeline>} timeline - Timeline raw object
 * @returns {TimelineResponse} - The Timeline object formatted for the frontend
 */
export const constructTimelineResponse = (timeline: HydratedDocument<Timeline>): TimelineResponse => {
  const populatedTimeline: TimelinePopulated = {
    ...timeline.toObject({
      versionKey: false // Cosmetics; prevents returning of __v property
    })
  };
  delete populatedTimeline.user;
  return {
    ...populatedTimeline,
    _id: populatedTimeline._id.toString()
  };
};

export type {
  TimelineResponse
};
