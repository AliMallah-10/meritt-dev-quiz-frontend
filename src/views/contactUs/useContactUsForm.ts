import { useState } from "react";
import { Value, isValidPhoneNumber } from "react-phone-number-input";
import { useToast } from "@/components/ui/use-toast";
import { useCreateContactusMutation } from "@/graphql/generated/graphql";

const useContactUsForm = () => {
  const { toast } = useToast();
  const [formState, setFormState] = useState({
    full_name: "",
    phone_number: "", // Use Value type for phone_number
    subject: "",
    body: "",
  });
  const [isPhoneValid, setIsPhoneValid] = useState(true); // State to track phone number validity

  const [createContactus, { loading }] = useCreateContactusMutation({
    onCompleted: (data) => {
      if (data.createContactus.item) {
        toast({
          title: "Success!",
          description: "Thank you for contacting us.",
          variant: "success",
        });
        setFormState({
          full_name: "",
          phone_number: "",
          subject: "",
          body: "",
        });
        setIsPhoneValid(true); // Reset validation state
      } else if (data.createContactus.error) {
        toast({
          title: "Error",
          description: data.createContactus.error.message,
          variant: "destructive",
        });
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handlePhoneChange = (value: Value) => {
    setFormState({
      ...formState,
      phone_number: value || "", // Use an empty string if value is undefined
    });

    // Validate the phone number
    if (value) {
      setIsPhoneValid(isValidPhoneNumber(value));
    } else {
      setIsPhoneValid(true); // Reset validation if the field is empty
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if the phone number is valid
    if (formState.phone_number && !isValidPhoneNumber(formState.phone_number)) {
      setIsPhoneValid(false);
      toast({
        title: "Validation Error",
        description:
          "Please enter a valid phone number for the selected country.",
        variant: "destructive",
      });
      return;
    }

    if (
      !formState.full_name ||
      !formState.phone_number ||
      !formState.subject ||
      !formState.body
    ) {
      toast({
        title: "Validation Error",
        description: "Please fill out all required fields.",
        variant: "destructive",
      });
      return;
    }

    createContactus({
      variables: {
        input: formState,
      },
    });
  };

  return {
    formState,
    isPhoneValid,
    loading,
    handleChange,
    handlePhoneChange,
    handleSubmit,
  };
};

export default useContactUsForm;
