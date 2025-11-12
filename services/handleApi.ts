import awsmobile from "@/config/aws-export";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import {
  createCompany,
  createContact,
  getCompany,
  getContact,
  listCompanies,
  listContacts,
  listContactsByCompanyId,
  sendOutreachEmail,
  updateCompany,
  updateContact,
} from "./api";

Amplify.configure({
  ...awsmobile,
});

const client = generateClient();

export const getCompanyAPI = async (id: string) => {
  const response: any = await client.graphql({
    query: getCompany,
    variables: {
      id,
    },
    authMode: "apiKey",
  });
  return response?.data?.getCompany;
};

export const createCompanyAPI = async (input: any) => {
  console.log("input", input);
  const response: any = await client.graphql({
    query: createCompany,
    variables: {
      input,
    },
    authMode: "apiKey",
  });
  console.log("response", response);
  return response?.data?.createCompany;
};

export const updateCompanyAPI = async (id: string, input: any) => {
  const response: any = await client.graphql({
    query: updateCompany,
    variables: {
      input: {
        id,
        ...input,
      },
    },
    authMode: "apiKey",
  });
  return response?.data?.updateCompany;
};

export const listCompaniesAPI = async ({
  limit = 100,
  nextToken = null,
}: any) => {
  const response: any = await client.graphql({
    query: listCompanies,
    variables: {
      limit,
      nextToken,
    },
    authMode: "apiKey",
  });
  return response?.data?.listCompanies;
};

export const listContactsAPI = async ({
  limit = 100,
  nextToken = null,
}: any) => {
  const response: any = await client.graphql({
    query: listContacts,
    variables: {
      limit,
      nextToken,
    },
    authMode: "apiKey",
  });
  return response?.data?.listContacts;
};

export const listContactsByCompanyIdAPI = async ({
  companyId,
  limit = 100,
  nextToken = null,
}: any) => {
  const response: any = await client.graphql({
    query: listContactsByCompanyId,
    variables: {
      companyId,
      limit,
      nextToken,
    },
    authMode: "apiKey",
  });
  return response?.data?.listContactsByCompanyId;
};

export const createContactAPI = async (input: any) => {
  const response: any = await client.graphql({
    query: createContact,
    variables: {
      input,
    },
    authMode: "apiKey",
  });
  return response?.data?.createContact;
};

export const updateContactAPI = async (id: string, input: any) => {
  const response: any = await client.graphql({
    query: updateContact,
    variables: {
      input: {
        id,
        ...input,
      },
    },
    authMode: "apiKey",
  });
  return response?.data?.updateContact;
};

export const getContactAPI = async (id: string) => {
  const response: any = await client.graphql({
    query: getContact,
    variables: {
      id,
    },
    authMode: "apiKey",
  });
  return response?.data?.getContact;
};

export const sendOutreachEmailAPI = async (input: any) => {
  const response: any = await client.graphql({
    query: sendOutreachEmail,
    variables: {
      input,
    },
    authMode: "apiKey",
  });
  return response?.data?.sendOutreachEmail;
};
