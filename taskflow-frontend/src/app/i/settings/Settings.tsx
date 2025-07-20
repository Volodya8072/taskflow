'use client'

import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/buttons/Button'
import { Field } from '@/components/ui/fields/Field'

import { TypeUserForm } from '@/types/auth.types'

import { useInitialData } from './useInitialData'
import { useUpdateSettings } from './useUpdateSettings'

export function Settings() {
	const { register, handleSubmit, reset } = useForm<TypeUserForm>({
		mode: 'onChange'
	})

	useInitialData(reset)

	const { isPending, mutate } = useUpdateSettings()

	const onSubmit: SubmitHandler<TypeUserForm> = data => {
		const { password, ...rest } = data

		mutate({
			...rest,
			password: password || undefined
		})
	}

	return (
		<div>
			<form
				className='w-2/4 mt-8'
				onSubmit={handleSubmit(onSubmit)}>
					
					<div>
						<Field
							id='email'
							label='Email: '
							placeholder='Enter email: '
							type='email'
							{...register('email', {
								required: 'Email is required!'
							})}
							extra='mb-4'
						/>

						<Field
							id='name'
							label='Name: '
							placeholder='Enter name: '
							{...register('name')}
							extra='mb-4'
						/>

						<Field
							id='password'
							label='Password: '
							placeholder='Enter password: '
							type='password'
							{...register('password')}
							extra='mb-10'
						/>
					</div>

				<Button
					type='submit'
					disabled={isPending}
				>
					Save
				</Button>
			</form>
		</div>
	)
}
