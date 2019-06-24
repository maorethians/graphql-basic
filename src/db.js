import {Prisma} from 'prisma-binding'


var db = new Prisma({
    typeDefs: 'src/generate.graphql',
    endpoint: 'http://192.168.99.100:4466',
    secret: 'maorethians'
});

export {db as default}


