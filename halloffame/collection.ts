import type {HydratedDocument, Types} from 'mongoose';
import type {HOF} from './model';
import HOFModel from './model';
import UserCollection from '../user/collection';

class HOFCollection {
  /**
     * Initiliaze the User's Hall of Fame
     *
     * @param {string} user - The id of the user of the Hall of Fame
     * @return {Promise<HydratedDocument<HOD>>} - The updated HOF Object
     */
  static async initializeHallOfFame(user: Types.ObjectId | string): Promise<HydratedDocument<HOF>> {
    const initHOF = new HOFModel({
      user
    });
    await initHOF.save(); // Saves exampleFreet to MongoDB
    return initHOF.populate('user');
  }

  /**
   * Toggle a given freet for the User's Hall of Fame
   *
   * @param {string} userId - The id of the user of the Hall of Fame
   * @param {string} freetId - The id of the freet to be added to the Hall of Fame
   * @return {Promise<HydratedDocument<HOD>>} - The updated HOF Object
   */
  static async toggleFreetForHOF(userId: Types.ObjectId | string, freetId: string): Promise<HydratedDocument<HOF>> {
    const updatedHOF = await HOFModel.findOne({user: userId});
    let updatedFreetsIds;

    if (updatedHOF?.freets?.includes(freetId)) {
      const eltToRemove = updatedHOF.freets.indexOf(freetId);
      updatedHOF.freets.splice(eltToRemove, 1);
    } else {
      updatedHOF.freets = [...updatedHOF.freets, freetId];
    }

    await updatedHOF.save(); // Saves exampleFreet to MongoDB
    return updatedHOF.populate('user');
  }

  /**
   * Get Hall of Fame Object for User
   *
   * @param {string} userId - The id of the user
   * @return {Promise<HydratedDocument<HOF>>} - Hall of Fame Object for a user
   */
  static async findHallOfFameObj(userId: string): Promise<HydratedDocument<HOF>> {
    return HOFModel.findOne({user: userId}).populate('user');
  }
}

export default HOFCollection;
