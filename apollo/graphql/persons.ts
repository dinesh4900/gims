export const createPerson = gql`
  mutation createPerson($payload: CreateUserInputDto!) {
    createPerson(input: $payload) {
      _id
      name
    }
  }
`
export const updatePerson = gql`
  mutation updatePerson($payload: UpdateUserInputDto!) {
    updatePerson(input: $payload) {
      _id
      name
    }
  }
`

export const findManyPersons = gql`
  query findManyPersons($paging: PagingInputDto) {
    findManyPersons(pagingInput: $paging) {
      count
      items {
        _id
        name
        email
        mobile
      }
    }
  }
`
export const findOnePerson = gql`
  query findPersonById($id: String!) {
    findPersonById(_id: $id) {
      name
      email
      mobile
      password
    }
  }
`
