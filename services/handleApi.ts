import awsmobile from "@/config/aws-export";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import {
  createCompany,
  createContact,
  createOutreachEmailFlow,
  getCompany,
  getContact,
  listCompanies,
  listContacts,
  listContactsByCompanyId,
  listOutreachEmailFlowsByContactId,
  sendOutreachEmail,
  sendTestOutreachEmail,
  updateCompany,
  updateContact,
  updateOutreachEmailFlow,
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
  const response: any = await client.graphql({
    query: createCompany,
    variables: {
      input,
    },
    authMode: "apiKey",
  });
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

export const listCompaniesAPI = async (): Promise<any[]> => {
  let allCompanies: any[] = [];
  let nextToken: string | null = null;

  do {
    const response: any = await client.graphql({
      query: listCompanies,
      variables: {
        limit: 100,
        nextToken,
      },
      authMode: "apiKey",
    });

    const data = response?.data?.listCompanies;

    if (data?.items?.length) {
      allCompanies.push(...data.items);
    }

    nextToken = data?.nextToken || null;
  } while (nextToken);

  return allCompanies;
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

export const sendTestOutreachEmailAPI = async (input: any) => {
  const response: any = await client.graphql({
    query: sendTestOutreachEmail,
    variables: {
      input,
    },
    authMode: "apiKey",
  });
  return response?.data?.sendTestOutreachEmail;
};

export const createOutreachEmailFlowAPI = async (input: any) => {
  const response: any = await client.graphql({
    query: createOutreachEmailFlow,
    variables: {
      input,
    },
    authMode: "apiKey",
  });
  return response?.data?.createOutreachEmailFlow;
};

export const updateOutreachEmailFlowAPI = async (id: string, input: any) => {
  const response: any = await client.graphql({
    query: updateOutreachEmailFlow,
    variables: {
      input: {
        id,
        ...input,
      },
    },
    authMode: "apiKey",
  });
  return response?.data?.updateOutreachEmailFlow;
};

export const listOutreachEmailFlowsByContactIdAPI = async ({
  contactId,
  limit = 100,
  nextToken = null,
}: any) => {
  const response: any = await client.graphql({
    query: listOutreachEmailFlowsByContactId,
    variables: {
      contactId,
      limit,
      nextToken,
    },
    authMode: "apiKey",
  });
  return response?.data?.listOutreachEmailFlowsByContactId;
};
