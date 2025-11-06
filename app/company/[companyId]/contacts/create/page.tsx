"use client";

import { createContactAPI } from "@/services/handleApi";
import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Input } from "@heroui/input";
import { Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { addToast } from "@heroui/toast";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

const designationOptions = [
  { label: "Founder", value: "founder" },
  { label: "CEO", value: "ceo" },
  { label: "CTO", value: "cto" },
  { label: "COO", value: "coo" },
  { label: "CFO", value: "cfo" },
  { label: "CMO", value: "cmo" },
  { label: "Growth", value: "growth" },
  { label: "Ecom Lead", value: "ecom_lead" },
  { label: "Other", value: "other" },
];

const ContactCreatePage = () => {
  const { companyId } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState<any>({
    name: "",
    email: "",
    phone: "",
    designation: "",
    department: "",
    linkedin: "",
    instagram: "",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (
    name: string,
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFormData((prev: any) => ({
      ...prev,
      [name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        designation: formData.designation,
        department: formData.department,
        linkedin: formData.linkedin,
        instagram: formData.instagram,
        notes: formData.notes,
        status: "ACTIVE",
        companyId: companyId,
      };
      console.log("payload", payload);
      await createContactAPI(payload);
      addToast({
        title: "Contact created successfully!",
        color: "success",
        radius: "sm",
        variant: "flat",
        timeout: 3000,
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        designation: "",
        department: "",
        linkedin: "",
        instagram: "",
        notes: "",
      });
      router.back();
    } catch (error) {
      console.error("Error creating contact", error);
      addToast({
        title: "Failed to create contact. Please try again.",
        color: "danger",
        radius: "sm",
        variant: "flat",
        timeout: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto" radius="sm">
        <CardHeader className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Create New Contact</h1>
          <p className="text-gray-500">
            Fill in the details below to create a new contact profile.
          </p>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardBody className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-1"
                >
                  Name <span className="text-red-500">*</span>
                </label>
                <Input
                  radius="sm"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter name"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1"
                >
                  Email
                </label>
                <Input
                  radius="sm"
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium mb-1"
                >
                  Phone
                </label>
                <Input
                  radius="sm"
                  id="phone"
                  name="phone"
                  type="number"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone"
                />
              </div>

              <div>
                <label
                  htmlFor="designation"
                  className="block text-sm font-medium mb-1"
                >
                  Designation
                </label>
                <Select
                  radius="sm"
                  id="designation"
                  name="designation"
                  value={formData.designation}
                  onChange={(e) => handleSelectChange("designation", e)}
                  placeholder="Select designation"
                >
                  {designationOptions.map((option) => (
                    <SelectItem key={option.value}>{option.label}</SelectItem>
                  ))}
                </Select>
              </div>
            </div>

            <Divider />

            <h3 className="text-lg font-medium">Social Media</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="linkedin"
                  className="block text-sm font-medium mb-1"
                >
                  LinkedIn
                </label>
                <Input
                  radius="sm"
                  id="linkedin"
                  name="linkedin"
                  type="url"
                  value={formData.linkedin}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/example"
                />
              </div>

              <div>
                <label
                  htmlFor="instagram"
                  className="block text-sm font-medium mb-1"
                >
                  Instagram
                </label>
                <Input
                  radius="sm"
                  id="instagram"
                  name="instagram"
                  type="url"
                  value={formData.instagram}
                  onChange={handleChange}
                  placeholder="https://instagram.com/username"
                />
              </div>
            </div>

            <div>
              <label htmlFor="notes" className="block text-sm font-medium mb-1">
                Notes
              </label>
              <Textarea
                radius="sm"
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Add any additional notes about this contact"
                className="min-h-[100px]"
              />
            </div>
          </CardBody>

          <CardFooter className="flex justify-end space-x-3 pt-6">
            <Button type="button" radius="sm">
              Cancel
            </Button>
            <Button
              type="submit"
              color="primary"
              radius="sm"
              isLoading={isSubmitting}
              disabled={isSubmitting}
            >
              Create Contact
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default ContactCreatePage;
