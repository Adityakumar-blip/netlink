import { cn } from "@/lib/utils";
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";
import { Trash2 } from "lucide-react";
import { ReactNode, useEffect } from "react";
import DynamicTable from "./Table";
import { formatDateWithTime, formatDate } from "@/functions/commonFunctions";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import useApiStore from "@/store/apiStore";
import { apiEndpoints } from "@/services/apiConfig";

// Generic column definition interface
interface ColumnDef<T> {
  key: keyof T;
  header: string;
  sortable?: boolean;
  render?: (item: T) => ReactNode;
}

// Generic table props interface
interface DynamicTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  searchKeys?: (keyof T)[];
  actions?: (item: T) => ReactNode;
  onSearch?: (term: string) => void;
  className?: string;
}

const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    status: "active",
    plan: "premium",
    lastActive: "2023-10-15T14:48:00",
    filesCount: 28,
    createdAt: "2023-05-10T09:30:00",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    status: "active",
    plan: "basic",
    lastActive: "2023-10-14T11:32:00",
    filesCount: 12,
    createdAt: "2023-06-22T14:15:00",
  },
  {
    id: "3",
    name: "Robert Johnson",
    email: "robert@example.com",
    status: "inactive",
    plan: "premium",
    lastActive: "2023-09-30T16:20:00",
    filesCount: 43,
    createdAt: "2023-04-05T10:45:00",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily@example.com",
    status: "active",
    plan: "enterprise",
    lastActive: "2023-10-15T09:12:00",
    filesCount: 64,
    createdAt: "2023-02-18T08:30:00",
  },
  {
    id: "5",
    name: "Michael Brown",
    email: "michael@example.com",
    status: "suspended",
    plan: "basic",
    lastActive: "2023-10-10T13:45:00",
    filesCount: 7,
    createdAt: "2023-08-12T16:20:00",
  },
];

const AdminUserTable = () => {
  const { fetchApi, apis, resetApi } = useApiStore();

  useEffect(() => {
    fetchApi("adminUsers", apiEndpoints.admin.getAllUsers);
    return () => {
      resetApi("adminUsers");
    };
  }, [fetchApi, resetApi]);

  console.log("Admin users", apis["adminUsers"]?.data?.data);
  // Helper functions remain the same
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green text-white";
      case "inactive":
        return "bg-gray text-white";
      case "suspended":
        return "bg-red text-white";
      default:
        return "bg-gray text-white";
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case "premium":
        return "bg-primary text-white";
      case "enterprise":
        return "bg-secondary text-white";
      case "basic":
        return "bg-lightBlueGray text-darkgray";
      default:
        return "bg-lightBlueGray text-darkgray";
    }
  };

  // Column definitions
  const columns = [
    {
      key: "fullName",
      header: "User",
      render: (user) => (
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8 ">
            <AvatarFallback className="bg-primary/10 text-primary">
              {getInitials(user.fullName)}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{user.fullName}</div>
            <div className="text-sm text-muted-foreground">{user.email}</div>
          </div>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (user) => (
        <Badge
          variant="secondary"
          className={cn(
            "font-normal capitalize",
            getStatusColor(user.status ? "active" : "inactive")
          )}
        >
          {user.status ? "Active" : "In-active"}
        </Badge>
      ),
    },
    {
      key: "role.roleName",
      header: "Rolename",
      render: (user) => <p>{user?.role.roleName}</p>,
    },
    {
      key: "filesCount",
      header: "Files",
    },
    {
      key: "createdAt",
      header: "Created",
      render: (user) => formatDate(user.createdAt),
    },
  ];

  // Action definitions
  const userActions = (user: (typeof mockUsers)[0]) => (
    <>
      <DropdownMenuItem>View details</DropdownMenuItem>
      <DropdownMenuItem>Edit user</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="text-red">
        <Trash2 className="mr-2 h-4 w-4" />
        Delete
      </DropdownMenuItem>
    </>
  );

  return (
    <DynamicTable
      data={apis["adminUsers"]?.data?.data || []}
      columns={columns}
      searchKeys={["name", "email"]}
      actions={userActions}
      moduleKey="Admin User"
      className="animate-fade-in"
    />
  );
};

export default AdminUserTable;
