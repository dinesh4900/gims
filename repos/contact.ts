import { mutateGql, queryGql } from '~/apollo/config/client'
import {
  createContact,
  findContactById,
  findManyContacts,
  updateContact
} from '~/apollo/graphql/contact'

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
    },
    updateContact: async (payload: any) => {
      try {
        const { data, errors } = await mutateGql(
          GqlEndpoint.Gims,
          updateContact,
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
        findManyContacts,
        variable
      )
      return { result }
    },
    findOne: async (id: string) => {
      const result = await queryGql<any, any>(
        GqlEndpoint.Gims,
        findContactById,
        {
          id
        }
      )
      return { result }
    }
  }
}
