export type WithClassName<T = object> = {
  className?: string
} & T

export type Undefinedable<T> = T | undefined
export type Nullable<T> = T | null
