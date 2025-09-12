'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useForm, SubmitHandler } from 'react-hook-form'
import { toast } from 'sonner'

import { Heading } from '@/components/ui/Heading'
import { Button } from '@/components/ui/buttons/Button'
import { Field } from '@/components/ui/fields/Field'

import { IAuthForm } from '@/types/auth.types'
import { DASHBOARD_PAGES } from '@/config/pages-url.config'
import { authService } from '@/services/auth.service'

export function Auth() {
  const { register, handleSubmit, reset } = useForm<IAuthForm>({
    mode: 'onChange'
  })

  const { push } = useRouter()

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: IAuthForm & { type: 'login' | 'register' }) => {
      const response = await authService.main(data.type, data)
      return response.data
    },
    onSuccess() {
      toast.success('Successfully logged in!')
      reset()
      push(DASHBOARD_PAGES.HOME)
    },
    onError(error: any) {
      toast.error(error?.response?.data?.message || 'Something went wrong!')
    }
  })

  const onLogin: SubmitHandler<IAuthForm> = (data) => {
    mutate({ ...data, type: 'login' })
  }

  const onRegister: SubmitHandler<IAuthForm> = (data) => {
    mutate({ ...data, type: 'register' })
  }

  return (
    <div className="flex min-h-screen">
      <form className="w-45 md:w-1/4 m-auto shadow bg-[#262b2a] rounded-xl p-6 md:p-10">
        <Heading title="Auth" />

        <Field
          id="email"
          label="Email:"
          placeholder="Enter email:"
          type="email"
          extra="mb-4"
          {...register('email', { required: 'Email is required!' })}
        />

        <Field
          id="password"
          label="Password:"
          placeholder="Enter password:"
          type="password"
          extra="mb-6"
          {...register('password', { required: 'Password is required!' })}
        />

        <div className="flex items-center gap-5 justify-center mb-4">
          <Button type="button" onClick={handleSubmit(onLogin)} disabled={isPending}>
            Login
          </Button>
          <Button type="button" onClick={handleSubmit(onRegister)} disabled={isPending}>
            Register
          </Button>
        </div>
      </form>
    </div>
  )
}
