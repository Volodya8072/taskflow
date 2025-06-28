import { Transform } from 'class-transformer'
import { IsBoolean, IsDateString, IsEnum, IsOptional, IsString } from 'class-validator'
import { Priority } from 'generated/prisma'


export class TaskDto {
	@IsString()
	@IsOptional()
	name: string

	@IsBoolean()
	@IsOptional()
	isCompleted?: boolean

	@IsString()
	@IsOptional()
	@IsDateString()
	createdAt?: string

	@IsEnum(Priority)
	@IsOptional()
	@Transform(({ value }) => ('' + value).toLowerCase())
	priority?: Priority
}
