import type {Types, PopulatedDoc, Document} from 'mongoose';
import {Schema, model} from 'mongoose';
import type {User} from '../user/model';

// Type definition for a Follow Object
export type Follow = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  user: Types.ObjectId;
  following: string[];
};

export type FollowPopulated = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  user: Types.ObjectId;
  following: string[];
};

const FollowSchema = new Schema<Follow>({
  // The user
  user: {
    // Use Types.ObjectId outside of the schema
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  // Other users the user is following
  following: [{
    type: String
  }]
});

const FollowModel = model<Follow>('Follow', FollowSchema);
export default FollowModel;
