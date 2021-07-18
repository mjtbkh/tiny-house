import React, { useState, useEffect, useCallback } from 'react'
import server from './server'

interface State<TData> {
  data: TData | null
  loading: Boolean
  error: Boolean
}

type MutationTuple<TData, TVariables> = [
  (variables?: TVariables | undefined) => Promise<void>,
  State<TData>
]

const useMutation = <TData = any, TVariables = any>(
  mutation: string
): MutationTuple<TData, TVariables> => {
  const [state, setState] = useState<State<TData>>({
    data: null,
    loading: false,
    error: false
  })

  const mutate = async (variables?: TVariables) => {
    try {
      setState({
        data: null,
        loading: true,
        error: false
      })
      const { data, errors } = await server.fetch<TData, TVariables>({
        query: mutation,
        variables
      })

      if (errors && errors.length) throw new Error(errors[0].message)
      setState({ data, loading: false, error: false })
    } catch (e) {
      setState({
        data: null,
        loading: false,
        error: true
      })
      throw new Error(e)
    }
  }

  return [mutate, state]
}

export default useMutation
