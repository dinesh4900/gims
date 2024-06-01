export const createContact = gql`
  mutation createContact($payload: CreateContactInputDto!) {
    createContact(input: $payload) {
      _id
      firstName
    }
  }
`

export const findManyContacts = gql`
  query findManyContacts($paging: PagingInputDto) {
    findManyContacts(pagingInput: $paging) {
      count
      items {
        _id
        firstName
        lastName
        email
        mobile
        description
      }
    }
  }
`
export const findContactById = gql`
  query findContactById($id: String!) {
    findContactById(_id: $id) {
      _id
      firstName
      lastName
      email
      mobile
      description
    }
  }
`
