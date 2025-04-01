import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerOverlay,
  DrawerPortal,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModernDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  side?: "right" | "left";
}

const ModernDrawer = ({
  isOpen,
  onClose,
  children,
  title,
  size = "md",
  side = "right",
}: ModernDrawerProps) => {
  // Determine width based on size
  const getWidth = () => {
    switch (size) {
      case "sm":
        return "max-w-sm";
      case "md":
        return "max-w-md";
      case "lg":
        return "max-w-lg";
      case "xl":
        return "max-w-xl";
      case "full":
        return "max-w-full";
      default:
        return "max-w-[500px]";
    }
  };

  console.log("title", title);
  return (
    <Drawer
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      direction="right"
    >
      <DrawerPortal>
        <DrawerOverlay className="fixed inset-0 z-50 bg-black/20 animate-fade-in backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DrawerContent
          className={cn(
            "fixed z-50 h-screen bg-background shadow-lg duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
            side === "right"
              ? "right-0 inset-y-0 data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right border-l"
              : "left-0 inset-y-0 data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left border-r",
            getWidth()
          )}
        >
          <div className="flex h-full flex-col p-6 w-[400px]">
            <div className="flex items-center justify-between mb-5">
              {title && <h2 className="text-lg font-semibold">{title}</h2>}
              <DrawerClose asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-auto"
                  onClick={onClose}
                  aria-label="Close drawer"
                >
                  <X className="h-5 w-5" />
                </Button>
              </DrawerClose>
            </div>
            <div className="flex-1 overflow-y-auto pr-2 w-full">{children}</div>
          </div>
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  );
};

export default ModernDrawer;
