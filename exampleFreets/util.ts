import type {HydratedDocument} from 'mongoose';
import moment from 'moment';
import type {ExampleFreet, ExamplePopulatedFreet} from '../exampleFreets/model';

// Update this if you add a property to the Freet type!
type ExampleFreetResponse = {
  _id: string;
  author: string;
  content: string;
};

/**
 * Transform a raw ExampleFreet object from the database into an object
 * with all the information needed by the frontend
 *
 * @param {HydratedDocument<ExampleFreet>} freet - A freet
 * @returns {ExampleFreetResponse} - The freet object formatted for the frontend
 */
const constructExampleFreetResponse = (freet: HydratedDocument<ExampleFreet>): ExampleFreetResponse => {
  const freetCopy: ExamplePopulatedFreet = {
    ...freet.toObject({
      versionKey: false // Cosmetics; prevents returning of __v property
    })
  };
  const {username} = freetCopy.authorId;
  delete freetCopy.authorId;
  return {
    ...freetCopy,
    _id: freetCopy._id.toString(),
    author: username
  };
};

export {
  constructExampleFreetResponse
};
