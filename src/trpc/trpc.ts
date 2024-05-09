import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { TRPCError, initTRPC } from "@trpc/server";

const t = initTRPC.create();
const middleware = t.middleware;

const isAuthenticated = middleware(async(options) => {
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    if(!user || !user.id){
        throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    return options.next({
        ctx:{
            userId: user.id,
        }
    })
});


export const router = t.router;
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuthenticated);