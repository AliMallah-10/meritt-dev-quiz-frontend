"use client";
import React, { useEffect, useState } from "react";
import { useGetProductQuery } from "@/graphql/generated/graphql"; // Import the generated hook
import Loading from "@/components/contents/loading";
import Error from "@/components/contents/Error";
import { useParams } from "next/navigation"; // Use useParams instead of useRouter
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { CircleArrowRight } from "lucide-react";
const ProductDetailsPage = () => {
  const params = useParams(); // Access route parameters
  const id = params.id as string; // Get the product ID from the route parameter

  // State to track if the ID is available
  const [isIdAvailable, setIsIdAvailable] = useState(false);

  // Fetch product data using the generated hook
  const { data, loading, error } = useGetProductQuery({
    variables: {
      id, // Pass the product ID to the query
    },
    skip: !id, // Skip the query if the ID is not available
  });

  // Use useEffect to handle asynchronous updates to router.query
  useEffect(() => {
    if (id) {
      setIsIdAvailable(true); // Set ID as available
    }
  }, [id]);

  // Handle loading state
  if (loading) return <Loading />;

  // Handle error state
  if (error) return <Error message={error.message} />;

  // Handle case where product data is not found
  if (!data?.getProduct?.item) {
    return <Error message={data?.getProduct?.error?.message} />;
  }

  // Destructure product data
  const product = data.getProduct.item;

  return (
    <div className="max-w-7xl mx-auto py-4 px-2">
      <div className="text-2xl font-bold mb-4">Product Details</div>
      <Card className="overflow-hidden shadow-lg">
        <CardContent className="p-0">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Product Images Carousel */}
            <div className="space-y-4 p-14">
              <Carousel>
                <CarouselContent>
                  {product.images.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="relative aspect-square rounded-lg overflow-hidden">
                        <Image
                          src={image}
                          alt={`Product ${index + 1}`}
                          width={900}
                          height={900}
                          className="object-cover"
                          priority
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
            <div className="p-8 flex flex-col justify-between bg-slate-900">
              <div>
                <h1 className="flex items-center gap-3 text-3xl font-bold mb-6 text-white">
                  <CircleArrowRight /> <span> {product.title}</span>
                </h1>
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-2 text-white">
                    Quantity
                  </h2>
                  <div className="flex items-center">
                    <span className="mx-4 text-xl font-semibold text-white">
                      {product.quantity}
                    </span>
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-semibold mb-2 text-white">
                    Description
                  </h2>
                  <p className="text-gray-200 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductDetailsPage;
