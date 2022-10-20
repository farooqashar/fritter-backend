import type {HydratedDocument, Types} from 'mongoose';
import type {UserRelationship} from './model';
import UserRelationshipModel from './model';
import UserCollection from '../user/collection';

class UserRelationshipCollection {
  /**
     * Add a UserRelationshipObject to the collection
     *
     * @param {string} user - The id of user
     * @param {string} relationshipStatus - The relationship status of a user
     * @param {string[]} bestFriends - The ids of best friends of a user
     * @return {Promise<HydratedDocument<UserRelationship>>} - The newly created UserRelationshipObject
     */
  static async addOne(user: Types.ObjectId | string, relationshipStatus: string, bestFriends: string[]): Promise<HydratedDocument<UserRelationship>> {
    const relationshipObject = new UserRelationshipModel({
      user,
      relationshipStatus,
      bestFriends
    });
    await relationshipObject.save(); // Saves to MongoDB
    return relationshipObject.populate('user');
  }

  /**
   * Update user's information
   *
   * @param {string} userId - The userId of the user to update
   * @param {Object} newRelationshipStatus - An object with the user's updated relationship status
   * @return {Promise<HydratedDocument<UserRelationship>>} - The updated user relationship status
   */
  static async updateOne(userId: Types.ObjectId | string, newRelationshipStatus: any): Promise<HydratedDocument<UserRelationship>> {
    const databaserelationshipStatus = await UserRelationshipModel.findOne({user: userId});
    if (databaserelationshipStatus.relationshipStatus) {
      databaserelationshipStatus.relationshipStatus = newRelationshipStatus.relationshipStatus as string;
    }

    if (databaserelationshipStatus.bestFriends) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      databaserelationshipStatus.bestFriends = newRelationshipStatus.bestFriends;
    }

    await databaserelationshipStatus.save();
    return databaserelationshipStatus;
  }

  /**
     * Get User Relationship Status
     *
     * @param {string} userId - The userid used to get the relationship status of the user
     * @return {Promise<HydratedDocument<UserRelationship>>} - the user relationship status
     */

  static async findUserRelationshipByUsername(userId: string): Promise<HydratedDocument<UserRelationship>> {
    return UserRelationshipModel.findOne({user: userId}).populate('user');
  }
}

export default UserRelationshipCollection;
