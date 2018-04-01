const fetch = require('node-fetch')

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} = require('graphql')

const a = fetch(
  'https://api.abalin.net/today'
)
.then(response => console.log(response.json()))
//.then(response)
//console.log(a);

const CompanyType =new GraphQLObjectType({
  name: 'Company',
  description: 'Company details.',

  fields: () => ({
      companyName: {
          type: GraphQLString,
          resolve: response => response.name
      }
  })
})

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Companuery',
    description: 'Fetch all company details',

    fields: () => ({
      Company: {
        type: GraphQLList(CompanyType),
        resolve: (root, args) => fetch(
          'http://127.0.0.1:8000/authentication/register'
        )
        .then(response => response.json())//response => console.log(response))
        .then(json => json)
      }
    })
  })
})
