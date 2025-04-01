import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import LoginForm from "@/components/LoginForm";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import logo from "@/assets/logo-netlink.png";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "sonner";

const Index = () => {
  const {
    loginWithRedirect,
    isLoading,
    isAuthenticated,
    getAccessTokenSilently,
    user,
  } = useAuth0();
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Initialize theme based on saved preference
    const savedTheme = localStorage.getItem("snip-admin-theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    }
  }, []);

  useEffect(() => {
    // Redirect to dashboard if already authenticated
    if (isAuthenticated && !isLoading) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, isLoading, navigate]);

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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-lg font-medium">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="h-16 border-b border-border px-6 flex items-center justify-between animate-fade-in">
        <img src={logo} className="w-22 h-10" alt="Netlink Logo" />

        <div className="relative overflow-hidden bg-white px-4 py-2 rounded-full group hover:cursor-pointer hover:text-white" onClick={() => handleLogin()}>
          <p className="font-semibold relative z-10">Login</p>
          <div className="absolute inset-0 bg-primary transform translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out rounded-full"></div>
        </div>
      </div>

      <div className="mb-8 text-center h-[80vh] gap-6 animate-fade-in flex flex-col items-center justify-center">
        <img src={logo} className="w-50 h-20" alt="Netlink Logo" />

        <p className="text-black dark:text-white font-semibold text-xl mb-6">
          Welcome to Netlink Payment Pre-Validation Enabler
        </p>
      </div>
    </div>
  );
};

export default Index;
