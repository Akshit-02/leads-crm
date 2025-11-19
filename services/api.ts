export const getCompany = /* GraphQL */ `
  query GetCompany($id: ID!) {
    getCompany(id: $id) {
      id
      name
      website
      gsiPartitionKey
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
      notes
      priority
      email
      phone
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
      assignedTo
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
        gsiPartitionKey
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
        notes
        priority
        email
        phone
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
        assignedTo
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
        assignedTo
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
      gsiPartitionKey
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
      notes
      email
      phone
      priority
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
      assignedTo
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
      gsiPartitionKey
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
      notes
      email
      phone
      priority
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
      assignedTo
      notes
      status
      createdAt
      updatedAt
    }
  }
`;

export const sendOutreachEmail = /* GraphQL */ `
  mutation SendOutreachEmail($input: SendOutreachEmailInput) {
    sendOutreachEmail(input: $input) {
      success
      message
    }
  }
`;

export const sendTestOutreachEmail = /* GraphQL */ `
  mutation SendTestOutreachEmail($input: SendTestOutreachEmailInput) {
    sendTestOutreachEmail(input: $input) {
      success
      message
    }
  }
`;

export const createOutreachEmailFlow = /* GraphQL */ `
  mutation CreateOutreachEmailFlow($input: CreateOutreachEmailFlowInput) {
    createOutreachEmailFlow(input: $input) {
      id
      companyId
      contactId

      outreachMailText
      outreachMailSubject
      outreachMailHtml
      outreachMailScheduledAt

      followup1Text
      followup1Subject
      followup1Html
      followup1ScheduledAt

      followup2Text
      followup2Subject
      followup2Html
      followup2ScheduledAt

      followup3Text
      followup3Subject
      followup3Html
      followup3ScheduledAt

      createdAt
      updatedAt
    }
  }
`;

export const updateOutreachEmailFlow = /* GraphQL */ `
  mutation UpdateOutreachEmailFlow($input: UpdateOutreachEmailFlowInput) {
    updateOutreachEmailFlow(input: $input) {
      id
      companyId
      contactId

      outreachMailText
      outreachMailSubject
      outreachMailHtml
      outreachMailScheduledAt

      followup1Text
      followup1Subject
      followup1Html
      followup1ScheduledAt

      followup2Text
      followup2Subject
      followup2Html
      followup2ScheduledAt

      followup3Text
      followup3Subject
      followup3Html
      followup3ScheduledAt

      createdAt
      updatedAt
    }
  }
`;

export const listOutreachEmailFlowsByContactId = /* GraphQL */ `
  query ListOutreachEmailFlowsByContactId(
    $contactId: ID!
    $limit: Int
    $nextToken: String
  ) {
    listOutreachEmailFlowsByContactId(
      contactId: $contactId
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        companyId
        contactId
        outreachMailText
        outreachMailSubject
        outreachMailHtml
        outreachMailScheduledAt

        followup1Text
        followup1Subject
        followup1Html
        followup1ScheduledAt

        followup2Text
        followup2Subject
        followup2Html
        followup2ScheduledAt

        followup3Text
        followup3Subject
        followup3Html
        followup3ScheduledAt

        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
