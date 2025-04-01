import Navbar from "@/components/Navbar";
import SubscriptionTable from "@/components/SubscriptionTable";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  PiggyBank,
  TrendingUp,
  DollarSign,
  Users,
  CreditCard,
  IndianRupee,
} from "lucide-react";
import StatCard from "@/components/StatCard";
import ManageSubscriptionTable from "@/components/ManageSubscriptionTable";
import useApiStore from "@/store/apiStore";

const ManageSubscription = () => {
  const { apis } = useApiStore();
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Manage Subscriptions</h1>
          <p className="text-muted-foreground">
            Manage user subscriptions and billing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total Subscriptions"
            value={apis["plans"]?.data?.data.length}
            icon={<CreditCard size={18} />}
          />
          <StatCard
            title="Active Subscriptions"
            value="843"
            icon={<Users size={18} />}
          />
          <StatCard
            title="Avg. Subscription Value"
            value="32.40"
            icon={<IndianRupee size={18} />}
          />
        </div>

        <ManageSubscriptionTable />
      </main>
    </div>
  );
};

export default ManageSubscription;
