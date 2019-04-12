const GraphQLNonNull = require('graphql').GraphQLNonNull;
const GraphQLString = require('graphql').GraphQLString;

import UserType from './../../types/user';
import UserModel from './../../../models/User';

exports.login = {
  type: UserType.userType,
  args: {
      id: {
        name: 'id',
        type: new GraphQLNonNull(GraphQLString)
      },
      name: {
        type: new GraphQLNonNull(GraphQLString),
      }
  },
  resolve(root, params) {
    return UserModel.findByIdAndUpdate(
        params.id,
        { $set: { loggedIn: true } },
        { new: true }
    ).catch(err => new Error(err));
  }
};
