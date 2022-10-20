import type {HydratedDocument, Schema} from 'mongoose';
import moment from 'moment';
import type {HOF, HOFPopulated} from './model';

// Update this if you add a property to the HOF object type!
type HOFResponse = {
  _id: string;
  freets: string[];
};

/**
 * Transform a raw HOF object from the database into an object
 * with all the information needed by the frontend
 *
 * @param {HydratedDocument<HOF>} HOFObj - HOF raw object
 * @returns {HOFResponse} - The HOF object formatted for the frontend
 */
export const constructHOFResponse = (HOFObj: HydratedDocument<HOF>): HOFResponse => {
  const responseHOFObject: HOFPopulated = {
    ...HOFObj.toObject({
      versionKey: false // Cosmetics; prevents returning of __v property
    })
  };
  delete responseHOFObject.user;
  return {
    ...responseHOFObject,
    _id: responseHOFObject._id.toString()
  };
};

export type {
  HOFResponse
};
