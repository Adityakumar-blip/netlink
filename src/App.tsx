import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import AuthGuard from "@/components/AuthGuard";
import Layout from "@/components/Layout";
import Index from "./pages/Index";
import Welcome from "./pages/Welcome";
import BeneficiaryValidationForm from "./pages/Benificiary";
import ComingSoonPage from "./pages/ComingSoon";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />

            {/* Protected routes */}

            <Route
              path="/welcome"
              element={
                <AuthGuard>
                  <Layout>
                    <Welcome />
                  </Layout>
                </AuthGuard>
              }
            />

            <Route
              path="/benificiary-validation"
              element={
                <AuthGuard>
                  <Layout>
                    <BeneficiaryValidationForm />
                  </Layout>
                </AuthGuard>
              }
            />

            <Route
              path="/data-provider"
              element={
                <AuthGuard>
                  <Layout>
                    <ComingSoonPage />
                  </Layout>
                </AuthGuard>
              }
            />

            <Route
              path="/account-format"
              element={
                <AuthGuard>
                  <Layout>
                    <ComingSoonPage />
                  </Layout>
                </AuthGuard>
              }
            />

            <Route
              path="/financial-institution"
              element={
                <AuthGuard>
                  <Layout>
                    <ComingSoonPage />
                  </Layout>
                </AuthGuard>
              }
            />

            <Route
              path="/payment-purpose"
              element={
                <AuthGuard>
                  <Layout>
                    <ComingSoonPage />
                  </Layout>
                </AuthGuard>
              }
            />

            <Route
              path="/category-purpose"
              element={
                <AuthGuard>
                  <Layout>
                    <ComingSoonPage />
                  </Layout>
                </AuthGuard>
              }
            />

            <Route
              path="/payment-instruction"
              element={
                <AuthGuard>
                  <Layout>
                    <ComingSoonPage />
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
