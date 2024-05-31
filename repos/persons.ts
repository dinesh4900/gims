import { mutateGql, queryGql } from '~/apollo/config/client'
import {
  createPerson,
  findManyPersons,
  findOnePerson,
  updatePerson
} from '~/apollo/graphql/persons'

export const usePersonsRepo = () => {
  return {
    findAll: async (variable: any) => {
      const result = await queryGql<any, any>(
        GqlEndpoint.Gims,
        findManyPersons,
        variable
      )
      return { result }
    },
    findOne: async (id: string) => {
      const result = await queryGql<any, any>(GqlEndpoint.Gims, findOnePerson, {
        id
      })
      return { result }
    },
    update: async (payload: any) => {
      console.log(payload, '## payload 34')
      try {
        const { data, errors } = await mutateGql(
          GqlEndpoint.Gims,
          updatePerson,
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
    create: async (payload: any) => {
      try {
        const { data, errors } = await mutateGql(
          GqlEndpoint.Gims,
          createPerson,
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
