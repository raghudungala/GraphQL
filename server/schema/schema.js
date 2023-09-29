const graphql = require('graphql')


const {
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = graphql

var books = [
    {name:"Name of the Wind", genre:"Fantasy", id:'1', authorid:'1'},
    {name:"Name of the Wind2", genre:"Sci-Fi", id:'2', authorid:'2'},
    {name:"Name of the Wind3", genre:"Fantasy", id:'3', authorid:'3'},
    {name:"Name of the Wind4", genre:"Fantasy", id:'1', authorid:'1'},
    {name:"Name of the Wind5", genre:"Sci-Fi", id:'2', authorid:'2'},
    {name:"Name of the Wind6", genre:"Fantasy", id:'3', authorid:'3'}
]

var authors = [
    {name:"Author1", age:40, id:'1'},
    {name:"Author2", age:43, id:'2'},
    {name:"Author3", age:45, id:'3'}
]

const BookType = new GraphQLObjectType({
    name:'Book',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        genre:{type:GraphQLString},
        author:{
            type : AuthorType,
            resolve(parent,args){
                return authors.find(author =>author.id===parent.authorid)
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name:'Author',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        age:{type:GraphQLInt},
        books:{
            type:new GraphQLList(BookType),
            resolve(parent,args){
                return books.filter(book=>book.authorid===parent.id)
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        book:{
            type:BookType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return books.find((book)=>book.id===args.id)
            }
        },
        author:{
            type:AuthorType,
            args:{id:{type:GraphQLID}},
            resolve(parent, args){
                return authors.find((author)=>author.id===args.id)
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query:RootQuery
})