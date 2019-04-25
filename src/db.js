const users = [
    {
        id: '1',
        name: 'moein nasr',
        email: 'apaladian@gmail.com',
        age: 20
    },
    {
        id: '2',
        name: 'mohammad khademli',
        email: 'm.moein@gmail.com',
        age: 20
    },
    {
        id: '3',
        name: 'mani nasr',
        email: 'mani@gmail.com',
    }
];
const posts = [
    {
        id: '4',
        title: 'about me',
        body: 'an intelligent person',
        published: false,
        author: '1'
    },
    {
        id: '5',
        title: 'moein',
        body: 'i\'m genius!',
        published: true,
        author: '2'
    },
    {
        id: '6',
        title: 'mani',
        body: 'he\'s bullshit',
        published: false,
        author: '3'
    }
];
const comments = [
    {
        id: '7',
        text: "go",
        author: "2",
        post: "4"
    },
    {
        id: '8',
        text: 'come',
        author: "3",
        post: "4"
    },
    {
        id: '9',
        text: 'do',
        author: "1",
        post: "4"
    },
    {
        id: '10',
        text: 'eat',
        author: "2",
        post: "5"
    }
];
const db = {
    users,
    posts,
    comments
};
export {db as default}
