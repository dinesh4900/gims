import { useDateFormat } from '@vueuse/core'
import { v4 as uuidv4 } from 'uuid'

export const generateUID = () => {
  return uuidv4()
}

export const getFormattedDate = (
  date: Date,
  format: string = 'DD MMM YYYY'
) => {
  return useDateFormat(new Date(date), format)?.value
}
