const GraphQLSchema = require('graphql').GraphQLSchema;
const GraphQLObjectType = require('graphql').GraphQLObjectType;

exports.userSchema = new GraphQLSchema({
  query: require('./queries/user').queryType,
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: require('./mutations')
  })
});
