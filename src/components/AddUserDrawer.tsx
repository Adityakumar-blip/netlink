/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { useState } from "react";
import ModernDrawer from "./DrawerComp";
import AddUserForm from "./Forms/AddUserForm";

interface AddUserDrawerProps {
  onUserAdded?: (userData: any) => void;
}

const AddUserDrawer = ({ onUserAdded }: AddUserDrawerProps) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSuccess = (userData: any) => {
    if (onUserAdded) {
      onUserAdded(userData);
    }
  };

  return (
    <>
      <Button
        className="bg-custom-gradient hover:opacity-90 transition-opacity"
        onClick={() => setOpen(true)}
      >
        <UserPlus className="mr-2 h-4 w-4" />
        Add User
      </Button>

      <ModernDrawer
        isOpen={open}
        onClose={handleClose}
        title="Add New User"
        size="md"
        side="right"
      >
        <AddUserForm onClose={handleClose} onSuccess={handleSuccess} />
      </ModernDrawer>
    </>
  );
};

export default AddUserDrawer;
