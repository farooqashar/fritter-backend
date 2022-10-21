import type {HydratedDocument, Types} from 'mongoose';
import type {Follow} from './model';
import FollowModel from './model';
import UserCollection from '../user/collection';

class FollowCollection {
  /**
     * Add a Follow to the collection
     *
     * @param {string} user - The id of user
     * @param {string[]} following - The ids of other users the user is following
     * @return {Promise<HydratedDocument<Follow>>} - The newly created Enemies
     */
  static async addFollowObject(user: Types.ObjectId | string, following: string[]): Promise<HydratedDocument<Follow>> {
    const followObj = new FollowModel({
      user,
      following
    });
    await followObj.save(); // Saves to MongoDB
    return followObj.populate('user');
  }

  /**
   * Update user's Follow information
   *
   * @param {string} userId - The userId of the user to update
   * @param {Object} newFollowObj - An object with the user's updated users that they are following
   * @return {Promise<HydratedDocument<Follow>>} - The updated users that the user is following
   */
  static async updateFollowing(userId: Types.ObjectId | string, newFollowObj: any): Promise<HydratedDocument<Follow>> {
    const databaseFollowing = await FollowModel.findOne({user: userId});
    if (databaseFollowing.following) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      databaseFollowing.following = newFollowObj.following;
    }

    await databaseFollowing.save();
    return databaseFollowing;
  }

  /**
     * Get User Followings
     *
     * @param {string} userId - The userid used to get the enemies of the user
     * @return {Promise<HydratedDocument<Follow>>} - the users that a particular user is following
     */

  static async findFollowingByUser(userId: string): Promise<HydratedDocument<Follow>> {
    return FollowModel.findOne({user: userId}).populate('user');
  }
}

export default FollowCollection;
