import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { cn } from "@/lib/utils";
import useContactUsForm from "./useContactUsForm"; // Import the custom hook

const ContactUsForm = () => {
  const {
    formState,
    isPhoneValid,
    loading,
    handleChange,
    handlePhoneChange,
    handleSubmit,
  } = useContactUsForm(); // Use the custom hook

  return (
    <div className="flex justify-center items-center">
      <Card className="w-full rounded-tr-none rounded-br-none">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Contact Us</CardTitle>
          <CardDescription>
            Fill out the form below, and we&apos;ll get back to you as soon as
            possible.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="full_name">Full Name</Label>
              <Input
                id="full_name"
                name="full_name"
                value={formState.full_name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="phone_number">Phone Number</Label>
              <PhoneInput
                international
                defaultCountry="US" // Default country code
                value={formState.phone_number}
                onChange={handlePhoneChange}
                className={cn(
                  "w-full p-2 border rounded-md",
                  !isPhoneValid ? "border-red-500" : "border-gray-300"
                )} // Dynamic border color using cn
                countrySelectProps={{
                  className: cn(
                    "bg-gray-100 border border-gray-300 rounded-md p-2 mr-2",
                    "focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  ), // Use cn for country select dropdown
                }}
                required
              />
              {!isPhoneValid && (
                <p className="text-red-500 text-sm mt-1">
                  Please enter a valid phone number for the selected country.
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                name="subject"
                value={formState.subject}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="body">Message</Label>
              <textarea
                id="body"
                name="body"
                value={formState.body}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                rows={4}
                required
              />
            </div>
            <CardFooter className="flex justify-end p-0">
              <Button type="submit" disabled={loading}>
                {loading ? "Submitting..." : "Submit"}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactUsForm;
