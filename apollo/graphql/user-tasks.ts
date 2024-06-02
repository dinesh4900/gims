export const findAllPersonTasks = gql`
  query findAllPersonTasks($paging: PagingInputDto) {
    findAllPersonTasks(pagingInput: $paging) {
      count
      items {
        _id
        title
        status
        dueDate
        description
      }
    }
  }
`
