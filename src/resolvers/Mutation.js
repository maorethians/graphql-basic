import uuid4 from "uuid/v4";

const Mutation = {
    addUser(parent, args, {db}, info) {
        const userExist = db.users.some((user) => {
            return user.email === args.data.email
        });
        if (userExist) {
            throw new Error('such user with this email exist')
        } else {
            const user = {
                id: uuid4(),
                name: args.data.name,
                email: args.data.email,
                age: args.data.age
            };
            db.users.push(user);
            return user
        }
    },
    removeUser(parent, args, {db}, info) {
        const index = db.users.findIndex((user) => {
            return user.id === args.id
        });

        if (index === -1) {
            throw new Error('user not found!')
        } else {
            db.posts = db.posts.filter((post) => {
                const match = post.author === args.id;

                if (match) {
                    db.comments = db.comments.filter((comment) => {
                        return comment.post !== post.id
                    })
                }

                return !match
            });

            return db.users.splice(index, 1)[0];
        }
    },
    updateUser(parent, {id, data}, {db}, info) {
        var user = db.users.find((user) => {
            return user.id === id
        });
        if (user !== undefined) {
            if (data.email !== undefined) {
                const index = db.users.findIndex((user) => {
                    return user.email === data.email
                });

                if (index !== -1) {
                    throw new Error('such email exist');
                } else {
                    user.email = data.email
                }
            }
            if (data.name !== undefined) {
                user.name = data.name
            }
            if (data.age !== undefined) {
                user.age = data.age;
            }
            return user
        } else {
            throw new Error('such user not found')
        }
    },
    addPost(parent, args, {db, pubsub}, info) {
        const userExist = db.users.some((user) => {
            return user.id === args.data.author
        });

        if (!userExist) {
            throw new Error('such user not exist, YOU are not exist!?')
        }

        const post = {
            id: uuid4(),
            title: args.data.title,
            body: args.data.body,
            published: args.data.published,
            author: args.data.author
        };
        db.posts.push(post);
        if (post.published) {
            pubsub.publish('post', {
                post: {
                    type: "NEW",
                    data: post

                }
            })
        }
        return post
    },
    removePost(parent, args, {db, pubsub}, info) {
        const index = db.posts.findIndex((post) => {
            return post.id === args.id
        });

        if (index === -1) {
            throw new Error('no such post')
        } else {
            db.comments = db.comments.filter((comment) => {
                return comment.post !== args.id
            });
            var post = db.posts.splice(index, 1)[0];
            if (post.published) {
                pubsub.publish('post', {
                    post: {
                        type: "REM",
                        data: post
                    }
                })
            }
            return post
        }
    },
    updatePost(parent, {id, data}, {db, pubsub}, info) {
        var post = db.posts.find((post) => post.id === id);
        if (post !== undefined) {
            if (data.title !== undefined) {
                post.title = data.title
            }
            if (data.body !== undefined) {
                post.body = data.body
            }
            if (data.published !== undefined) {
                var before = post.published;
                post.published = data.published;
                if (before && !data.published) {
                    pubsub.publish('post', {
                        post: {
                            type: "REM",
                            data: post
                        }
                    });
                } else if (!before && data.published) {
                    pubsub.publish('post', {
                        post: {
                            type: "NEW",
                            data: post
                        }
                    });
                }
            } else if(post.published){
                pubsub.publish('post', {
                    post: {
                        type: "UP",
                        data: post
                    }
                });
            }
            return post
        } else {
            throw new Error('no such post')
        }
    },
    addComment(parent, args, {db, pubsub}, info) {
        const userExist = db.users.some((user) => {
            return user.id === args.data.author
        });
        const postExist = db.posts.some((post) => {
            return post.id === args.data.post && post.published === true
        });
        if (!userExist) {
            throw new Error('no such user exist, do you exist?!')
        }
        if (!postExist) {
            throw new Error('no such post exist or it\'s not published')
        }

        const comment = {
            id: uuid4(),
            text: args.data.text,
            author: args.data.author,
            post: args.data.post
        };
        db.comments.push(comment);
        pubsub.publish(`comment of post ${args.data.post}`, {
            comment: {
                type: "NEW",
                data: comment
            }
        });
        return comment
    },
    removeComment(parent, args, {db, pubsub}, info) {
        const index = db.comments.findIndex((comment) => {
            return comment.id === args.id
        });
        if (index === -1) {
            throw new Error('no such comment')
        } else {
            const comment = db.comments.splice(index, 1)[0];
            pubsub.publish(`comment of post ${comment.post}`,{
                comment: {
                    type: "REM",
                    data: comment
                }
            });
            return comment
        }
    },
    updateComment(parent, {id, data}, {db, pubsub}, info) {
        var comment = db.comments.find((comment) => comment.id === id);
        if (comment !== undefined) {
            if (data.text !== undefined) {
                comment.text = data.text
            }
            pubsub.publish(`comment of post ${comment.post}`, {
                comment: {
                    type: "UP",
                    data: comment
                }
            });
            return comment
        } else {
            throw new Error('no such comment')
        }
    }
};

export {Mutation as default}
