export const createContact = gql`
  mutation createContact($payload: CreateContactInputDto!) {
    createContact(input: $payload) {
      _id
      firstName
    }
  }
`
