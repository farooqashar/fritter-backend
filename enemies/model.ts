import type {Types, PopulatedDoc, Document} from 'mongoose';
import {Schema, model} from 'mongoose';
import type {User} from '../user/model';

// Type definition for an Enemy Object
export type Enemies = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  user: Types.ObjectId;
  enemies: string[];
};

export type EnemiesPopulated = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  user: Types.ObjectId;
  enemies: string[];
};

const EnemiesSchema = new Schema<Enemies>({
  // The user
  user: {
    // Use Types.ObjectId outside of the schema
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  // Enemies for the user
  enemies: [{
    type: String
  }]
});

const EnemiesModel = model<Enemies>('Enemies', EnemiesSchema);
export default EnemiesModel;
