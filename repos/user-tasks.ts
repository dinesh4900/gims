import { findAllPersonTasks } from '../apollo/graphql/user-tasks'
import { queryGql } from '~/apollo/config/client'

export const useUserTaskRepo = () => {
  return {
    findAll: async (variable: any) => {
      const result = await queryGql<any, any>(
        GqlEndpoint.Gims,
        findAllPersonTasks,
        variable
      )
      return { result }
    }
  }
}
