
import Navbar from "@/components/Navbar";
import SubscriptionTable from "@/components/SubscriptionTable";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PiggyBank, TrendingUp, DollarSign, Users } from "lucide-react";
import StatCard from "@/components/StatCard";

const Subscriptions = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Subscriptions</h1>
          <p className="text-muted-foreground">Manage user subscriptions and billing.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Monthly Revenue" 
            value="$12,845" 
            description="This month" 
            icon={<DollarSign size={18} />}
            trend={{
              value: 23.1,
              isPositive: true
            }}
          />
          <StatCard 
            title="Active Subscriptions" 
            value="843" 
            description="Total count" 
            icon={<Users size={18} />}
            trend={{
              value: 4.2,
              isPositive: true
            }}
          />
          <StatCard 
            title="Avg. Subscription Value" 
            value="$32.40" 
            description="Per user" 
            icon={<PiggyBank size={18} />}
          />
          <StatCard 
            title="Churn Rate" 
            value="2.3%" 
            description="Last 30 days" 
            icon={<TrendingUp size={18} />}
            trend={{
              value: 0.5,
              isPositive: false
            }}
          />
        </div>
        
        <SubscriptionTable />
      </main>
    </div>
  );
};

export default Subscriptions;
