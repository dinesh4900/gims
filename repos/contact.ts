import { mutateGql } from '~/apollo/config/client'
import { createContact } from '~/apollo/graphql/contact'

export const useContactRepo = () => {
  return {
    createContact: async (payload: any) => {
      try {
        const { data, errors } = await mutateGql(
          GqlEndpoint.Gims,
          createContact,
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
