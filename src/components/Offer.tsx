/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";
import { Trash2 } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import DynamicTable from "./Table";
import { formatDate } from "@/functions/commonFunctions";
import { Badge } from "./ui/badge";
import useApiStore from "@/store/apiStore";
import { apiEndpoints } from "@/services/apiConfig";
import AddOfferDrawer from "./AddOfferDrawer";

const OffersAndCoupons = () => {
  const { fetchApi, apis, resetApi } = useApiStore();
  const [selectedOffer, setSelectedOffer] = useState<any>(null);
  const [isOfferOpen, setOfferOpen] = useState<boolean>(false);
  const [drawerAction, setDrawerAction] = useState<"view" | "edit" | null>(
    null
  );

  useEffect(() => {
    fetchApi("offerData", apiEndpoints.offer.getAllOffer);
    return () => {
      resetApi("offerData");
    };
  }, [fetchApi, resetApi]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green text-white";
      case "expired":
        return "bg-red text-white";
      case "upcoming":
        return "bg-yellow text-black";
      default:
        return "bg-gray text-white";
    }
  };

  const columns = [
    {
      key: "title",
      header: "Offer Name",
    },
    {
      key: "code",
      header: "Coupon Code",
    },
    {
      key: "discountType",
      header: "Discount Type",
    },
    {
      key: "discountValue",
      header: "Discount",
    },
    {
      key: "status",
      header: "Status",
      render: (offer) => (
        <Badge
          className={cn("font-normal capitalize", getStatusColor(offer.status))}
        >
          {offer.status}
        </Badge>
      ),
    },
    {
      key: "expirationDate",
      header: "Valid Until",
      render: (offer) => formatDate(offer.expirationDate),
    },
  ];

  const offerActions = (offer) => (
    <div className="flex flex-col px-2 gap-2">
      <DropdownMenuItem
        onClick={() => {
          console.log("heree");
          setSelectedOffer(offer);
          setDrawerAction("view");
          setOfferOpen(true);
        }}
        className="cursor-pointer"
      >
        View details
      </DropdownMenuItem>
      <DropdownMenuItem
        onClick={() => {
          setSelectedOffer(offer);
          setDrawerAction("edit");
          setOfferOpen(true);
        }}
        className="cursor-pointer"
      >
        Edit offer
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="text-red flex items-center cursor-pointer">
        <Trash2 className=" h-4 w-4" />
        Delete
      </DropdownMenuItem>
    </div>
  );

  const handleDrawerClose = () => {
    setSelectedOffer(null);
    setDrawerAction(null);
    setOfferOpen(false);
  };

  return (
    <>
      <DynamicTable
        data={apis["offerData"]?.data?.data || []}
        columns={columns}
        moduleKey="Offers"
        searchKeys={["title", "code"]}
        actions={offerActions}
        child={
          <AddOfferDrawer
            onClose={() => handleDrawerClose()}
            initialData={null}
            mode="add"
            open={isOfferOpen && drawerAction === null}
            setOpen={() => {
              setDrawerAction(null);
              setOfferOpen(true);
            }}
          />
        }
        className="animate-fade-in"
      />

      {(drawerAction === "view" || drawerAction === "edit") && (
        <AddOfferDrawer
          initialData={selectedOffer}
          mode={drawerAction}
          onClose={handleDrawerClose}
          open={
            isOfferOpen && (drawerAction === "view" || drawerAction === "edit")
          }
        />
      )}
    </>
  );
};

export default OffersAndCoupons;
