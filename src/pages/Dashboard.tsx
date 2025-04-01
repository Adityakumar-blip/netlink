/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  BarChart,
  UsersRound,
  FileText,
  Clock,
  CreditCard,
  TrendingUp,
  BarChart3,
  Activity,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart as RechartsBarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import Navbar from "@/components/Navbar";
import StatCard from "@/components/StatCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Mock data for charts
const recentUsageData = [
  { date: "Oct 1", value: 120 },
  { date: "Oct 2", value: 140 },
  { date: "Oct 3", value: 190 },
  { date: "Oct 4", value: 170 },
  { date: "Oct 5", value: 190 },
  { date: "Oct 6", value: 220 },
  { date: "Oct 7", value: 290 },
  { date: "Oct 8", value: 320 },
  { date: "Oct 9", value: 350 },
  { date: "Oct 10", value: 290 },
  { date: "Oct 11", value: 320 },
  { date: "Oct 12", value: 380 },
  { date: "Oct 13", value: 390 },
  { date: "Oct 14", value: 420 },
];

const planDistributionData = [
  { name: "Basic", value: 540, color: "#FF7E51" },
  { name: "Premium", value: 320, color: "#F68407" },
  { name: "Enterprise", value: 140, color: "#994C31" },
];

const fileTypeData = [
  { name: "Audios", count: 250 },
  { name: "Video", count: 180 },
  { name: "Documents", count: 120 },
  { name: "Other", count: 50 },
];

const recentUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    joinDate: "2023-10-14T14:48:00",
    plan: "Premium",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    joinDate: "2023-10-13T11:32:00",
    plan: "Basic",
  },
  {
    id: "3",
    name: "Robert Johnson",
    email: "robert@example.com",
    joinDate: "2023-10-12T16:20:00",
    plan: "Premium",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily@example.com",
    joinDate: "2023-10-11T09:12:00",
    plan: "Enterprise",
  },
];

// Custom chart tooltip
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-2 bg-white dark:bg-darkblack border border-border rounded-md shadow-sm">
        <p className="text-sm font-medium">{`${label}`}</p>
        <p className="text-sm text-primary">{`${payload[0].value} files`}</p>
      </div>
    );
  }

  return null;
};

const Dashboard = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration errors with SSR
  if (!mounted) {
    return null;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <Navbar />

      <main className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to the Dashboard.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Users"
            value="1,284"
            description="Last 30 days"
            icon={<UsersRound size={18} />}
            trend={{
              value: 12.5,
              isPositive: true,
            }}
          />
          <StatCard
            title="Processed Files"
            value="15,392"
            description="Total count"
            icon={<FileText size={18} />}
          />
          <StatCard
            title="Processing Time"
            value="4.2s"
            description="Average"
            icon={<Clock size={18} />}
            trend={{
              value: 8.3,
              isPositive: true,
            }}
          />
          <StatCard
            title="Monthly Revenue"
            value="$12,845"
            description="This month"
            icon={<CreditCard size={18} />}
            trend={{
              value: 23.1,
              isPositive: true,
            }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2 border shadow-none hover:shadow-card transition-all-200">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Usage Trends</CardTitle>
                  <CardDescription>
                    Daily file processing activity
                  </CardDescription>
                </div>
                <Tabs defaultValue="2weeks">
                  <TabsList className="h-8">
                    <TabsTrigger value="1week" className="text-xs h-7">
                      Week
                    </TabsTrigger>
                    <TabsTrigger value="2weeks" className="text-xs h-7">
                      2 Weeks
                    </TabsTrigger>
                    <TabsTrigger value="month" className="text-xs h-7">
                      Month
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={recentUsageData}
                    margin={{
                      top: 10,
                      right: 10,
                      left: 0,
                      bottom: 20,
                    }}
                  >
                    <defs>
                      <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="#FF7E51"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#FF7E51"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#E2E8F0"
                    />
                    <XAxis
                      dataKey="date"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12 }}
                      dy={10}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12 }}
                      dx={-10}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#FF7E51"
                      fill="url(#colorUv)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border shadow-none hover:shadow-card transition-all-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Plan Distribution</CardTitle>
              <CardDescription>User subscription breakdown</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={planDistributionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={3}
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                      labelLine={false}
                    >
                      {planDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend verticalAlign="bottom" height={36} />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border shadow-none hover:shadow-card transition-all-200">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">File Types</CardTitle>
                  <CardDescription>Processed by category</CardDescription>
                </div>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart
                    data={fileTypeData}
                    margin={{
                      top: 20,
                      right: 10,
                      left: 10,
                      bottom: 20,
                    }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#E2E8F0"
                    />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#FF7E51" radius={[4, 4, 0, 0]} />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border shadow-none hover:shadow-card transition-all-200">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Recent Users</CardTitle>
                  <CardDescription>New sign ups</CardDescription>
                </div>
                <UsersRound className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentUsers.map((user) => (
                  <div key={user.id} className="flex items-center gap-4">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{user.name}</p>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(user.joinDate)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">
                          {user.email}
                        </p>
                        <span className="text-xs font-medium text-primary">
                          {user.plan}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
