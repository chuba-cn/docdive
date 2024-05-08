'use client'

import { useRouter, useSearchParams } from "next/navigation";
import { trpc } from "../_trpc/client";
import { useEffect } from "react";
import { Loader } from "lucide-react";

const Page = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const origin = searchParams.get('origin');
  const authCallbackQuery = trpc.authCallback.useQuery(undefined, {
    retry: true,
    retryDelay: 500
  });

  useEffect(() => {
    if(authCallbackQuery.data?.success){
      router.push(origin ? `/${origin}` : '/dashboard') //User is routed to their dashboard
    }
  }, [authCallbackQuery.data, router, origin]);

  useEffect(() => {
    if(authCallbackQuery.error?.data?.code === 'UNAUTHORIZED'){
      router.push('/sign-in'); //User is unauthenticated and is navigated back to the sign-in page
    }
  }, [authCallbackQuery.error, router]);

  return(
    <div className="w-full mt-24 flex justify-center">
      <div className="flex flex-col items-center gap-3">
        <Loader className="h-8 w-8 animate-spin text-zinc-800"/>
        <h3 className="font-semibold text-xl">Setting up your account...</h3>
        <p>You will be redirected automatically</p>
      </div>
    </div>
  )

}

export default Page