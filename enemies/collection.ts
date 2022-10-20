import type {HydratedDocument, Types} from 'mongoose';
import type {Enemies} from './model';
import EnemiesModel from './model';
import UserCollection from '../user/collection';

class EnemiesCollection {
  /**
     * Add a Enemy to the collection
     *
     * @param {string} user - The id of user
     * @param {string[]} enemies - The ids of enemies of the user
     * @return {Promise<HydratedDocument<Enemies>>} - The newly created Enemies
     */
  static async addEnemyObject(user: Types.ObjectId | string, enemies: string[]): Promise<HydratedDocument<Enemies>> {
    const enemiesObj = new EnemiesModel({
      user,
      enemies
    });
    await enemiesObj.save(); // Saves to MongoDB
    return enemiesObj.populate('user');
  }

  /**
   * Update user's Enemy information
   *
   * @param {string} userId - The userId of the user to update
   * @param {Object} newEnemyObj - An object with the user's updated enemies
   * @return {Promise<HydratedDocument<Enemies>>} - The updated user enemies
   */
  static async updateEnemies(userId: Types.ObjectId | string, newEnemyObj: any): Promise<HydratedDocument<Enemies>> {
    const databaseEnemies = await EnemiesModel.findOne({user: userId});
    if (databaseEnemies.enemies) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      databaseEnemies.enemies = newEnemyObj.enemies;
    }

    await databaseEnemies.save();
    return databaseEnemies;
  }

  /**
     * Get User Enemies
     *
     * @param {string} userId - The userid used to get the enemies of the user
     * @return {Promise<HydratedDocument<Enemies>>} - the user enemies
     */

  static async findEnemiesByUser(userId: string): Promise<HydratedDocument<Enemies>> {
    return EnemiesModel.findOne({user: userId}).populate('user');
  }
}

export default EnemiesCollection;
