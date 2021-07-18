import { useState, useEffect, useCallback } from 'react'
import server from './server'

interface State<TData> {
  data: TData | null
  loading: Boolean
  error: Boolean
}

interface QueryResult<TData> extends State<TData> {
  refetch: () => void
}

const useQuery = <TData = any>(query: string): QueryResult<TData> => {
  const [state, setState] = useState<State<TData>>({
    data: null,
    loading: false,
    error: false
  })

  const fetch = useCallback(() => {
    const fetchAPI = async () => {
      try {
        setState({
          data: null,
          loading: true,
          error: false
        })
        const { data, errors } = await server.fetch<TData>({ query })

        if (errors && errors.length) throw new Error(errors[0].message)

        setState({
          data,
          loading: false,
          error: false
        })
      } catch (e) {
        setState({
          data: null,
          loading: false,
          error: true
        })
        throw new Error(e)
      }
    }

    fetchAPI()
  }, [query])

  useEffect(() => {
    fetch()
  }, [fetch])

  return { ...state, refetch: fetch }
}

export default useQuery
