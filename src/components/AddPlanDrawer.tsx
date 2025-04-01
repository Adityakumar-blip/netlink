/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { useState } from "react";
import ModernDrawer from "./DrawerComp";
import AddUserForm from "./Forms/AddUserForm";
import AddOfferForm from "./Forms/AddOfferForm";
import useApiStore from "@/store/apiStore";
import AddPlanForm from "./Forms/AddPlanForm";

interface AddUserDrawerProps {
  onUserAdded?: (userData: any) => void;
  open: boolean;
  setOpen: (state: boolean) => void;
  intialData: any;
  mode: string;
}

const AddPlanDrawer = ({
  onUserAdded,
  open,
  setOpen,
  intialData,
  mode,
}: AddUserDrawerProps) => {
  const handleClose = () => {
    setOpen(false);
  };

  const handleSuccess = (userData: any) => {
    if (onUserAdded) {
      console.log("user data", userData);
      onUserAdded(userData);
    }
  };

  return (
    <>
      {mode === "add" && (
        <Button
          className="bg-custom-gradient hover:opacity-90 transition-opacity"
          onClick={() => setOpen(true)}
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Add plan
        </Button>
      )}

      <ModernDrawer
        isOpen={open}
        onClose={handleClose}
        title={
          mode === "add"
            ? "Add New Plan"
            : mode === "edit"
            ? "Edit Plan"
            : "Plan Details"
        }
        size="md"
        side="right"
      >
        <AddPlanForm
          onClose={handleClose}
          onSuccess={handleSuccess}
          initialData={intialData}
          mode={mode}
        />
      </ModernDrawer>
    </>
  );
};

export default AddPlanDrawer;
