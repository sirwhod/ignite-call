import { Button, Heading, MultiStep, Text, TextInput } from '@ignite-ui/react'
import { Container, Form, Header } from './styles'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormError } from '../home/components/FormError'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { api } from '@/src/lib/axios'
import { AxiosError } from 'axios'

const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, {
      message: 'O usuário precisa ter pelo menos 3 letras.',
    })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'O usuário pode ter apenas letras e hifens.',
    })
    .transform((username) => username.toLowerCase()),
  name: z.string().min(3, {
    message: 'O nome precisa ter pelo menos 3 letras.',
  }),
})

type RegisterFormData = z.infer<typeof registerFormSchema>

export default function Register() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  })

  const router = useRouter()

  useEffect(() => {
    if (router.query.username) {
      setValue('username', String(router.query.username))
    }
  }, [router.query?.username, setValue])

  async function handleRegister(data: RegisterFormData) {
    try {
      await api.post('/users', {
        name: data.name,
        username: data.username,
      })

      await router.push('/register/connect-calendar')
    } catch (err) {
      if (err instanceof AxiosError && err?.response?.data?.message) {
        alert(err?.response?.data?.message)
        return
      }

      console.log(err)
    }
  }

  return (
    <Container>
      <Header>
        <Heading as="strong">Bem-vindo ao Ignite Call!</Heading>
        <Text>
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </Text>
        <MultiStep size={4} currentStep={1} />
      </Header>

      <Form as="form" onSubmit={handleSubmit(handleRegister)}>
        <label>
          <Text size="sm">Nome de usuário</Text>
          <TextInput
            crossOrigin={true}
            prefix="ignite.com/"
            type="text"
            placeholder="seu-usuário"
            {...register('username')}
          />
          <FormError
            error={!!errors.username}
            message={errors.username?.message}
            alt="Digite o nome de usuário desejado."
          />
        </label>
        <label>
          <Text size="sm">Nome completo</Text>
          <TextInput
            crossOrigin={true}
            type="text"
            placeholder="seu nome"
            {...register('name')}
          />
          <FormError
            error={!!errors.name}
            message={errors.name?.message}
            alt="Digite o seu nome completo."
          />
        </label>

        <Button type="submit" disabled={isSubmitting}>
          Próximo passo <ArrowRight />
        </Button>
      </Form>
    </Container>
  )
}
