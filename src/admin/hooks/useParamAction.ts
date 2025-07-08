import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'

export const useParamActions = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const appendParam = useCallback(
    (key: string, value: string) => {
      setSearchParams((previous) => {
        previous.append(key, value)
        return previous
      })
    },
    [setSearchParams]
  )

  const setParam = useCallback(
    (key: string, value: string) => {
      setSearchParams((previous) => {
        previous.set(key, value)
        return previous
      })
    },
    [setSearchParams]
  )

  const clearParams = useCallback(() => {
    setSearchParams({})
  }, [setSearchParams])

  const removeParam = useCallback(
    (key: string) => {
      setSearchParams((previous) => {
        previous.delete(key)
        return previous
      })
    },
    [setSearchParams]
  )

  const handleMakeParams = (key: string, value: string) => {
    if (value) {
      if (searchParams.has(key)) searchParams.set(key, value)
      else searchParams.append(key, value)
    } else searchParams.delete(key)
    setSearchParams(searchParams)
  }

  const searchQuery = Object.fromEntries(searchParams)

  return {
    appendParam,
    setParam,
    clearParams,
    removeParam,
    searchParams,
    handleMakeParams,
    searchQuery
  }
}
