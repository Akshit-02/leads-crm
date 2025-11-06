export const getCompany = /* GraphQL */ `
  query GetCompany($id: ID!) {
    getCompany(id: $id) {
      id
      name
      website
      websiteTechStack
      domain
      industry
      size
      annualRevenue
      address
      city
      state
      country
      zipCode
      linkedin
      instagram
      twitter
      facebook
      status
      createdAt
      updatedAt
    }
  }
`;

export const getContact = /* GraphQL */ `
  query GetContact($id: ID!) {
    getContact(id: $id) {
      id
      name
      email
      phone
      designation
      department
      linkedin
      instagram
      notes
      status
      createdAt
      updatedAt
    }
  }
`;

export const listCompanies = /* GraphQL */ `
  query ListCompanies($limit: Int, $nextToken: String) {
    listCompanies(limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        website
        websiteTechStack
        domain
        industry
        size
        annualRevenue
        address
        city
        state
        country
        zipCode
        linkedin
        instagram
        twitter
        facebook
        status
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

export const listContacts = /* GraphQL */ `
  query ListContacts($limit: Int, $nextToken: String) {
    listContacts(limit: $limit, nextToken: $nextToken) {
      items {
        id
        companyId
        name
        email
        phone
        designation
        department
        linkedin
        instagram
        notes
        status
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

export const listContactsByCompanyId = /* GraphQL */ `
  query ListContactsByCompanyId(
    $companyId: ID!
    $limit: Int
    $nextToken: String
  ) {
    listContactsByCompanyId(
      companyId: $companyId
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        companyId
        name
        email
        phone
        designation
        department
        linkedin
        instagram
        notes
        status
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

export const createCompany = /* GraphQL */ `
  mutation CreateCompany($input: CreateCompanyInput) {
    createCompany(input: $input) {
      id
      name
      website
      websiteTechStack
      domain
      industry
      size
      annualRevenue
      address
      city
      state
      country
      zipCode
      linkedin
      instagram
      twitter
      facebook
      status
      createdAt
      updatedAt
    }
  }
`;

export const createContact = /* GraphQL */ `
  mutation CreateContact($input: CreateContactInput) {
    createContact(input: $input) {
      id
      name
      email
      phone
      designation
      department
      linkedin
      instagram
      notes
      status
      createdAt
      updatedAt
    }
  }
`;

export const updateCompany = /* GraphQL */ `
  mutation UpdateCompany($input: UpdateCompanyInput) {
    updateCompany(input: $input) {
      id
      name
      website
      websiteTechStack
      domain
      industry
      size
      annualRevenue
      address
      city
      state
      country
      zipCode
      linkedin
      instagram
      twitter
      facebook
      status
      createdAt
      updatedAt
    }
  }
`;

export const updateContact = /* GraphQL */ `
  mutation UpdateContact($input: UpdateContactInput) {
    updateContact(input: $input) {
      id
      name
      email
      phone
      designation
      department
      linkedin
      instagram
      notes
      status
      createdAt
      updatedAt
    }
  }
`;
