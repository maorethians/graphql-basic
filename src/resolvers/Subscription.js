const Subscription = {
    comment: {
        subscribe(parent, args, {db}, info) {
            return db.subscription.comment({where: {node: {post: {id: args.post}}}}, info);
        }
    },
    post: {
        subscribe(parent, args, {db}, info) {
            return db.subscription.post({where:{node:{published:true}}}, info)
        }
    }
};

export {Subscription as default}
