import type {HydratedDocument, Schema} from 'mongoose';
import moment from 'moment';
import type {UserRelationship, UserRelationshipPopulated} from './model';

// Update this if you add a property to the relationship object type!
type UserRelationshipObjectResponse = {
  _id: string;
  relationshipStatus: string;
  bestFriends: string[];
};

/**
 * Transform a raw userRelationship object from the database into an object
 * with all the information needed by the frontend
 *
 * @param {HydratedDocument<UserRelationship>} relationObject - A relationObject
 * @returns {UserRelationshipObjectResponse} - The relationObject object formatted for the frontend
 */
export const constructUserRelationshipResponse = (relationObject: HydratedDocument<UserRelationship>): UserRelationshipObjectResponse => {
  const userRelationship: UserRelationshipPopulated = {
    ...relationObject.toObject({
      versionKey: false // Cosmetics; prevents returning of __v property
    })
  };
  delete userRelationship.user;
  return {
    ...userRelationship,
    _id: userRelationship._id.toString()
  };
};

export type {
  UserRelationshipObjectResponse
};
