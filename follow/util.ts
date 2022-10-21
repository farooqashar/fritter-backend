import type {HydratedDocument, Schema} from 'mongoose';
import moment from 'moment';
import type {Follow, FollowPopulated} from './model';

// Update this if you add a property to the Follow object type!
type FollowResponse = {
  _id: string;
  following: string[];
};

/**
 * Transform a raw Follow object from the database into an object
 * with all the information needed by the frontend
 *
 * @param {HydratedDocument<Follow>} followObj - Follow raw object
 * @returns {FollowResponse} - The Enemies object formatted for the frontend
 */
export const constructFollowResponse = (followObj: HydratedDocument<Follow>): FollowResponse => {
  const populatedFollow: FollowPopulated = {
    ...followObj.toObject({
      versionKey: false // Cosmetics; prevents returning of __v property
    })
  };
  delete populatedFollow.user;
  return {
    ...populatedFollow,
    _id: populatedFollow._id.toString()
  };
};

export type {
  FollowResponse
};
