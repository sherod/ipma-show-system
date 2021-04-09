/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getEntrant = /* GraphQL */ `
  query GetEntrant($id: ID!) {
    getEntrant(id: $id) {
      id
      firstname
      lastname
      memberOfClub
      contactPhone
      entrantNumber
      checkedIn
      age
      entries {
        items {
          id
          name
          scale
          category
          manufacturer
          entrantID
          entryNumber
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listEntrants = /* GraphQL */ `
  query ListEntrants(
    $filter: ModelEntrantFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEntrants(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        firstname
        lastname
        memberOfClub
        contactPhone
        entrantNumber
        checkedIn
        age
        entries {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getEntry = /* GraphQL */ `
  query GetEntry($id: ID!) {
    getEntry(id: $id) {
      id
      name
      scale
      category
      manufacturer
      entrantID
      entryNumber
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listEntrys = /* GraphQL */ `
  query ListEntrys(
    $filter: ModelEntryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEntrys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        scale
        category
        manufacturer
        entrantID
        entryNumber
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getCounter = /* GraphQL */ `
  query GetCounter($id: ID!) {
    getCounter(id: $id) {
      id
      name
      count
      createdAt
      updatedAt
    }
  }
`;
export const listCounters = /* GraphQL */ `
  query ListCounters(
    $filter: ModelCounterFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCounters(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        count
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const byEntrantNumber = /* GraphQL */ `
  query ByEntrantNumber(
    $entrantNumber: Int
    $sortDirection: ModelSortDirection
    $filter: ModelEntrantFilterInput
    $limit: Int
    $nextToken: String
  ) {
    byEntrantNumber(
      entrantNumber: $entrantNumber
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        firstname
        lastname
        memberOfClub
        contactPhone
        entrantNumber
        checkedIn
        age
        entries {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const byEntrant = /* GraphQL */ `
  query ByEntrant(
    $entrantID: ID
    $sortDirection: ModelSortDirection
    $filter: ModelEntryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    byEntrant(
      entrantID: $entrantID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        scale
        category
        manufacturer
        entrantID
        entryNumber
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const byEntryNumber = /* GraphQL */ `
  query ByEntryNumber(
    $entryNumber: Int
    $sortDirection: ModelSortDirection
    $filter: ModelEntryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    byEntryNumber(
      entryNumber: $entryNumber
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        scale
        category
        manufacturer
        entrantID
        entryNumber
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const byType = /* GraphQL */ `
  query ByType(
    $name: String
    $sortDirection: ModelSortDirection
    $filter: ModelCounterFilterInput
    $limit: Int
    $nextToken: String
  ) {
    byType(
      name: $name
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        count
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
