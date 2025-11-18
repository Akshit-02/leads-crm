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
    return;
    try {
      const outreach = await sendOutreachEmailAPI({
        companyId: company.id,
        contactId: contact.id,
        // to: "akshit.techie@gmail.com",
        to: contact.email,
        from: "akshit@zspace.in",
        subject: "3 Hidden conversion gains waiting on Vaaree’s Shopify store",
        text: `Hi Vritee,

      I came across 11.11 / eleven eleven recently — absolutely love your craftsmanship and heritage story. The hand-spun, naturally dyed, artisan-led approach is truly inspiring.

      I’m Akshit, founder of Zspace, where we partner with Shopify-D2C brands to recover lost revenue and boost conversions — especially from traffic you already have.

      From a quick look at your site, I noticed a few areas that could unlock 10–25%+ more revenue without increasing ad spend:

      1. Mobile checkout speed & friction – even a few extra seconds of load time can hurt conversions.
      2. Funnel drop-off – optimizing the “last mile” (product page → cart → checkout) often yields big wins.
      3. UX & app-stack overlap – small app conflicts or slow scripts can impact performance.

      I’d love to offer you a free 15-min audit session of your Shopify funnel and share some actionable ideas you can apply right away.

      Would Wednesday morning or Thursday afternoon work for a quick chat?

      Cheers,
      Akshit Murarka
      Founder, Zspace Technologies
      https://zspace.in
        `,
        html: `
        <p>Hi Garima,</p>

        <p>I came across <b>${company.name}</b> recently, absolutely love your craftsmanship and heritage story. The hand-spun, naturally dyed, artisan-led approach is truly inspiring.</p>

        <p>I’m <b>Akshit</b>, founder of <b>Zspace</b>, where we partner with Shopify D2C brands to <b>boost conversions</b> from the traffic they already have.</p>

        <p>From a quick look at your site, I noticed a few areas that could unlock <b>10–25%+ more revenue</b> without increasing ad spend:</p>

        <ul>
          <li><b>Mobile checkout speed & friction</b> – even a few extra seconds of load time can hurt conversions.</li>
          <li><b>Funnel drop-off</b> – optimizing the “last mile” (product page → cart → checkout) often yields big wins.</li>
          <li><b>UX & app-stack overlap</b> – small app conflicts or slow scripts can impact performance.</li>
        </ul>

        <p>I’d love to offer you a <b>free 15-min audit</b> of your Shopify funnel and share <b>actionable ideas</b> you can apply right away.</p>

        <p>Would you be available for a brief 15-minute discussion this week?</p>

        <p>Cheers,<br>
        <b>Akshit Murarka</b><br>
        Founder, Zspace Technologies<br>
        <a href="https://zspace.in" target="_blank">https://zspace.in</a></p>
        `,
      });

      const follow1 = await sendOutreachEmailAPI({
        companyId: company.id,
        contactId: contact.id,
        // to: "akshit.techie@gmail.com",
        to: contact.email,
        from: "akshit@zspace.in",
        subject: "A few more CRO insights I found on Vaaree",
        text: `Hi Vritee,

Following up on my earlier note — I took a deeper look at 11.11’s Shopify experience and found a few more areas where you could unlock extra conversions without increasing ad spend.

Here are 5 things worth testing or auditing:
1. Image compression & script order – can reduce mobile load time by 30–40%.  
2. PDP scroll depth – some users don’t reach “Add to Cart” without visual anchors.  
3. Cart abandonment triggers – custom popups or reminders can recover 8–12% of drop-offs.  
4. Bundle & AOV prompts – your storytelling is perfect for ritual sets or complementary pairing.  
5. Checkout app scripts – sometimes cause 2–3 sec lag on mobile.

Happy to walk you through a free 15-min audit and share a few practical next steps you can apply right away.  
Would early next week work for you?

Cheers,  
Akshit  
Founder, Zspace Technologies  
https://zspace.in
        `,
        html: `
        <p>Hi Vritee</p>

        <p>Following up on my earlier note — I took a deeper look at <b>11.11’s store</b> and found a few more areas where you could unlock extra conversions without increasing ad spend.</p>

        <ul>
          <li><b>Image compression & script order</b> – can reduce mobile load time by 30–40%.</li>
          <li><b>PDP scroll depth</b> – some users don’t reach “Add to Cart” without visual anchors.</li>
          <li><b>Cart abandonment triggers</b> – custom popups or reminders can recover 8–12% of drop-offs.</li>
          <li><b>Bundle & AOV prompts</b> – your storytelling is perfect for ritual sets or complementary pairing.</li>
          <li><b>Checkout app scripts</b> – sometimes cause 2–3 sec lag on mobile.</li>
        </ul>

        <p>Happy to walk you through a free 15-min audit and share a few practical next steps you can apply right away. Would early next week work for you?</p>
        <p>Would early next week work for you?</p>

        <p>Cheers,<br>
        <b>Akshit Murarka</b><br>
        Founder, Zspace Technologies<br>
        <a href="https://zspace.in" target="_blank">https://zspace.in</a></p>
        `,
      });
      const follow2 = await sendOutreachEmailAPI({
        companyId: company.id,
        contactId: contact.id,
        // to: "akshit.techie@gmail.com",
        to: contact.email,
        from: "akshit@zspace.in",
        subject: "Quick nudge on my Shopify audit offer for Vaaree",
        text: `Did you get a chance to review my CRO audit offer for 11.11?

Hi Vritee,

Just checking in in case my earlier notes got buried.

I’d still love to share a short, no-pitch CRO audit for 11.11 — with a few practical ideas you can test immediately to boost conversions and AOV.

Many D2C brands I’ve worked with have seen quick wins just from small UX and funnel tweaks.

Would you be open to a quick 15-min chat this week?

Best,  
Akshit  
Founder, Zspace Technologies  
https://zspace.in
        `,
        html: `
        <p>Hi Vritee</p>

        <p>Just checking in in case my earlier notes got buried.</p>

        <p>I’d still love to share a short, no-pitch CRO audit for 11.11 — with a few practical ideas you can test immediately to boost conversions and AOV.</b></p>

        <p>I’d still love to offer the <b>short, free audit for Vaaree</b> — with a few ideas tailored to your <b>design-driven home décor offering</b> and <b>customer base.</b></p>

        <p>Would you be open to a <b>15-min chat this week?</b></p>

        <p>Cheers,<br>
        <b>Akshit Murarka</b><br>
        Founder, Zspace Technologies<br>
        <a href="https://zspace.in" target="_blank">https://zspace.in</a></p>
        `,
      });

      const follow3 = await sendOutreachEmailAPI({
        companyId: company.id,
        contactId: contact.id,
        // to: "akshit.techie@gmail.com",
        to: contact.email,
        from: "akshit@zspace.in",
        subject: "Should I close the loop on Vaaree’s CRO audit offer?",
        text: `Hi Vritee,

I know things can get busy — totally understand if now isn’t the right time.

If you’re still open, I’d be happy to run a free mini audit of your Shopify funnel and send over 2–3 tailored insights you can act on immediately (no strings attached).

Otherwise, I’ll close the loop for now and reconnect later this quarter with fresh CRO benchmarks we’re seeing across D2C fashion and lifestyle brands.

Either way, wishing you a great Q4 — your brand story truly deserves more eyes (and conversions) on it.

Warm regards,  
Akshit Murarka  
Founder, Zspace Technologies  
https://zspace.in
        `,
        html: `
        <p>Hi Vritee</p>

        <p>I know things can get busy — totally understand if now isn’t the right time.</p>

        <p>If you’re still open, I’d be happy to run a free mini audit of your Shopify funnel and send over 2–3 tailored insights you can act on immediately (no strings attached).</p>

        <p>Otherwise, I’ll <b>close the loop for now</b> and reconnect later this quarter with fresh CRO benchmarks we’re seeing across D2C fashion and lifestyle brands.</p>

        <p>Either way, wishing you a great Q4 — your brand story truly deserves more eyes (and conversions) on it.</p>

        <p>Cheers,<br>
        <b>Akshit Murarka</b><br>
        Founder, Zspace Technologies<br>
        <a href="https://zspace.in" target="_blank">https://zspace.in</a></p>
        `,
      });
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
              <TableColumn>No.</TableColumn>
              <TableColumn>Name</TableColumn>
              <TableColumn>Email</TableColumn>
              <TableColumn>Phone</TableColumn>
              <TableColumn>Designation</TableColumn>
              <TableColumn>Notes</TableColumn>
              <TableColumn>Status</TableColumn>
              <TableColumn>Actions</TableColumn>
            </TableHeader>
            <TableBody isLoading={loading} loadingState="loading">
              {contacts.map((contact: any, index: number) => (
                <TableRow key={contact.id}>
                  <TableCell>{index + 1}</TableCell>
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
                    {contact.notes || (
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
                        as={Link}
                        href={`/company/${companyId}/contacts/${contact.id}/outreach-email/create`}
                        // onClick={() => handleSendMail(contact)}
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
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        color="default"
                        // as={Link}
                        // href={`/company/${companyId}/contacts/edit/${contact.id}`}
                        aria-label="Edit contact"
                        radius="sm"
                        as={Link}
                        href={`/company/${companyId}/contacts/${contact.id}/outreach-email`}
                        // onClick={() => handleSendMail(contact)}
                      >
                        <AddUserIcon size={18} />
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
