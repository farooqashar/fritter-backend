import type {HydratedDocument} from 'mongoose';
import moment from 'moment';
import type {Credibility, CredibilityPopulated} from '../credibilityCredits/model';

// Update this if you add a property to the Credibility Credit type!
type CredibilityResponse = {
  _id: string;
  score: number;
};

/**
 * Transform a raw Credibility Credit object from the database into an object
 * with all the information needed by the frontend
 *
 * @param {HydratedDocument<Credibility>} cred - A credibility credit object
 * @returns {CredibilityResponse} - The transformed object
 */
const constructCredibilityCreditResponse = (cred: HydratedDocument<Credibility>): CredibilityResponse => {
  const newCred: CredibilityPopulated = {
    ...cred.toObject({
      versionKey: false // Cosmetics; prevents returning of __v property
    })
  };
  delete newCred.user;
  return {
    ...newCred,
    _id: newCred._id.toString()
  };
};

export {
  constructCredibilityCreditResponse
};
