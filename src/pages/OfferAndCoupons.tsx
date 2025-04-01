import Navbar from "@/components/Navbar";
import OffersAndCoupons from "@/components/Offer";
import UserTable from "@/components/UserTable";

const OfferAndCoupons = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Offer & Coupons</h1>
          <p className="text-muted-foreground">Manage offer and coupons.</p>
        </div>

        <OffersAndCoupons />
      </main>
    </div>
  );
};

export default OfferAndCoupons;
