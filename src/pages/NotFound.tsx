import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Search, AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-secondary/5 blur-3xl"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center p-6 max-w-lg w-full">
        <div className="mb-6 flex items-center justify-center">
          <div className="p-6 rounded-full bg-muted/30">
            <AlertTriangle size={64} className="text-primary" />
          </div>
        </div>

        <h1 className="text-6xl font-bold text-foreground mb-2 font-nunito">
          404
        </h1>
        <h2 className="text-2xl font-medium text-foreground mb-4 text-center">
          Page Not Found
        </h2>
        <p className="text-muted-foreground text-center mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs">
          <Button asChild variant="default" className="flex-1">
            <Link to="/">Go Home</Link>
          </Button>
          <Button asChild variant="outline" className="flex-1">
            <Link to="/dashboard">
              <Search className="mr-2 h-4 w-4" />
              Dashboard
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
