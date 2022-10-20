import type {HydratedDocument, Schema} from 'mongoose';
import moment from 'moment';
import type {Enemies, EnemiesPopulated} from './model';

// Update this if you add a property to the enemies object type!
type EnemiesResponse = {
  _id: string;
  enemies: string[];
};

/**
 * Transform a raw enemies object from the database into an object
 * with all the information needed by the frontend
 *
 * @param {HydratedDocument<Enemies>} enemiesObject - Enemies raw object
 * @returns {EnemiesResponse} - The Enemies object formatted for the frontend
 */
export const constructEnemiesResponse = (enemiesObject: HydratedDocument<Enemies>): EnemiesResponse => {
  const enemiesPopObj: EnemiesPopulated = {
    ...enemiesObject.toObject({
      versionKey: false // Cosmetics; prevents returning of __v property
    })
  };
  delete enemiesPopObj.user;
  return {
    ...enemiesPopObj,
    _id: enemiesPopObj._id.toString()
  };
};

export type {
  EnemiesResponse
};
