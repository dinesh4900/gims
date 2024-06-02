export const findManyTasks = gql`
  query findManyTasks($paging: PagingInputDto) {
    findManyTasks(pagingInput: $paging) {
      count
      items {
        _id
        title
        dueDate
        description
        status
        assignedTo {
          _id
          email
          name
        }
      }
    }
  }
`

export const findTaskById = gql`
  query findTaskById($id: String!) {
    findTaskById(_id: $id) {
      _id
      assignedTo {
        email
        _id
        name
      }
      title
      status
      dueDate
      description
    }
  }
`
export const createTask = gql`
  mutation createTask($payload: CreateTaskInputDto!) {
    createTask(input: $payload) {
      _id
    }
  }
`

export const updateTask = gql`
  mutation updateTask($input: UpdateTaskInputDto!) {
    updateTask(input: $input) {
      _id
    }
  }
`
