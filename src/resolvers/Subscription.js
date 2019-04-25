const Subscription = {
    comment: {
        subscribe(parent, args, {db, pubsub}, info) {
            var post = db.posts.find((post) => post.id === args.post && post.published);
            if (post !== undefined) {
                return pubsub.asyncIterator(`comment of post ${args.post}`)
            } else {
                throw new Error('post not found')
            }
        }
    },
    post: {
        subscribe(parent, args, {pubsub}, info){
            return pubsub.asyncIterator('post')
        }
    }
};

export {Subscription as default}
