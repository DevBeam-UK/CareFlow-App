import { apiClient } from "../api";
import { useApiQuery } from "./use-api";

export interface SubscriptionPlan {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  priceMonthly: number;
  priceYearly: number | null;
  maxAgencies: number;
  maxCarers: number | null;      
  maxServiceUsers: number | null; 
  maxFamilyMembers: number | null; 
  stripeProductId: string | null;
  stripePriceIdMonthly: string | null;
  stripePriceIdYearly: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetAllSubscriptionsResponse {
    success : boolean;
    plans : SubscriptionPlan
}

const getAllSubscriptionPlansKeys = ['subscription', 'all'] as const

import { type UseQueryResult } from "@tanstack/react-query";

export function useGetAllSubscriptionPlansApi(): UseQueryResult<GetAllSubscriptionsResponse, Error> {
    return useApiQuery<GetAllSubscriptionsResponse>(
        [...getAllSubscriptionPlansKeys],
        () => {
            return apiClient.get(`${process.env.NEXT_PUBLIC_API_URL}/subscriptions/get-all-plans`)
        }
    )
}