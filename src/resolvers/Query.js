const Query = {
    comments(parent, args, {db}, info) {
        if (!args.query) {
            return db.comments
        } else {
            return db.comments.filter((comment) => {
                return comment.text.toLowerCase().includes(args.query.toLowerCase())
            })
        }
    },
    users(parent, args, {db, pubsub}, info) {
        if (!args.query) {
            pubsub.publish('count', {
                count: 2,
                count1: 3
            });
            return db.users
        } else {
            return db.users.filter((user) => {
                return user.name.toLowerCase().includes(args.query.toLowerCase())
            })
        }
    },
    posts(parent, args, {db}, info) {
        if (!args.query) {
            return db.posts
        } else {
            return db.posts.filter((post) => {
                return post.body.toLowerCase().includes(args.query.toLowerCase()) || post.title.toLowerCase().includes(args.query.toLowerCase())
            })
        }
    },
    me() {
        return {
            id: '1A1730',
            name: 'moein',
            email: 'apaladian@gmail.com'
        }
    },
};
export {Query as default}
