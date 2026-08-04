import { useQueryClient } from "@tanstack/react-query";
import { useApiMutation } from "./use-api";
import { apiClient } from "../api";
import { env } from "@/config/env";

export interface CreateAgencyVariables {
  name: string;
  slug?: string; 
  logo?: string;
  phone?: string;
  address?: string;
  city?: string;
  postcode?: string;
  accessToken : string;
}

export interface CreateAgencyResponse {
  success: boolean;
  message: string;
  agencyId: string;
}

const createAgencyKeys = ['agency', 'all']


export function useCreateAgencyApi(
    options?: Parameters<typeof useApiMutation<CreateAgencyResponse, CreateAgencyVariables>>[0]
){
    const queryClient = useQueryClient()
    return useApiMutation<CreateAgencyResponse, CreateAgencyVariables>({
        mutationKey: [...createAgencyKeys],
        mutationFn: ({name , slug, address,city,logo,phone,postcode, accessToken}) => {
                  return apiClient.post(
        `${env.NEXT_PUBLIC_API_URL}/agency/create`,
        {
          name: name,
          slug: slug,
          logo: logo,
          phone: phone,
          address: address,
          city: city,
          postcode: postcode,
        },
        {
          Authorization: `Bearer ${accessToken}`,
        }
      );
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [...createAgencyKeys]
            })
        },
        showErrorToast: true,
        ...options
    })
}