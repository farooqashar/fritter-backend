import type {HydratedDocument, Types} from 'mongoose';
import type {ExampleFreet} from './model';
import ExampleFreetModel from './model';
import UserCollection from '../user/collection';

class ExampleFreetCollection {
  /**
     * Add an ExampleFreet to the collection
     *
     * @param {string} authorId - The id of the author of the ExampleFreet
     * @param {string} content - The id of the content of the ExampleFreet
     * @return {Promise<HydratedDocument<ExampleFreet>>} - The newly created ExampleFreet
     */
  static async addOne(authorId: Types.ObjectId | string, content: string): Promise<HydratedDocument<ExampleFreet>> {
    const exampleFreet = new ExampleFreetModel({
      authorId,
      content
    });
    await exampleFreet.save(); // Saves exampleFreet to MongoDB
    return exampleFreet.populate('authorId');
  }

  /**
   * Get all the exampleFreets in by given author
   *
   * @param {string} username - The username of author of the exampleFreets
   * @return {Promise<HydratedDocument<ExampleFreet>[]>} - An array of all of the exampleFreets
   */
  static async findAllByUsername(username: string): Promise<Array<HydratedDocument<ExampleFreet>>> {
    const author = await UserCollection.findOneByUsername(username);
    return ExampleFreetModel.find({authorId: author._id}).populate('authorId');
  }

  /**
   * Delete an exampleFreet with given exampleFreetId.
   *
   * @param {string} exampleFreetId - The exampleFreetId of freet to delete
   * @return {Promise<Boolean>} - true if the freet has been deleted, false otherwise
   */
  static async deleteOne(exampleFreetId: Types.ObjectId | string): Promise<boolean> {
    const exampleFreet = await ExampleFreetModel.deleteOne({_id: exampleFreetId});
    return exampleFreetId !== null;
  }
}

export default ExampleFreetCollection;
