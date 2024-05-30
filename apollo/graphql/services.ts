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
