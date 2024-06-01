import {
  createServiceRequirement,
  findManyServiceRequirements,
  findServiceRequirementById
} from '../apollo/graphql/services'
import { mutateGql, queryGql } from '~/apollo/config/client'

export const useServicesRepo = () => {
  return {
    createServiceReq: async (payload: any) => {
      try {
        const { data, errors } = await mutateGql(
          GqlEndpoint.Gims,
          createServiceRequirement,
          payload
        )
        if (errors) {
          console.log('error', errors)
        }
        return data
      } catch (e) {
        console.log('error', e)
      }
    },
    findAll: async (variable: any) => {
      const result = await queryGql<any, any>(
        GqlEndpoint.Gims,
        findManyServiceRequirements,
        variable
      )
      return { result }
    },
    findOne: async (id: string) => {
      const result = await queryGql<any, any>(
        GqlEndpoint.Gims,
        findServiceRequirementById,
        {
          id
        }
      )
      return { result }
    }
  }
}
