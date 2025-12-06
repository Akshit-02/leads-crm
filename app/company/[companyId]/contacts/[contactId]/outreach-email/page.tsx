"use client";
import { useParams, useRouter } from "next/navigation";
import {
  listOutreachEmailFlowsByContactIdAPI,
  sendTestOutreachEmailAPI,
  updateOutreachEmailFlowAPI,
} from "@/services/handleApi";
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Divider } from "@heroui/divider";
import { Spinner } from "@heroui/spinner";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Input, Textarea } from "@heroui/input";
import { addToast } from "@heroui/toast";

interface EmailData {
  id: string;
  outreachMailSubject: string;
  outreachMailScheduledAt: string;
  outreachMailText: string;
  outreachMailHtml: string;
  followup1Subject: string;
  followup1ScheduledAt: string;
  followup1Text: string;
  followup1Html: string;
  followup2Subject: string;
  followup2ScheduledAt: string;
  followup2Text: string;
  followup2Html: string;
  followup3Subject: string;
  followup3ScheduledAt: string;
  followup3Text: string;
  followup3Html: string;
  createdAt: string;
  updatedAt: string;
}

interface EditModalData {
  title: string;
  subject: string;
  scheduledAt: string;
  text: string;
  html: string;
  fieldPrefix: string;
}

const OutreachEmailPage = () => {
  const { contactId } = useParams<{ contactId: string }>();
  const router = useRouter();
  const [mailData, setMailData] = useState<EmailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState<EditModalData | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (contactId) {
      fetchOutreachEmailFlow();
    }
  }, [contactId]);

  const fetchOutreachEmailFlow = async () => {
    setLoading(true);
    setError(null);
    try {
      const mailResponse = await listOutreachEmailFlowsByContactIdAPI({
        contactId,
      });
      setMailData(mailResponse?.items?.[0]);
    } catch (err) {
      console.error("Error fetching outreach email flow:", err);
      setError("Failed to load outreach email flow. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "Not scheduled";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDateForInput = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const handleEdit = (
    title: string,
    subject: string,
    scheduledAt: string,
    text: string,
    html: string,
    fieldPrefix: string
  ) => {
    setEditData({
      title,
      subject,
      scheduledAt: formatDateForInput(scheduledAt),
      text,
      html,
      fieldPrefix,
    });
    setIsEditModalOpen(true);
  };

  const handleSave = async () => {
    if (!editData || !mailData) return;

    setIsSaving(true);
    try {
      const updatedMailData = { ...mailData };
      updatedMailData[`${editData.fieldPrefix}Subject` as keyof EmailData] =
        editData.subject;
      updatedMailData[`${editData.fieldPrefix}ScheduledAt` as keyof EmailData] =
        editData.scheduledAt;
      updatedMailData[`${editData.fieldPrefix}Text` as keyof EmailData] =
        editData.text;
      updatedMailData[`${editData.fieldPrefix}Html` as keyof EmailData] =
        editData.html;

      const { id, createdAt, updatedAt, ...rest } = updatedMailData;
      await updateOutreachEmailFlowAPI(mailData.id, rest);

      setIsEditModalOpen(false);
      setEditData(null);
      fetchOutreachEmailFlow();
    } catch (err) {
      console.error("Error saving changes:", err);
      alert("Failed to save changes. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSendTestMail = async (
    subject: string,
    text: string,
    html: string
  ) => {
    try {
      const response = await sendTestOutreachEmailAPI({
        to: "akshit.techie@gmail.com",
        from: "akshit@zspace.in",
        subject,
        text,
        html,
      });
      addToast({
        title: "Test mail sent successfully.",
        color: "success",
        radius: "sm",
        variant: "flat",
        timeout: 3000,
      });
    } catch (err) {
      console.error("Error sending test mail:", err);
      addToast({
        title: "Failed to send test mail. Please try again.",
        color: "danger",
        radius: "sm",
        variant: "flat",
        timeout: 3000,
      });
    }
  };

  const renderEmailSection = ({
    title,
    subject,
    scheduledAt,
    text,
    html,
    stepNumber,
    fieldPrefix,
  }: {
    title: string;
    subject: string;
    scheduledAt: string;
    text: string;
    html: string;
    stepNumber: number;
    fieldPrefix: string;
  }) => {
    const hasContent = subject || text || html;

    return (
      <Card className="mb-4" radius="sm">
        <CardHeader className="flex justify-between items-center pb-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold">
              {stepNumber}
            </div>
            <div>
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="text-sm text-gray-500">{formatDate(scheduledAt)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {hasContent ? (
              <Chip color="success" variant="flat" size="sm">
                Configured
              </Chip>
            ) : (
              <Chip color="default" variant="flat" size="sm">
                Not Set
              </Chip>
            )}
            <Button
              size="sm"
              color="secondary"
              variant="flat"
              onPress={() => handleSendTestMail(subject, text, html)}
            >
              Send Test Mail
            </Button>
            <Button
              size="sm"
              color="primary"
              variant="flat"
              onPress={() =>
                handleEdit(title, subject, scheduledAt, text, html, fieldPrefix)
              }
            >
              Edit
            </Button>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="space-y-4">
          {!hasContent ? (
            <p className="text-gray-400 text-center py-4">
              No content configured for this email
            </p>
          ) : (
            <>
              <div>
                <label className="text-sm font-semibold text-gray-600 block mb-1">
                  Subject
                </label>
                <p className="text-base">{subject || "No subject"}</p>
              </div>

              {text && (
                <div>
                  <label className="text-sm font-semibold text-gray-600 block mb-1">
                    Plain Text Content
                  </label>
                  <div className="bg-gray-50 p-4 rounded-lg border">
                    <p className="whitespace-pre-wrap text-gray-700 text-sm">
                      {text}
                    </p>
                  </div>
                </div>
              )}

              {html && (
                <div>
                  <label className="text-sm font-semibold text-gray-600 block mb-1">
                    HTML Content
                  </label>
                  <div className="bg-gray-50 p-4 rounded-lg border">
                    <code className="text-xs font-mono text-gray-700 block whitespace-pre-wrap break-all">
                      {html}
                    </code>
                  </div>
                </div>
              )}
            </>
          )}
        </CardBody>
      </Card>
    );
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4 flex justify-center items-center min-h-[400px]">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Card className="max-w-2xl mx-auto" radius="sm">
          <CardBody className="text-center py-8">
            <div className="text-red-500 text-lg mb-2">⚠️ Error</div>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button
              color="primary"
              radius="sm"
              onPress={fetchOutreachEmailFlow}
            >
              Try Again
            </Button>
          </CardBody>
        </Card>
      </div>
    );
  }

  if (!mailData) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Card className="max-w-2xl mx-auto" radius="sm">
          <CardBody className="text-center py-8">
            <div className="text-gray-400 text-lg mb-2">📧</div>
            <p className="text-gray-600 mb-4">
              No outreach email flow found for this contact.
            </p>
            <Button color="primary" radius="sm" onPress={() => router.back()}>
              Go Back
            </Button>
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Outreach Email Flow</h1>
            <p className="text-gray-500">
              View the complete email sequence for this contact
            </p>
          </div>
          <Button
            color="default"
            variant="light"
            radius="sm"
            onPress={() => router.back()}
          >
            ← Back
          </Button>
        </div>

        <div className="space-y-6">
          {renderEmailSection({
            title: "Initial Outreach Email",
            subject: mailData.outreachMailSubject,
            scheduledAt: mailData.outreachMailScheduledAt,
            text: mailData.outreachMailText,
            html: mailData.outreachMailHtml,
            stepNumber: 1,
            fieldPrefix: "outreachMail",
          })}

          <div className="pl-4 border-l-2 border-gray-200 space-y-6">
            {renderEmailSection({
              title: "Follow-up 1",
              subject: mailData.followup1Subject,
              scheduledAt: mailData.followup1ScheduledAt,
              text: mailData.followup1Text,
              html: mailData.followup1Html,
              stepNumber: 2,
              fieldPrefix: "followup1",
            })}

            {renderEmailSection({
              title: "Follow-up 2",
              subject: mailData.followup2Subject,
              scheduledAt: mailData.followup2ScheduledAt,
              text: mailData.followup2Text,
              html: mailData.followup2Html,
              stepNumber: 3,
              fieldPrefix: "followup2",
            })}

            {renderEmailSection({
              title: "Follow-up 3",
              subject: mailData.followup3Subject,
              scheduledAt: mailData.followup3ScheduledAt,
              text: mailData.followup3Text,
              html: mailData.followup3Html,
              stepNumber: 4,
              fieldPrefix: "followup3",
            })}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        size="3xl"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit {editData?.title}
              </ModalHeader>
              <ModalBody>
                <div className="space-y-4">
                  <Input
                    label="Subject"
                    placeholder="Enter email subject"
                    value={editData?.subject || ""}
                    onChange={(e) =>
                      setEditData(
                        editData
                          ? { ...editData, subject: e.target.value }
                          : null
                      )
                    }
                    radius="sm"
                  />

                  <Input
                    type="date"
                    label="Scheduled Date"
                    value={editData?.scheduledAt || ""}
                    onChange={(e) =>
                      setEditData(
                        editData
                          ? { ...editData, scheduledAt: e.target.value }
                          : null
                      )
                    }
                    radius="sm"
                  />

                  <Textarea
                    label="Plain Text Content"
                    placeholder="Enter plain text content"
                    value={editData?.text || ""}
                    onChange={(e) =>
                      setEditData(
                        editData ? { ...editData, text: e.target.value } : null
                      )
                    }
                    minRows={6}
                    radius="sm"
                  />

                  <Textarea
                    label="HTML Content"
                    placeholder="Enter HTML content"
                    value={editData?.html || ""}
                    onChange={(e) =>
                      setEditData(
                        editData ? { ...editData, html: e.target.value } : null
                      )
                    }
                    minRows={8}
                    radius="sm"
                    classNames={{
                      input: "font-mono text-sm",
                    }}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={onClose}
                  radius="sm"
                  disabled={isSaving}
                >
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={handleSave}
                  radius="sm"
                  isLoading={isSaving}
                >
                  Save Changes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default OutreachEmailPage;
