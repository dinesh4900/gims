export const useUserProfile = (variables = {}, clientId = 'gims') => {
  const queryString = gql`
    query getUserProfile {
      getUserProfile {
        _id
        name
        email
      }
    }
  `

  const { result, loading, error, query, fetchMore, refetch } = useQuery(
    queryString,
    variables,
    {
      clientId,
      fetchPolicy: 'network-only'
    }
  )
  return {
    result,
    loading,
    error,
    document,
    query,
    fetchMore,
    refetch
  }
}
