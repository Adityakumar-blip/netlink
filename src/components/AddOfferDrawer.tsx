/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { useState } from "react";
import ModernDrawer from "./DrawerComp";
import AddUserForm from "./Forms/AddUserForm";
import AddOfferForm from "./Forms/AddOfferForm";
import useApiStore from "@/store/apiStore";

interface AddUserDrawerProps {
  onUserAdded?: (userData: any) => void;
  initialData;
  mode: string;
  onClose?: () => void;
  open: boolean;
  setOpen?: () => void;
}

const AddOfferDrawer = ({
  onUserAdded,
  mode,
  initialData,
  onClose,
  setOpen,
  open,
}: AddUserDrawerProps) => {
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
          onClick={() => setOpen()}
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Add Offer
        </Button>
      )}

      <ModernDrawer
        isOpen={open}
        onClose={() => onClose()}
        title={
          mode === "edit"
            ? "Edit Offer"
            : mode === "add"
            ? "Add New Offer"
            : "Offer Details"
        }
        size="md"
        side="right"
      >
        <AddOfferForm
          onClose={onClose}
          onSuccess={handleSuccess}
          initialData={initialData}
          mode={mode}
        />
      </ModernDrawer>
    </>
  );
};

export default AddOfferDrawer;
