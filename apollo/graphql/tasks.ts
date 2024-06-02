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
        serviceRequirement {
          _id
          name
          email
          fieldOfService
          requirements
        }
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
      serviceRequirement {
        _id
        name
        email
        fieldOfService
        requirements
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
  mutation updateTask($payload: UpdateTaskInputDto!) {
    updateTask(input: $payload) {
      _id
    }
  }
`
