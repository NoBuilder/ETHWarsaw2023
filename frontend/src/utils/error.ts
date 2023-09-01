import { AxiosError } from 'axios'
import { z } from 'zod'

type MappedErrors = Record<number, string>

export const getErrorMessage = (
  error: unknown,
  mappedErrors: MappedErrors = {}
) => {
  if (error instanceof z.ZodError) {
    return error.errors.map(error => error.message).join('\n')
  }
  if (error instanceof AxiosError) {
    if (
      mappedErrors &&
      error.response?.status &&
      mappedErrors[error.response?.status]
    ) {
      return mappedErrors[error.response?.status]
    }
    if (error.response?.status === 401) {
      return 'Authentication Required. Please login.'
    }
    if (error.response?.status === 500) {
      return 'Internal Server Error. Please refresh the page or try again later.'
    }
    if (error.response?.data) {
      return error.response.data
    }
  }
  if (error instanceof Error) {
    return error.message
  }

  return 'Oops! Something went wrong.'
}
