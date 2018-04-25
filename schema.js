const fetch = require('node-fetch')

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} = require('graphql')

const User = new GraphQLObjectType({
  name: 'UserQuery',
  description: 'user details',

  fields: () => ({
    first_name: {
      type: GraphQLString,
    },
    last_name: {
      type: GraphQLString
    }
  })
})

const CompanyType =new GraphQLObjectType({
  name: 'Company',
  description: 'Company details.',

  fields: () => ({
      companyName: {
          type: GraphQLString,
          resolve: response => response.name
      },
      user: {
        type: User,
        resolve: response => response.creator
      }
  })
})

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'CompanyQuery',
    description: 'Fetch all company details',

    fields: () => ({
      Company: {
        type: GraphQLList(CompanyType),
        resolve: (root, args) => fetch(
          'http://127.0.0.1:8000/authentication/register'
        )
        .then(response => response.json())//response => console.log(response))
      }
    }) 
  })
})
