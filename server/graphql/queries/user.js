const GraphQLObjectType = require('graphql').GraphQLObjectType;
const GraphQLList = require('graphql').GraphQLList;
const UserModel = require('./../../models/User.js');
const userType = require('../types/user').userType;

// User Query
exports.queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => {
    return {
      users: {
        type: new GraphQLList(userType),
        resolve: () => {
          const users = UserModel.find().exec();
          if(!users) throw new Error('Error');
          return users;
        }
      }
    }
  }
});
