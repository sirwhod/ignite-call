import { Text, styled } from '@ignite-ui/react'

export const FormAnnotation = styled('div', {
  marginTop: '$2',

  [`> ${Text}`]: {
    color: '$gray400',
    '&[data-error=true]': {
      color: '#f75a68',
    },
  },
})
