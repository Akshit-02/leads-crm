"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { addToast } from "@heroui/toast";
import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Chip } from "@heroui/chip";
import { createOutreachEmailFlowAPI } from "@/services/handleApi";

interface FormData {
  outreachMailSubject: string;
  outreachMailHtml: string;
  outreachMailText: string;
  outreachMailScheduledAt: string;
  followup1Subject: string;
  followup1Html: string;
  followup1Text: string;
  followup1ScheduledAt: string;
  followup2Subject: string;
  followup2Html: string;
  followup2Text: string;
  followup2ScheduledAt: string;
  followup3Subject: string;
  followup3Html: string;
  followup3Text: string;
  followup3ScheduledAt: string;
}

const CreateOutreachEmailPage = () => {
  const { companyId, contactId } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const formatDateForInput = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const [formData, setFormData] = useState<FormData>({
    outreachMailSubject: "",
    outreachMailHtml: "",
    outreachMailText: "",
    outreachMailScheduledAt: formatDateForInput(new Date()),

    followup1Subject: "",
    followup1Html: "",
    followup1Text: "",
    followup1ScheduledAt: formatDateForInput(
      new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
    ),

    followup2Subject: "",
    followup2Html: "",
    followup2Text: "",
    followup2ScheduledAt: formatDateForInput(
      new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
    ),

    followup3Subject: "",
    followup3Html: "",
    followup3Text: "",
    followup3ScheduledAt: formatDateForInput(
      new Date(Date.now() + 8 * 24 * 60 * 60 * 1000)
    ),
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toISOWithTimezone = (datetimeLocal: string) => {
    const date = new Date(datetimeLocal);
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60 * 1000);
    return localDate.toISOString();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        companyId: companyId,
        contactId: contactId,
        outreachMailScheduledAt: toISOWithTimezone(
          formData.outreachMailScheduledAt
        ),
        outreachMailSubject: formData.outreachMailSubject,
        outreachMailHtml: formData.outreachMailHtml,
        outreachMailText: formData.outreachMailText,
        followup1ScheduledAt: toISOWithTimezone(formData.followup1ScheduledAt),
        followup1Subject: formData.followup1Subject,
        followup1Html: formData.followup1Html,
        followup1Text: formData.followup1Text,
        followup2ScheduledAt: toISOWithTimezone(formData.followup2ScheduledAt),
        followup2Subject: formData.followup2Subject,
        followup2Html: formData.followup2Html,
        followup2Text: formData.followup2Text,
        followup3ScheduledAt: toISOWithTimezone(formData.followup3ScheduledAt),
        followup3Subject: formData.followup3Subject,
        followup3Html: formData.followup3Html,
        followup3Text: formData.followup3Text,
      };

      await createOutreachEmailFlowAPI(payload);

      addToast({
        title: "Outreach email flow created successfully!",
        color: "success",
        radius: "sm",
        variant: "flat",
        timeout: 3000,
      });

      router.back();
    } catch (error) {
      console.error("Error creating outreach email flow", error);
      addToast({
        title: "Failed to create outreach email flow. Please try again.",
        color: "danger",
        radius: "sm",
        variant: "flat",
        timeout: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderEmailSection = ({
    title,
    prefix,
    stepNumber,
    description,
  }: {
    title: string;
    prefix: string;
    stepNumber: number;
    description: string;
  }) => (
    <Card className="mb-6" radius="sm" shadow="sm">
      <CardHeader className="flex gap-3 pb-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-bold text-lg shrink-0">
          {stepNumber}
        </div>
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="gap-6">
        {/* Schedule and Subject Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Scheduled Date & Time
            </label>
            <input
              type="datetime-local"
              name={`${prefix}ScheduledAt`}
              value={formData[`${prefix}ScheduledAt` as keyof FormData]}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-default-100 hover:bg-default-200 rounded-lg focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Email Subject
            </label>
            <Input
              radius="sm"
              name={`${prefix}Subject`}
              value={formData[`${prefix}Subject` as keyof FormData]}
              onChange={handleChange}
              placeholder="Enter email subject line"
              required
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Plain Text Content
            </label>
            <Textarea
              radius="sm"
              name={`${prefix}Text`}
              value={formData[`${prefix}Text` as keyof FormData]}
              onChange={handleChange}
              placeholder="Write your email message in plain text..."
              required
              minRows={5}
            />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <label className="block text-sm font-medium text-gray-200">
                HTML Content
              </label>
            </div>
            <Textarea
              radius="sm"
              name={`${prefix}Html`}
              value={formData[`${prefix}Html` as keyof FormData]}
              onChange={handleChange}
              placeholder="<p>Add HTML formatted content for rich email styling...</p>"
              minRows={5}
            />
          </div>
        </div>
      </CardBody>
    </Card>
  );

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <Button
              isIconOnly
              size="sm"
              variant="light"
              radius="sm"
              onPress={() => router.back()}
            >
              ←
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Create Email Sequence</h1>
              <p className="text-gray-500 mt-1">
                Set up your outreach campaign with automated follow-ups
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Initial Email */}
          {renderEmailSection({
            title: "Initial Outreach",
            prefix: "outreachMail",
            stepNumber: 1,
            description: "Your first contact email",
          })}

          {/* Follow-up Emails Header */}
          <div className="flex items-center gap-3 mb-6 mt-8">
            <Divider className="flex-1" />
            <span className="text-sm font-medium text-gray-500 px-3">
              AUTOMATED FOLLOW-UPS
            </span>
            <Divider className="flex-1" />
          </div>

          {/* Follow-up Emails */}
          <div className="pl-0 md:pl-6 border-l-0 md:border-l-2 border-gray-200 space-y-0">
            {renderEmailSection({
              title: "First Follow-up",
              prefix: "followup1",
              stepNumber: 2,
              description: "Sent 2 days after initial email",
            })}

            {renderEmailSection({
              title: "Second Follow-up",
              prefix: "followup2",
              stepNumber: 3,
              description: "Sent 5 days after initial email",
            })}

            {renderEmailSection({
              title: "Final Follow-up",
              prefix: "followup3",
              stepNumber: 4,
              description: "Sent 8 days after initial email",
            })}
          </div>

          {/* Actions */}
          {/* <Card className="mt-6" radius="sm" shadow="sm"> */}
          {/* <CardBody className="flex flex-row justify-between items-center gap-4 py-4"> */}
          <div className="flex gap-3 justify-end">
            <Button
              type="button"
              color="default"
              variant="flat"
              radius="sm"
              onPress={() => router.back()}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              color="primary"
              radius="sm"
              isLoading={isSubmitting}
              disabled={isSubmitting}
            >
              Create Email Sequence
            </Button>
          </div>
          {/* </CardBody> */}
          {/* </Card> */}
        </form>
      </div>
    </div>
  );
};

export default CreateOutreachEmailPage;
