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
    //  * @param {string[]} bestFriends - The ids of best friends of a user
     * @return {Promise<HydratedDocument<UserRelationship>>} - The newly created UserRelationshipObject
     */
  static async addOne(user: Types.ObjectId | string, relationshipStatus: string): Promise<HydratedDocument<UserRelationship>> {
    const relationshipObject = new UserRelationshipModel({
      user,
      relationshipStatus
    //   BestFriends
    });
    await relationshipObject.save(); // Saves to MongoDB
    return relationshipObject.populate('user');
  }

  //   /**
  //    * Get all the exampleFreets in by given author
  //    *
  //    * @param {string} username - The username of author of the exampleFreets
  //    * @return {Promise<HydratedDocument<ExampleFreet>[]>} - An array of all of the exampleFreets
  //    */
  //   static async findAllByUsername(username: string): Promise<Array<HydratedDocument<ExampleFreet>>> {
  //     const author = await UserCollection.findOneByUsername(username);
  //     return ExampleFreetModel.find({authorId: author._id}).populate('authorId');
  //   }

//   /**
//    * Delete an exampleFreet with given exampleFreetId.
//    *
//    * @param {string} exampleFreetId - The exampleFreetId of freet to delete
//    * @return {Promise<Boolean>} - true if the freet has been deleted, false otherwise
//    */
//   static async deleteOne(exampleFreetId: Types.ObjectId | string): Promise<boolean> {
//     const exampleFreet = await ExampleFreetModel.deleteOne({_id: exampleFreetId});
//     return exampleFreetId !== null;
//   }
}

export default UserRelationshipCollection;
