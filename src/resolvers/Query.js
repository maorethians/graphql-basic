const Query = {
    comments(parent, args, {db}, info) {
        var constraints = {};
        if (!args.query){
            constraints.where = {
                text_contains: args.query
            }
        }
        return db.query.comments(constraints, info)
    },
    users(parent, args, {db}, info) {
        let constraints = {};
        if (args.query !== undefined) {
            constraints.where = {
                OR: [
                    {
                        name_contains: args.query
                    }, {
                        email_contains: args.query
                    }
                ]
            }
        }
        return db.query.users(constraints, info)
    },
    posts(parent, args, {db}, info) {
        let constraints = {};
        if (args.query !== undefined) {
            constraints.where = {
                OR: [
                    {
                        title_contains: args.query
                    }, {
                        body_contains: args.query
                    }
                ]
            }
        }
        return db.query.posts(constraints, info)
    },
};
export {Query as default}
