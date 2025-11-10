"use client";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import {
  getCompanyAPI,
  listContactsByCompanyIdAPI,
  sendOutreachEmailAPI,
} from "@/services/handleApi";
import { useState } from "react";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Skeleton } from "@heroui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { AddUserIcon, PencilIcon, TrashIcon } from "@/components/icons";
import { on } from "events";

const CompanyDetailsPage = () => {
  const { companyId } = useParams<{ companyId: string }>();
  const [company, setCompany] = useState<any>(null);
  const [contacts, setContacts] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (companyId) {
      fetchCompanyDetails();
    }
  }, [companyId]);

  const fetchCompanyDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const [companyData, contactsData] = await Promise.all([
        getCompanyAPI(companyId),
        listContactsByCompanyIdAPI({ companyId }),
      ]);
      setCompany(companyData);
      setContacts(contactsData?.items || []);
    } catch (err) {
      console.error("Error fetching company details:", err);
      setError("Failed to load company details. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const renderSocialLink = (url: string | undefined, label: string) => {
    if (!url) return null;
    return (
      <a
        href={url.startsWith("http") ? url : `https://${url}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:underline"
      >
        {label}
      </a>
    );
  };

  if (loading && !company) {
    return (
      <div className="p-5 space-y-4">
        <Skeleton className="h-8 w-64" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
        </div>
        <Skeleton className="h-8 w-48 mt-8" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-5 text-center">
        <p className="text-danger mb-4">{error}</p>
        <Button radius="sm" onPress={fetchCompanyDetails} color="primary">
          Retry
        </Button>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="p-5 text-center">
        <p>Company not found</p>
        <Button radius="sm" as={Link} href="/company" className="mt-4">
          Back to Companies
        </Button>
      </div>
    );
  }

  const handleSendMail = async (contact: any) => {
    console.log(contact);
    try {
      const response = await sendOutreachEmailAPI({
        companyId: company.id,
        contactId: contact.id,
        to: contact.email,
        from: "akshit@zspace.in",
        subject: "How your Shopify store can recover lost revenue",
        text: "Hi Akshit, I noticed beautywise is running on Shopify and your traffic looks solid, great job.",
        html: "<p>Hi Akshit, I noticed beautywise is running on Shopify and your traffic looks solid, great job.</p>",
      });
      console.log("Response:", response);
    } catch (err) {
      console.log("Error sending mail:", err);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{company.name}</h1>
        <Button
          as={Link}
          href={`/company/edit/${company.id}`}
          color="primary"
          radius="sm"
          variant="flat"
        >
          Edit Company
        </Button>
      </div>

      <Card radius="sm">
        <CardHeader className="text-lg font-semibold">
          Company Details
        </CardHeader>
        <Divider />
        <CardBody className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-foreground-500">Website</p>
            {company.website ? (
              <a
                href={
                  company.website.startsWith("http")
                    ? company.website
                    : `https://${company.website}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600 cursor-pointer"
              >
                {company.website}
              </a>
            ) : (
              <p className="text-foreground-400">-</p>
            )}
          </div>
          <div>
            <p className="text-sm text-foreground-500">Website Tech Stack</p>
            <p>{company.websiteTechStack || "-"}</p>
          </div>
          <div>
            <p className="text-sm text-foreground-500">Industry</p>
            <p>{company.industry || "-"}</p>
          </div>
          <div>
            <p className="text-sm text-foreground-500">Company Size</p>
            <p>{company.size || "-"}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm text-foreground-500">Social Links</p>
            <div className="flex gap-4 mt-1">
              {renderSocialLink(company.linkedin, "LinkedIn")}
              {renderSocialLink(company.instagram, "Instagram")}
              {renderSocialLink(company.twitter, "Twitter")}
              {renderSocialLink(company.facebook, "Facebook")}
              {!company.linkedin &&
                !company.instagram &&
                !company.twitter &&
                !company.facebook && (
                  <span className="text-foreground-400">
                    No social links available
                  </span>
                )}
            </div>
          </div>
        </CardBody>
      </Card>

      <div className="flex justify-between items-center mt-4">
        <h2 className="text-xl font-semibold">Contacts</h2>
        <Button
          as={Link}
          href={`/company/${companyId}/contacts/create`}
          color="primary"
          variant="solid"
          radius="sm"
        >
          Add Contact
        </Button>
      </div>
      <Card>
        {loading && contacts.length === 0 ? (
          <div className="p-4 space-y-2">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} className="h-12 w-full rounded-lg" />
              ))}
          </div>
        ) : (
          <Table radius="sm" aria-label="Contacts table">
            <TableHeader>
              <TableColumn>Name</TableColumn>
              <TableColumn>Email</TableColumn>
              <TableColumn>Phone</TableColumn>
              <TableColumn>Designation</TableColumn>
              <TableColumn>Status</TableColumn>
              <TableColumn>Actions</TableColumn>
            </TableHeader>
            <TableBody isLoading={loading} loadingState="loading">
              {contacts.map((contact: any) => (
                <TableRow key={contact.id}>
                  <TableCell className="font-medium">{contact.name}</TableCell>
                  <TableCell>
                    {contact.email ? (
                      <a
                        href={`mailto:${contact.email}`}
                        className="text-primary hover:underline"
                      >
                        {contact.email}
                      </a>
                    ) : (
                      <span className="text-foreground-400">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {contact.phone ? (
                      <a
                        href={`tel:${contact.phone}`}
                        className="hover:underline"
                      >
                        {contact.phone}
                      </a>
                    ) : (
                      <span className="text-foreground-400">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {contact.designation || (
                      <span className="text-foreground-400">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        contact.status === "ACTIVE"
                          ? "bg-success-100 text-success-800"
                          : "bg-warning-100 text-warning-800"
                      }`}
                    >
                      {contact.status || "INACTIVE"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        color="default"
                        // as={Link}
                        // href={`/company/${companyId}/contacts/edit/${contact.id}`}
                        aria-label="Edit contact"
                        radius="sm"
                        onClick={() => handleSendMail(contact)}
                      >
                        <AddUserIcon size={18} />
                      </Button>
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        color="default"
                        as={Link}
                        href={`/company/${companyId}/contacts/edit/${contact.id}`}
                        aria-label="Edit contact"
                        radius="sm"
                      >
                        <PencilIcon size={18} />
                      </Button>
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        color="danger"
                        // onPress={() => handleDeleteContact(contact.id)}
                        aria-label="Delete contact"
                        radius="sm"
                      >
                        <TrashIcon size={18} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  );
};

export default CompanyDetailsPage;
