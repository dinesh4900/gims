import { mutateGql, queryGql } from '~/apollo/config/client'
import {
  createTask,
  findManyTasks,
  findTaskById,
  updateTask
} from '~/apollo/graphql/tasks'

export const useTasksRepo = () => {
  return {
    findAll: async (variable: any) => {
      const result = await queryGql<any, any>(
        GqlEndpoint.Gims,
        findManyTasks,
        variable
      )
      return { result }
    },
    findOne: async (id: string) => {
      const result = await queryGql<any, any>(GqlEndpoint.Gims, findTaskById, {
        id
      })
      return { result }
    },
    update: async (payload: any) => {
      try {
        const { data, errors } = await mutateGql(GqlEndpoint.Gims, updateTask, {
          payload
        })
        if (errors) {
          console.log('error', errors)
        }
        return data
      } catch (e) {
        console.log('error', e)
      }
    },
    create: async (payload: any) => {
      try {
        const { data, errors } = await mutateGql(
          GqlEndpoint.Gims,
          createTask,
          payload
        )
        if (errors) {
          console.log('error', errors)
        }
        return data
      } catch (e) {
        console.log('error', e)
      }
    }
  }
}
