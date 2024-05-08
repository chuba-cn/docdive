import { PrismaClient } from '@prisma/client'

declare global {
    var cachedPrisma: PrismaClient
}

let prisma: PrismaClient
if(process.env.NODE_ENV === 'production'){
    prisma =  new PrismaClient();
} else {
    //check if cached instance of prisma client exists in global scope
    if(!global.cachedPrisma){
        global.cachedPrisma = new PrismaClient();
    }
    prisma = global.cachedPrisma;
}

export const db = prisma;