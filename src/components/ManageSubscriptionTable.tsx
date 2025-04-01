/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";
import { CreditCard, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import DynamicTable from "./Table";
import { formatDate } from "@/functions/commonFunctions";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import useApiStore from "@/store/apiStore";
import { apiEndpoints } from "@/services/apiConfig";
import AddPlanDrawer from "./AddPlanDrawer";

const ManageSubscriptionTable = () => {
  const { fetchApi, apis, resetApi } = useApiStore();
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [isPlanOpen, setPlanOpen] = useState<boolean>(false);
  const [drawerAction, setDrawerAction] = useState<"view" | "edit" | null>(
    null
  );

  useEffect(() => {
    fetchApi("plans", apiEndpoints.plan.getAllPlan);
    return () => {
      resetApi("plans");
    };
  }, [fetchApi, resetApi]);

  // Helper functions
  const getPlanColor = (isActive: boolean) => {
    return isActive ? "bg-green text-white" : "bg-gray text-white";
  };

  // Column definitions
  const columns = [
    {
      key: "name",
      header: "Plan Name",
      render: (plan) => <div className="font-medium">{plan.name}</div>,
    },
    {
      key: "price",
      header: "Pricing(₹)",
      render: (plan) => (
        <div>
          <div>Monthly: {plan.price.monthly}</div>
          <div>Annual: {plan.price.annual}</div>
        </div>
      ),
    },
    {
      key: "isActive",
      header: "Status",
      render: (plan) => (
        <Badge
          variant="secondary"
          className={cn("font-normal capitalize", getPlanColor(plan.isActive))}
        >
          {plan.isActive ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    {
      key: "features",
      header: "Key Features",
      render: (plan) => (
        <div>
          <div>
            Max Transcription: {plan.features.maxTranscriptionMinutes} mins
          </div>
          <div>Storage: {plan.features.storageLimit} GB</div>
          <div>Accuracy: {plan.features.accuracyLevel}</div>
        </div>
      ),
    },
    {
      key: "createdAt",
      header: "Created",
      render: (plan) => formatDate(plan.createdAt),
    },
  ];

  // Action definitions
  const planActions = (plan) => (
    <div className="flex flex-col px-2 gap-2">
      <DropdownMenuItem
        onClick={() => {
          console.log("heree");
          setSelectedPlan(plan);
          setDrawerAction("view");
          setPlanOpen(true);
        }}
        className="cursor-pointer"
      >
        View details
      </DropdownMenuItem>
      <DropdownMenuItem
        onClick={() => {
          setSelectedPlan(plan);
          setDrawerAction("edit");
          setPlanOpen(true);
        }}
        className="cursor-pointer"
      >
        Edit Plan
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="text-red flex items-center cursor-pointer">
        <Trash2 className=" h-4 w-4" />
        Delete
      </DropdownMenuItem>
    </div>
  );

  return (
    <>
      <DynamicTable
        data={apis["plans"]?.data?.data || []}
        columns={columns}
        searchKeys={["name"]}
        actions={planActions}
        moduleKey="Plan"
        className="animate-fade-in"
        child={
          <AddPlanDrawer
            mode="add"
            open={isPlanOpen && drawerAction === null}
            setOpen={(value) => setPlanOpen(value)}
            intialData={selectedPlan}
          />
        }
      />

      {(drawerAction === "view" || drawerAction === "edit") && (
        <AddPlanDrawer
          intialData={selectedPlan}
          mode={drawerAction}
          setOpen={(value) => setPlanOpen(value)}
          open={
            isPlanOpen && (drawerAction === "view" || drawerAction === "edit")
          }
        />
      )}
    </>
  );
};

export default ManageSubscriptionTable;
