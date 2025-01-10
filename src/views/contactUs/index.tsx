"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ContactUsForm from "./ContactUsForm";
import ContactInfo from "./ContactInfo";
const Index = () => {
  return (
    <div className="max-w-7xl mx-auto py-4 px-2">
      <div className="text-2xl font-bold mb-4">
        <Button asChild>
          <Link href={"/"}>Go Back</Link>
        </Button>
      </div>

      <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <ContactUsForm />
          <ContactInfo />
        </div>
      </div>
    </div>
  );
};

export default Index;
