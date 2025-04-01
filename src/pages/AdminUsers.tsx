import AdminUserTable from "@/components/AdminUserTable";
import Navbar from "@/components/Navbar";
import UserTable from "@/components/UserTable";
import React from "react";

const AdminUsers = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Admin Users</h1>
          <p className="text-muted-foreground">
            Manage your application admin users and their details.
          </p>
        </div>

        <AdminUserTable />
      </main>
    </div>
  );
};

export default AdminUsers;
