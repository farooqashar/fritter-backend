import type {HydratedDocument, Types} from 'mongoose';
import type {Credibility} from './model';
import CredibilityModel from './model';
import UserCollection from '../user/collection';

class CredibilityCollection {
  /**
     * Update Credibility Object for a user
     *
     * @param {string} user - The id of user
     * @param {number} score - The new credibility score for a user
     * @return {Promise<HydratedDocument<Credibility>>} - The newly updated Credibility Credit Object
     */
  static async updateOne(user: Types.ObjectId | string, score: number): Promise<HydratedDocument<Credibility>> {
    const databaseCredibility = await CredibilityModel.findOne({user});
    if (databaseCredibility) {
      databaseCredibility.score = score;
      await databaseCredibility.save();
      return databaseCredibility;
    }

    const newCredibilityObject = new CredibilityModel({
      user,
      score
    });
    await newCredibilityObject.save(); // Saves to MongoDB
    return newCredibilityObject.populate('user');
  }

  /**
     * Get User Credibility Credit
     *
     * @param {string} userId - The userid used to get the credibility credit
     * @return {Promise<HydratedDocument<Credibility>>} - the user credibility credit object
     */

  static async findUserCredibilityCredit(userId: string): Promise<HydratedDocument<Credibility>> {
    return CredibilityModel.findOne({user: userId}).populate('user');
  }
}

export default CredibilityCollection;
