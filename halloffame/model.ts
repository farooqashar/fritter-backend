import type {Types, PopulatedDoc, Document} from 'mongoose';
import {Schema, model} from 'mongoose';
import type {User} from '../user/model';

// Type definition for an Hall of Fame(HOF) Object
export type HOF = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  user: Types.ObjectId;
  freets: string[];
};

export type HOFPopulated = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  user: Types.ObjectId;
  freets: string[];
};

const HOFSchema = new Schema<HOF>({
  // The user
  user: {
    // Use Types.ObjectId outside of the schema
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  // Freets In User's Hall of Fame
  freets: [{
    type: String
  }]
});

const HOFModel = model<HOF>('HOF', HOFSchema);
export default HOFModel;
