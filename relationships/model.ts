import type {Types, PopulatedDoc, Document} from 'mongoose';
import {Schema, model} from 'mongoose';
import type {User} from '../user/model';

// Type definition for a User Relationship Object
export type UserRelationship = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  user: Types.ObjectId;
  relationshipStatus: string;
  bestFriends: string[];
};

export type UserRelationshipPopulated = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  user: Types.ObjectId;
  relationshipStatus: string;
  bestFriends: string[];
};

const UserRelationshipStatusSchema = new Schema<UserRelationship>({
  // The author userId
  user: {
    // Use Types.ObjectId outside of the schema
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  // The user relationship status
  relationshipStatus: {
    type: String
  },
  bestFriends: [{
    type: String
  }]
});

const UserRelationshipModel = model<UserRelationship>('UserRelationship', UserRelationshipStatusSchema);
export default UserRelationshipModel;
