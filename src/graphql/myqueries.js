export const listEntrantsWithEntries = /* GraphQL */ `
  query ListEntrantsWithEntries(
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
        age
        checkedIn
        entries {
          items {
            id
            name
            entryNumber
            scale
            manufacturer
            category
          }
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
