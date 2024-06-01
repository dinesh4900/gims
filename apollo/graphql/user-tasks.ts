export const findAllPersonTasks = gql`
  query findAllPersonTasks($paging: PagingInputDto) {
    findAllPersonTasks(pagingInput: $paging) {
      count
      items {
        dueDate
        description
      }
    }
  }
`
