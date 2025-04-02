import { useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useAuth0 } from "@auth0/auth0-react";

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const { isLoading, isAuthenticated, user, getAccessTokenSilently } =
    useAuth0();
  const navigate = useNavigate();

  // In your AuthGuard component
  useEffect(() => {
    const checkUser = async () => {
      if (!isLoading && !isAuthenticated) {
        navigate("/");
      } else if (isAuthenticated && !user) {
        // Force refresh the user if authenticated but no user data
        try {
          await getAccessTokenSilently();
        } catch (error) {
          console.error("Error refreshing user data:", error);
          navigate("/");
        }
      }
    };

    checkUser();
  }, [isAuthenticated, isLoading, navigate, user, getAccessTokenSilently]);

  console.log("user", user);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-lg font-medium">Loading...</div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : null;
};

export default AuthGuard;
