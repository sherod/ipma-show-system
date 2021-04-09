/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateEntrant = /* GraphQL */ `
  subscription OnCreateEntrant($owner: String) {
    onCreateEntrant(owner: $owner) {
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
export const onUpdateEntrant = /* GraphQL */ `
  subscription OnUpdateEntrant($owner: String) {
    onUpdateEntrant(owner: $owner) {
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
export const onDeleteEntrant = /* GraphQL */ `
  subscription OnDeleteEntrant($owner: String) {
    onDeleteEntrant(owner: $owner) {
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
export const onCreateEntry = /* GraphQL */ `
  subscription OnCreateEntry($owner: String) {
    onCreateEntry(owner: $owner) {
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
export const onUpdateEntry = /* GraphQL */ `
  subscription OnUpdateEntry($owner: String) {
    onUpdateEntry(owner: $owner) {
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
export const onDeleteEntry = /* GraphQL */ `
  subscription OnDeleteEntry($owner: String) {
    onDeleteEntry(owner: $owner) {
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
export const onCreateCounter = /* GraphQL */ `
  subscription OnCreateCounter {
    onCreateCounter {
      id
      name
      count
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateCounter = /* GraphQL */ `
  subscription OnUpdateCounter {
    onUpdateCounter {
      id
      name
      count
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteCounter = /* GraphQL */ `
  subscription OnDeleteCounter {
    onDeleteCounter {
      id
      name
      count
      createdAt
      updatedAt
    }
  }
`;
