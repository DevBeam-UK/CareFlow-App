import { useGetAgencyByUserIdApi } from "@/lib/hooks/use-agency-api";
import { useSession } from "next-auth/react";

export function useGetAgency(){

  const session = useSession()
  const accessToken = session.data?.accessToken

    const {data , error , isLoading} = useGetAgencyByUserIdApi(accessToken!)
    console.log('This is the response for getting agency: ', data);
    
     const initials = data?.agency.name
    ?.split(' ')
    ?.map((n) => n[0])
    ?.join('') ?? '';
  const name = data?.agency.name || '';
  const avatarUrl = data?.agency.logo || '';
  return {
    initials,
    name,
    avatarUrl,
    isLoading,
    error
  }
}

