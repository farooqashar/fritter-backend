import type {Types, PopulatedDoc, Document} from 'mongoose';
import {Schema, model} from 'mongoose';
import type {User} from '../user/model';

// Type definition for a Timeline Object
export type Timeline = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  user: Types.ObjectId;
  personal: string[]; // List of user ids that the user considers personal
  corporate: string[]; // List of user ids that the user considers non-personal
};

export type TimelinePopulated = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  user: Types.ObjectId;
  personal: string[]; // List of user ids that the user considers personal
  corporate: string[]; // List of user ids that the user considers non-personal
};

const TimelineSchema = new Schema<Timeline>({
  // The user
  user: {
    // Use Types.ObjectId outside of the schema
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  // Other users the user considers personal
  personal: [{
    type: String
  }],
  // Other users the user considers corporate
  corporate: [{
    type: String
  }]
});

const TimelineModel = model<Timeline>('Timeline', TimelineSchema);
export default TimelineModel;
