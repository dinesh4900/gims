import { useApolloClient } from '@vue/apollo-composable'
import { OperationVariables, FetchPolicy } from '@apollo/client/core'
import { DocumentNode } from 'graphql'
import { GqlEndpoint } from '~/utils/enum'

export function getClient(clientId: GqlEndpoint) {
  const { resolveClient } = useApolloClient()
  return resolveClient(clientId)
}

export async function queryGql<TData, TVariables extends OperationVariables>(
  clientId: GqlEndpoint = GqlEndpoint.Gims,
  query: DocumentNode,
  variables?: TVariables,
  fetchPolicy: FetchPolicy = 'network-only',
  pollInterval?: number
) {
  const client = getClient(clientId)
  return await client.query<TData, TVariables>({
    query,
    ...(variables ? { variables } : {}),
    fetchPolicy,
    pollInterval
  })
}

export async function mutateGql<TData, TVariables extends OperationVariables>(
  clientId: GqlEndpoint = GqlEndpoint.Gims,
  mutation: DocumentNode,
  variables: TVariables
) {
  const client = getClient(clientId)
  return await client.mutate<TData, TVariables>({
    mutation,
    variables
  })
}

export async function writeToCache<
  TData,
  TVariables extends OperationVariables
>(
  clientId: GqlEndpoint = GqlEndpoint.Gims,
  query: DocumentNode,
  data: TData,
  variables?: TVariables
) {
  const client = getClient(clientId)
  try {
    await client.writeQuery<TData, TVariables>({
      query,
      data,
      variables
    })
  } catch (error) {
    console.error('Error', error)
  }
}

export async function writeFragmentToCache<TData>(
  clientId: GqlEndpoint = GqlEndpoint.Gims,
  fragment: DocumentNode,
  data: TData,
  id: string
) {
  const client = getClient(clientId)
  try {
    await client.writeFragment<TData>({
      id,
      fragment,
      data
    })
  } catch (error) {
    console.error('Error:', error)
  }
}

export async function mutateGqlWithUpdateCache<
  TData,
  TVariables extends OperationVariables,
  TQueryVariables extends OperationVariables
>(
  clientId: GqlEndpoint = GqlEndpoint.Gims,
  mutation: DocumentNode,
  variables: TVariables,
  query: DocumentNode,
  queryVariables: TQueryVariables
) {
  const client = getClient(clientId)
  return await client.mutate<TData, TVariables>({
    mutation,
    variables,
    update: (cache) => {
      const data = cache.readQuery({ query, variables: queryVariables })
      cache.writeQuery({
        query,
        variables: queryVariables,
        data
      })
    }
  })
}
