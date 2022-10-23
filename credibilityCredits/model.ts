import type {Types, PopulatedDoc, Document} from 'mongoose';
import {Schema, model} from 'mongoose';
import type {User} from '../user/model';

// Type definition for a Credibility Credit Object
export type Credibility = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  user: Types.ObjectId;
  score: number;
};

export type CredibilityPopulated = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  user: Types.ObjectId;
  score: number;
};

const CredibilitySchema = new Schema<Credibility>({
  // The user
  user: {
    // Use Types.ObjectId outside of the schema
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  // Credibility Score
  score: {
    type: Number
  }
});

const CredibilityModel = model<Credibility>('Credibility', CredibilitySchema);
export default CredibilityModel;
