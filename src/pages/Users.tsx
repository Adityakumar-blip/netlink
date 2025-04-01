
import Navbar from "@/components/Navbar";
import UserTable from "@/components/UserTable";

const Users = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Users</h1>
          <p className="text-muted-foreground">Manage your application users and their details.</p>
        </div>
        
        <UserTable />
      </main>
    </div>
  );
};

export default Users;
