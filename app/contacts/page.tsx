"use client";
import { listContactsAPI } from "@/services/handleApi";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { useEffect, useState } from "react";

const ContactPage = () => {
  const [contacts, setContacts] = useState([]);
  const [nextToken, setNextToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await listContactsAPI({ limit: 10, nextToken });
      setContacts(response.items);
      setNextToken(response.nextToken);
    } catch (error) {
      console.error("Error fetching contacts", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-5">
      <Table radius="sm" aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>Name</TableColumn>
          <TableColumn>Email</TableColumn>
          <TableColumn>Phone</TableColumn>
          <TableColumn>Designation</TableColumn>
          <TableColumn>Linkedin</TableColumn>
          <TableColumn>Instagram</TableColumn>
          <TableColumn>Status</TableColumn>
        </TableHeader>
        <TableBody isLoading={loading} loadingState="loading">
          {contacts.map((contact: any, index: number) => (
            <TableRow key={index}>
              <TableCell>{contact.name}</TableCell>
              <TableCell>{contact.email}</TableCell>
              <TableCell>{contact.phone}</TableCell>
              <TableCell>{contact.designation}</TableCell>
              <TableCell
                onClick={() => {
                  window.open(contact.linkedin, "_blank");
                }}
              >
                {contact.linkedin}
              </TableCell>
              <TableCell
                onClick={() => {
                  window.open(contact.instagram, "_blank");
                }}
              >
                {contact.instagram}
              </TableCell>
              <TableCell>{contact.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ContactPage;
