import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuth0 } from "@auth0/auth0-react";
import { Loader2 } from "lucide-react";

const LoginForm = () => {
  const {
    loginWithRedirect,
    isLoading,
    isAuthenticated,
    getAccessTokenSilently,
    user,
  } = useAuth0();
  const navigate = useNavigate();

  // Check if user is already authenticated and redirect to dashboard
  React.useEffect(() => {
    const checkAndStoreAuth = async () => {
      if (isAuthenticated && user) {
        try {
          // Get the access token from Auth0
          const token = await getAccessTokenSilently();

          // Store user data and token in localStorage
          localStorage.setItem(
            "snip-admin-auth",
            JSON.stringify({
              user: user,
              token: token,
            })
          );

          // Navigate to dashboard
          navigate("/dashboard");
          toast.success("Login successful! Welcome back.");
        } catch (error) {
          toast.error("Failed to get authentication token");
        }
      }
    };

    checkAndStoreAuth();
  }, [isAuthenticated, user, getAccessTokenSilently, navigate]);

  const handleLogin = async () => {
    try {
      await loginWithRedirect({
        appState: {
          returnTo: "/dashboard",
        },
      });
    } catch (error) {
      toast.error("An unexpected error occurred during login");
    }
  };

  // useEffect(() => {
  //   console.log("location", window.location.origin);
  //   loginWithRedirect({
  //     appState: {
  //       returnTo: "/dashboard",
  //     },
  //   });
  // }, [loginWithRedirect]);

  return (
    <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-darkblack rounded-xl shadow-card animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Snip Admin
        </h2>
        <p className="text-sm text-gray dark:text-coolGray">
          Sign in to access your admin dashboard
        </p>
      </div>

      <div className="mt-8 space-y-6">
        <Button
          onClick={handleLogin}
          disabled={isLoading}
          className="w-full bg-custom-gradient hover:opacity-90 transition-opacity"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            "Sign in with Auth0"
          )}
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;
