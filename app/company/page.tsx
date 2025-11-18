"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@heroui/table";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { listCompaniesAPI } from "@/services/handleApi";
import { AddUserIcon, PencilIcon, TrashIcon } from "@/components/icons";
import { useRouter } from "next/navigation";

const CompanyPage = () => {
  const router = useRouter();
  const [companies, setCompanies] = useState([]);
  const [nextToken, setNextToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const response = await listCompaniesAPI({ nextToken });
      setCompanies(response.items);
      setNextToken(response.nextToken);
    } catch (error) {
      console.error("Error fetching companies", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <Button
          radius="sm"
          color="primary"
          as={Link}
          href="/company/create"
          variant="solid"
        >
          Add Company
        </Button>
      </div>
      <Table radius="sm" aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>No.</TableColumn>
          <TableColumn>Name</TableColumn>
          <TableColumn>Website</TableColumn>
          {/* <TableColumn>Website Tech Stack</TableColumn> */}
          <TableColumn>Industry</TableColumn>
          <TableColumn>Notes</TableColumn>
          <TableColumn>Linkedin</TableColumn>
          <TableColumn>Instagram</TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody isLoading={loading} loadingState="loading">
          {companies.map((company: any, index: number) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell
                // onClick={() => router.push(`/company/${company.id}`)}
                className="underline cursor-pointer"
              >
                <a href={`/company/${company.id}`}>{company.name}</a>
              </TableCell>
              <TableCell
                onClick={() => window.open(company.website, "_blank")}
                className="text-blue-400 hover:underline cursor-pointer"
              >
                {company.website}
              </TableCell>
              {/* <TableCell>{company.websiteTechStack}</TableCell> */}
              <TableCell>{company.industry}</TableCell>
              <TableCell>{company.notes}</TableCell>
              <TableCell
                onClick={() => {
                  window.open(company.linkedin, "_blank");
                }}
                className="cursor-pointer text-blue-400 hover:underline"
              >
                Linked
              </TableCell>
              <TableCell
                onClick={() => {
                  window.open(company.instagram, "_blank");
                }}
                className="cursor-pointer text-blue-400 hover:underline"
              >
                Instagram
              </TableCell>
              <TableCell>{company.status}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    color="primary"
                    as={Link}
                    href={`/company/${company.id}/contacts/create`}
                    aria-label="Add user"
                  >
                    <AddUserIcon size={18} />
                  </Button>
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    color="default"
                    as={Link}
                    href={`/company/edit/${company.id}`}
                    aria-label="Edit company"
                    radius="sm"
                  >
                    <PencilIcon size={18} />
                  </Button>
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    color="danger"
                    // onPress={() => handleDelete(company)}
                    aria-label="Delete company"
                  >
                    <TrashIcon size={18} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompanyPage;
