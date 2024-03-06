import { Text } from '@ignite-ui/react'
import { FormAnnotation } from './style'

interface FormErrorProps {
  error: boolean
  message?: string
  alt: string
}

export function FormError({ error, message, alt }: FormErrorProps) {
  return (
    <FormAnnotation>
      <Text size="sm" data-error={error}>
        {error ? message : alt}
      </Text>
    </FormAnnotation>
  )
}
