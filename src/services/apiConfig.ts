export const apiEndpoints = {
  auth: {
    signin: "auth/sign-in",
  },
  admin: {
    getAllUsers: "users",
  },
  users: {
    getAllUsers: "app-users",
  },
  plan: {
    createPlan: "add-plan",
    getAllPlan: "getAllPlan",
    updatePlan: "update-plan",
  },
  offer: {
    createOffer: "add-offer",
    updateOffer: "update-offer",
    getAllOffer: "get-offer",
    deleteOffer: "delete-offer",
    getOfferById: "getOfferById",
  },
  subscription: {
    getAllSubscription: "subscriptions",
    createSubscription: "",
    getSubscriptionById: "subscription",
  },
};
