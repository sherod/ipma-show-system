/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createEntrant = /* GraphQL */ `
  mutation CreateEntrant(
    $input: CreateEntrantInput!
    $condition: ModelEntrantConditionInput
  ) {
    createEntrant(input: $input, condition: $condition) {
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
export const updateEntrant = /* GraphQL */ `
  mutation UpdateEntrant(
    $input: UpdateEntrantInput!
    $condition: ModelEntrantConditionInput
  ) {
    updateEntrant(input: $input, condition: $condition) {
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
export const deleteEntrant = /* GraphQL */ `
  mutation DeleteEntrant(
    $input: DeleteEntrantInput!
    $condition: ModelEntrantConditionInput
  ) {
    deleteEntrant(input: $input, condition: $condition) {
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
export const createEntry = /* GraphQL */ `
  mutation CreateEntry(
    $input: CreateEntryInput!
    $condition: ModelEntryConditionInput
  ) {
    createEntry(input: $input, condition: $condition) {
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
export const updateEntry = /* GraphQL */ `
  mutation UpdateEntry(
    $input: UpdateEntryInput!
    $condition: ModelEntryConditionInput
  ) {
    updateEntry(input: $input, condition: $condition) {
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
export const deleteEntry = /* GraphQL */ `
  mutation DeleteEntry(
    $input: DeleteEntryInput!
    $condition: ModelEntryConditionInput
  ) {
    deleteEntry(input: $input, condition: $condition) {
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
export const createCounter = /* GraphQL */ `
  mutation CreateCounter(
    $input: CreateCounterInput!
    $condition: ModelCounterConditionInput
  ) {
    createCounter(input: $input, condition: $condition) {
      id
      name
      count
      createdAt
      updatedAt
    }
  }
`;
export const updateCounter = /* GraphQL */ `
  mutation UpdateCounter(
    $input: UpdateCounterInput!
    $condition: ModelCounterConditionInput
  ) {
    updateCounter(input: $input, condition: $condition) {
      id
      name
      count
      createdAt
      updatedAt
    }
  }
`;
export const deleteCounter = /* GraphQL */ `
  mutation DeleteCounter(
    $input: DeleteCounterInput!
    $condition: ModelCounterConditionInput
  ) {
    deleteCounter(input: $input, condition: $condition) {
      id
      name
      count
      createdAt
      updatedAt
    }
  }
`;
