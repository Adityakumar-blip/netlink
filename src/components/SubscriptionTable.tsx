/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CheckCircle2, Clock, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import useApiStore from "@/store/apiStore";
import { apiEndpoints } from "@/services/apiConfig";
import { formatCurrency, formatDate } from "@/functions/commonFunctions";
import { DropdownMenuItem, DropdownMenuSeparator } from "./ui/dropdown-menu";
import DynamicTable from "./Table";

// const churnRate = totalSubscriptionsLastMonth > 0
// ? (recentlyCanceled.length / totalSubscriptionsLastMonth) * 100
// : 0;  //formula to calculate churn rate

// Define the Subscription type
interface Subscription {
  id: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  currentPlan: any;
  status: string;
  startDate: string;
  nextBillingDate: string;
  amount: number;
  paymentMethod: string;
  subscriptionType: string;
  cardLast4: string | null;
}

const SubscriptionTable = () => {
  const { fetchApi, apis, resetApi } = useApiStore();

  useEffect(() => {
    fetchApi("subscription", apiEndpoints.subscription.getAllSubscription);
    return () => {
      resetApi("subscription");
    };
  }, [fetchApi, resetApi]);

  // Helper functions
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle2 className="h-4 w-4 text-green" />;
      case "trialing":
        return <Clock className="h-4 w-4 text-orange" />;
      case "canceled":
      case "past_due":
        return <XCircle className="h-4 w-4 text-red" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green text-white";
      case "trialing":
        return "bg-orange text-white";
      case "canceled":
        return "bg-gray text-white";
      case "past_due":
        return "bg-red text-white";
      default:
        return "bg-gray text-white";
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan.toLowerCase()) {
      case "premium":
        return "bg-primary text-white";
      case "enterprise":
        return "bg-secondary text-white";
      case "free tier":
        return "bg-lightBlueGray text-darkgray";
      default:
        return "bg-lightBlueGray text-darkgray";
    }
  };

  // Column definitions
  const columns = [
    {
      key: "user",
      header: "Customer",
      render: (subscription: Subscription) => (
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary/10 text-primary">
              {getInitials(subscription?.user?.firstName || "")}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">
              {subscription.user.firstName + " " + subscription?.user?.lastName}
            </div>
            <div className="text-sm text-muted-foreground">
              {subscription.user.email}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "plan",
      header: "Plan",
      render: (subscription: Subscription) => (
        <Badge
          variant="outline"
          className={cn(
            "font-normal",
            getPlanColor(subscription?.currentPlan?.name)
          )}
        >
          {subscription?.currentPlan?.name}
        </Badge>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (subscription: Subscription) => (
        <div className="flex items-center space-x-2">
          {getStatusIcon(subscription.status)}
          <Badge
            variant="secondary"
            className={cn("font-normal", getStatusColor(subscription.status))}
          >
            {subscription.status === "active"
              ? "Active"
              : subscription.status === "trialing"
              ? "Trial"
              : subscription.status === "canceled"
              ? "Canceled"
              : subscription.status === "past_due"
              ? "Past due"
              : subscription.status}
          </Badge>
        </div>
      ),
    },
    {
      key: "nextBillingDate",
      header: "Next Renewal",
      render: (subscription: Subscription) =>
        formatDate(subscription.nextBillingDate),
    },
    {
      key: "currentPlan",
      header: "Amount",
      render: (subscription: Subscription) => {
        const isMonthly = subscription?.subscriptionType === "Monthly";
        const price = isMonthly
          ? subscription.currentPlan?.price?.monthly
          : subscription.currentPlan?.price?.annually;
        const frequencyLabel = isMonthly ? "/mo" : "/yearly";

        return price !== undefined
          ? `${formatCurrency(price, "INR")}${frequencyLabel}`
          : "N/A";
      },
    },
    {
      key: "paymentMethod",
      header: "Payment Method",
      render: (subscription: Subscription) => (
        <div className="flex items-center space-x-2">
          <span className="capitalize">{subscription.paymentMethod}</span>
          {subscription.cardLast4 && (
            <span className="text-sm text-muted-foreground">
              •••• {subscription.cardLast4}
            </span>
          )}
        </div>
      ),
    },
  ];

  // Action definitions
  const subscriptionActions = (subscription: Subscription) => (
    <>
      <DropdownMenuItem>View details</DropdownMenuItem>
      <DropdownMenuItem>Update plan</DropdownMenuItem>
      <DropdownMenuItem>Manage payment method</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="text-red">
        Cancel subscription
      </DropdownMenuItem>
    </>
  );

  return (
    <DynamicTable
      data={apis["subscription"]?.data?.data || []}
      columns={columns}
      searchKeys={["user.name", "user.email", "plan"]}
      actions={subscriptionActions}
      moduleKey="Subscription"
      className="animate-fade-in"
    />
  );
};

export default SubscriptionTable;
