import { serverMutation } from "@/lib/core/server";

export const createSubscription = async (subscriptionInfo) => {
     const res = await serverMutation("/api/subscriptions", subscriptionInfo);
     return res;   
};
