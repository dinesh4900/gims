import { createServiceRequirement } from '../apollo/graphql/services'
import { mutateGql } from '~/apollo/config/client'

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
    }
  }
}
