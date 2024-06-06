export const createServiceRequirement = gql`
  mutation createServiceRequirement(
    $payload: CreateServiceRequirementInputDto!
  ) {
    createServiceRequirement(input: $payload) {
      _id
      name
    }
  }
`

export const updateServiceRequirement = gql`
  mutation updateServiceRequirement(
    $payload: UpdateServiceRequirementInputDto!
  ) {
    updateServiceRequirement(input: $payload) {
      _id
      name
    }
  }
`

export const findManyServiceRequirements = gql`
  query findManyServiceRequirements($paging: PagingInputDto) {
    findManyServiceRequirements(pagingInput: $paging) {
      count
      items {
        _id
        name
        email
        mobile
        companyName
        designation
        address
        fieldOfService
        requirements
        isAcknowledged
      }
    }
  }
`
export const findServiceRequirementById = gql`
  query findServiceRequirementById($id: String!) {
    findServiceRequirementById(_id: $id) {
      name
      email
      mobile
      address
      fieldOfService
      companyName
      requirements
      designation
    }
  }
`
