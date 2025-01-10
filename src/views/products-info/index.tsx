"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProductDetailsPage from "./product-info";

const Index = () => {
  return (
    <div className="max-w-7xl mx-auto py-4 px-2">
      <div className="text-2xl font-bold mb-4">
        <Button asChild>
          <Link href="/all-products">Go Back</Link>
        </Button>
      </div>
      <ProductDetailsPage />
    </div>
  );
};

export default Index;
