import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import AuthGuard from "@/components/AuthGuard";
import Layout from "@/components/Layout";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Subscriptions from "./pages/Subscriptions";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import AdminUsers from "./pages/AdminUsers";
import ManageSubscription from "./pages/ManageSubscription";
import OfferAndCoupons from "./pages/OfferAndCoupons";
import Profile from "./pages/Profile";
import Welcome from "./pages/Welcome";
import BeneficiaryValidationForm from "./pages/Benificiary";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<BeneficiaryValidationForm />} />

            {/* Protected routes */}
            <Route
              path="/dashboard"
              element={
                // <AuthGuard>
                <Layout>
                  <Welcome />
                </Layout>
                // </AuthGuard>
              }
            />

            <Route
              path="/admin-users"
              element={
                <AuthGuard>
                  <Layout>
                    <AdminUsers />
                  </Layout>
                </AuthGuard>
              }
            />

            <Route
              path="/users"
              element={
                <AuthGuard>
                  <Layout>
                    <Users />
                  </Layout>
                </AuthGuard>
              }
            />

            <Route
              path="/offers"
              element={
                <AuthGuard>
                  <Layout>
                    <OfferAndCoupons />
                  </Layout>
                </AuthGuard>
              }
            />

            <Route
              path="/profile"
              element={
                <AuthGuard>
                  <Layout>
                    <Profile />
                  </Layout>
                </AuthGuard>
              }
            />

            <Route
              path="/manage-subscriptions"
              element={
                <AuthGuard>
                  <Layout>
                    <ManageSubscription />
                  </Layout>
                </AuthGuard>
              }
            />

            <Route
              path="/subscriptions"
              element={
                <AuthGuard>
                  <Layout>
                    <Subscriptions />
                  </Layout>
                </AuthGuard>
              }
            />

            <Route
              path="/settings"
              element={
                <AuthGuard>
                  <Layout>
                    <Settings />
                  </Layout>
                </AuthGuard>
              }
            />

            {/* 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
