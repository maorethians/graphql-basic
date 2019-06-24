var bcrypt = require('bcrypt');
const Mutation = {
    async addUser(parent, args, {db}, info) {
        if (args.data.length < 8) {
            throw new Error('password need to be 8 at least')
        } else {
            var password = await bcrypt.hash(args.data.password, 10);
            return db.mutation.createUser({data: {...args.data, password}}, info)
        }
    },
    // login (parent, args, {db}, info) {
    //     await db.query.
    // }
    async removeUser(parent, args, {db}, info) {
        return db.mutation.deleteUser({where: {id: args.id}}, info)
    },
    updateUser(parent, {id, data}, {db}, info) {
        return db.mutation.updateUser({where: {id}, data}, info)
    },
    addPost(parent, args, {db}, info) {
        return db.mutation.createPost({
            data: {
                title: args.data.title,
                body: args.data.body,
                published: args.data.published,
                author: {connect: {id: args.data.author}}
            }
        }, info)
    },
    removePost(parent, args, {db}, info) {
        return db.mutation.deletePost({where: {id: args.id}}, info)
    },
    updatePost(parent, {id, data}, {db}, info) {
        return db.mutation.updatePost({where: {id}, data}, info)
    },
    addComment(parent, args, {db}, info) {
        return db.mutation.createComment({
            data: {
                text: args.data.text,
                author: {connect: {id: args.data.author}},
                post: {connect: {id: args.data.post}}
            }
        })
    },
    removeComment(parent, args, {db}, info) {
        db.mutation.deleteComment({where: {id: args.id}}, info)
    },
    updateComment(parent, {id, data}, {db}, info) {
        return db.mutation.updateComment({where: {id}, data}, info)
    }
};

export {Mutation as default}
