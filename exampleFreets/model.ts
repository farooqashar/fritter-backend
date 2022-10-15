import type {Types, PopulatedDoc, Document} from 'mongoose';
import {Schema, model} from 'mongoose';
import type {User} from '../user/model';

// Type definition for ExampleFreet on the backend(simpler form of a regular Freet)
export type ExampleFreet = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  authorId: Types.ObjectId;
  content: string;
};

export type ExamplePopulatedFreet = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  authorId: User;
  content: string;
};

const ExampleFreetSchema = new Schema<ExampleFreet>({
  // The author userId
  authorId: {
    // Use Types.ObjectId outside of the schema
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  // The content of the freet
  content: {
    type: String,
    required: true
  }
});

const ExampleFreetModel = model<ExampleFreet>('ExampleFreet', ExampleFreetSchema);
export default ExampleFreetModel;
