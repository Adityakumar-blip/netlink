import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  User2,
  Gift,
  CreditCardIcon,
  BadgePercent,
  UserRoundPlus,
  ArrowDownUp,
  WalletMinimal,
  HandCoins,
  Layers2,
  Coins,
  BookCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

import logo from "@/assets/logo-netlink.png";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { BASE_URL } from "@/services/apiService";

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  isActive: boolean;
  isCollapsed: boolean;
}

const NavItem = ({
  to,
  icon: Icon,
  label,
  isActive,
  isCollapsed,
}: NavItemProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <Link
            to={to}
            className={cn(
              "flex items-center px-3 py-2.5 gap-3 rounded-md transition-all-200",
              isActive
                ? "bg-sidebar-accent text-primary"
                : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-primary"
            )}
          >
            <Icon size={20} className="min-w-5" />
            {!isCollapsed && (
              <span className="truncate font-semibold text-sm">{label}</span>
            )}
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const { logout, user } = useAuth0();
  const isMobile = useIsMobile();

  console.log("base url", BASE_URL);

  const navItems = [
    {
      to: "/benificiary-validation",
      icon: UserRoundPlus,
      label: "Beneficiary Account Validation",
    },
    {
      to: "/data-provider",
      icon: ArrowDownUp,
      label: "Data Provider Identity",
    },
    { to: "/account-format", icon: Users, label: "Account Format" },
    {
      to: "/financial-institution",
      icon: WalletMinimal,
      label: "Financial Institution Identity",
    },
    {
      to: "/payment-purpose",
      icon: HandCoins,
      label: "Payment Purpose",
    },
    { to: "/category-purpose", icon: Layers2, label: "Category Purpose" },
    { to: "/amount-format", icon: Coins, label: "Amount Format" },
    {
      to: "/payment-instruction",
      icon: BookCheck,
      label: "Payment Instruction Validation",
    },
  ];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const MobileMenuTrigger = () => (
    <Button
      variant="ghost"
      size="sm"
      className="lg:hidden fixed top-4 left-4 z-50"
      onClick={toggleMobileSidebar}
    >
      {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
    </Button>
  );

  if (isMobile) {
    return (
      <>
        <MobileMenuTrigger />

        <div
          className={cn(
            "fixed inset-0 z-40 transform transition-transform duration-300 ease-in-out bg-black bg-opacity-50",
            isMobileOpen
              ? "translate-x-0"
              : "-translate-x-full opacity-0 pointer-events-none"
          )}
        >
          <div className="w-64 h-full bg-sidebar py-6 flex flex-col shadow-card overflow-y-auto animate-slide-in">
            <div className="px-4 mb-6">
              <img src={logo} alt="logo" className="h-[20px]" />
            </div>

            <div className="flex-1 px-3 space-y-1">
              {navItems.map((item) => (
                <NavItem
                  key={item.to}
                  to={item.to}
                  icon={item.icon}
                  label={item.label}
                  isActive={location.pathname === item.to}
                  isCollapsed={false}
                />
              ))}
            </div>

            <div className="mt-6 px-3">
              <button
                onClick={() =>
                  logout({
                    logoutParams: {
                      returnTo: window.location.origin,
                    },
                  })
                }
                className="flex items-center w-full px-3 py-2.5 gap-3 rounded-md text-sidebar-foreground hover:bg-sidebar-accent/50 transition-all-200"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div
      className={cn(
        "h-screen bg-sidebar flex flex-col border-r border-sidebar-border transition-all ease-in-out duration-300 ",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div
        className={cn(
          "px-4 py-6 flex items-center",
          isCollapsed ? "justify-center" : "justify-between"
        )}
      >
        {!isCollapsed && (
          // <h1 className="text-xl font-bold text-sidebar-foreground">
          //   Snip Admin
          // </h1>
          <img src={logo} className="h-[40px]" />
        )}

        <Button
          variant="ghost"
          size="sm"
          onClick={toggleSidebar}
          className="text-sidebar-foreground"
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>

      <div className="flex-1 px-3 space-y-1 py-4 overflow-y-auto">
        {navItems.map((item) => (
          <NavItem
            key={item.to}
            to={item.to}
            icon={item.icon}
            label={item.label}
            isActive={location.pathname === item.to}
            isCollapsed={isCollapsed}
          />
        ))}
      </div>

      <div className="mt-auto mb-6 px-3">
        <button
          onClick={() =>
            logout({
              logoutParams: {
                returnTo: window.location.origin,
              },
            })
          }
          className={cn(
            "flex items-center px-3 py-2.5 gap-3 rounded-md text-sidebar-foreground hover:bg-sidebar-accent/50 transition-all-200",
            isCollapsed ? "justify-center" : ""
          )}
        >
          <LogOut size={20} />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
