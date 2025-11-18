"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addToast } from "@heroui/toast";
import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { createCompanyAPI } from "@/services/handleApi";

const industryOptions = [
  { label: "Ecommerce", value: "ecommerce" },
  { label: "Beauty", value: "beauty" },
  { label: "Fashion", value: "fashion" },
  { label: "Electronics", value: "electronics" },
  { label: "Jewellry", value: "jewellry" },
  { label: "Perfumes", value: "perfumes" },
  { label: "Food", value: "food" },
  { label: "Home decor", value: "home-decor" },
  { label: "Home essentials", value: "home-essentials" },
  { label: "Gifting", value: "gifting" },
  { label: "Pharmacy", value: "pharmacy" },
  { label: "Technology", value: "technology" },
  { label: "Finance", value: "finance" },
  { label: "Healthcare", value: "healthcare" },
  { label: "Education", value: "education" },
  { label: "Retail", value: "retail" },
  { label: "Manufacturing", value: "manufacturing" },
  { label: "Other", value: "other" },
];

const priorityOptions = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
];

const websiteTechStackOptions = [
  { label: "Shopify", value: "shopify" },
  { label: "Wordpress", value: "wordpress" },
  { label: "WooCommerce", value: "woocommerce" },
  { label: "Wix", value: "wix" },
  { label: "Next.js", value: "nextjs" },
  { label: "Angular", value: "angular" },
  { label: "Vue", value: "vue" },
  { label: "Other", value: "other" },
];

const sizeOptions = [
  { label: "1-10 employees", value: "1-10" },
  { label: "11-50 employees", value: "11-50" },
  { label: "51-200 employees", value: "51-200" },
  { label: "201-500 employees", value: "201-500" },
  { label: "501-1000 employees", value: "501-1000" },
  { label: "1001-5000 employees", value: "1001-5000" },
  { label: "5000+ employees", value: "5000+" },
];

const CompanyCreatePage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState<any>({
    name: "",
    website: "",
    websiteTechStack: "",
    domain: "",
    industry: "",
    size: "",
    annualRevenue: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    email: "",
    phone: "",
    notes: "",
    priority: "",
    linkedin: "",
    instagram: "",
    twitter: "",
    facebook: "",
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
        website: formData.website,
        websiteTechStack: formData.websiteTechStack,
        domain: formData.domain,
        industry: formData.industry,
        size: formData.size,
        annualRevenue: formData.annualRevenue,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        zipCode: formData.zipCode,
        email: formData.email,
        phone: formData.phone,
        notes: formData.notes,
        priority: formData.priority,
        linkedin: formData.linkedin,
        instagram: formData.instagram,
        twitter: formData.twitter,
        facebook: formData.facebook,
        status: "ACTIVE",
      };
      await createCompanyAPI(payload);
      addToast({
        title: "Company created successfully!",
        // description: "Company created successfully!",
        color: "success",
        radius: "sm",
        variant: "flat",
        timeout: 3000,
      });
      // Reset form after successful submission
      setFormData({
        name: "",
        website: "",
        domain: "",
        industry: "",
        size: "",
        annualRevenue: "",
        address: "",
        city: "",
        state: "",
        country: "",
        zipCode: "",
        email: "",
        phone: "",
        notes: "",
        priority: "",
        linkedin: "",
        instagram: "",
        twitter: "",
        facebook: "",
      });
      router.back();
    } catch (error) {
      console.error("Error creating company", error);
      addToast({
        title: "Failed to create company. Please try again.",
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
    <div className="container mx-auto">
      <Card className="max-w-4xl mx-auto" radius="sm">
        <CardHeader className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Create New Company</h1>
          <p className="text-gray-500">
            Fill in the details below to create a new company profile.
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
                  Company Name <span className="text-red-500">*</span>
                </label>
                <Input
                  radius="sm"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter company name"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="website"
                  className="block text-sm font-medium mb-1"
                >
                  Website
                </label>
                <Input
                  radius="sm"
                  id="website"
                  name="website"
                  type="url"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://example.com"
                />
              </div>

              {/* <div>
                <label
                  htmlFor="domain"
                  className="block text-sm font-medium mb-1"
                >
                  Domain
                </label>
                <Input
                  radius="sm"
                  id="domain"
                  name="domain"
                  value={formData.domain}
                  onChange={handleChange}
                  placeholder="example.com"
                />
              </div> */}

              <div>
                <label
                  htmlFor="websiteTechStack"
                  className="block text-sm font-medium mb-1"
                >
                  Website Tech Stack
                </label>
                <Select
                  radius="sm"
                  id="websiteTechStack"
                  name="websiteTechStack"
                  value={formData.websiteTechStack}
                  onChange={(e) => handleSelectChange("websiteTechStack", e)}
                  placeholder="Select website tech stack"
                >
                  {websiteTechStackOptions.map((option) => (
                    <SelectItem key={option.value}>{option.label}</SelectItem>
                  ))}
                </Select>
              </div>

              <div>
                <label
                  htmlFor="industry"
                  className="block text-sm font-medium mb-1"
                >
                  Industry
                </label>
                <Select
                  radius="sm"
                  id="industry"
                  name="industry"
                  value={formData.industry}
                  onChange={(e) => handleSelectChange("industry", e)}
                  placeholder="Select industry"
                >
                  {industryOptions.map((option) => (
                    <SelectItem key={option.value}>{option.label}</SelectItem>
                  ))}
                </Select>
              </div>

              <div>
                <label
                  htmlFor="size"
                  className="block text-sm font-medium mb-1"
                >
                  Company Size
                </label>
                <Select
                  radius="sm"
                  id="size"
                  name="size"
                  value={formData.size}
                  onChange={(e) => handleSelectChange("size", e)}
                  placeholder="Select company size"
                >
                  {sizeOptions.map((option) => (
                    <SelectItem key={option.value}>{option.label}</SelectItem>
                  ))}
                </Select>
              </div>

              <div>
                <label
                  htmlFor="annualRevenue"
                  className="block text-sm font-medium mb-1"
                >
                  Annual Revenue
                </label>
                <Input
                  radius="sm"
                  id="annualRevenue"
                  name="annualRevenue"
                  type="number"
                  value={formData.annualRevenue}
                  onChange={handleChange}
                  placeholder="e.g. 1000000"
                />
              </div>
              <div>
                <label
                  htmlFor="annualRevenue"
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
                  placeholder="e.g. example@gmail.com"
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
                  placeholder="e.g. 1234567890"
                />
              </div>
              <div>
                <label
                  htmlFor="industry"
                  className="block text-sm font-medium mb-1"
                >
                  Priority
                </label>
                <Select
                  radius="sm"
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={(e) => handleSelectChange("priority", e)}
                  placeholder="Select priority"
                >
                  {priorityOptions.map((option) => (
                    <SelectItem key={option.value}>{option.label}</SelectItem>
                  ))}
                </Select>
              </div>
            </div>

            <Divider />

            <h3 className="text-lg font-medium">Address Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium mb-1"
                >
                  Street Address
                </label>
                <Input
                  radius="sm"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="123 Main St"
                />
              </div>

              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium mb-1"
                >
                  City
                </label>
                <Input
                  radius="sm"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="New York"
                />
              </div>

              <div>
                <label
                  htmlFor="state"
                  className="block text-sm font-medium mb-1"
                >
                  State/Province
                </label>
                <Input
                  radius="sm"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="NY"
                />
              </div>

              <div>
                <label
                  htmlFor="country"
                  className="block text-sm font-medium mb-1"
                >
                  Country
                </label>
                <Input
                  radius="sm"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="United States"
                />
              </div>

              <div>
                <label
                  htmlFor="zipCode"
                  className="block text-sm font-medium mb-1"
                >
                  ZIP/Postal Code
                </label>
                <Input
                  radius="sm"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  placeholder="10001"
                />
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
                  placeholder="https://linkedin.com/company/example"
                />
              </div>

              <div>
                <label
                  htmlFor="twitter"
                  className="block text-sm font-medium mb-1"
                >
                  Twitter
                </label>
                <Input
                  radius="sm"
                  id="twitter"
                  name="twitter"
                  type="url"
                  value={formData.twitter}
                  onChange={handleChange}
                  placeholder="https://twitter.com/example"
                />
              </div>

              <div>
                <label
                  htmlFor="facebook"
                  className="block text-sm font-medium mb-1"
                >
                  Facebook
                </label>
                <Input
                  radius="sm"
                  id="facebook"
                  name="facebook"
                  type="url"
                  value={formData.facebook}
                  onChange={handleChange}
                  placeholder="https://facebook.com/example"
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
                  placeholder="https://instagram.com/example"
                />
              </div>

              <div>
                <label
                  htmlFor="notes"
                  className="block text-sm font-medium mb-1"
                >
                  Notes
                </label>
                <Textarea
                  radius="sm"
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Add any additional notes about this company"
                  className="min-h-[100px]"
                />
              </div>
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
              Create Company
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default CompanyCreatePage;
