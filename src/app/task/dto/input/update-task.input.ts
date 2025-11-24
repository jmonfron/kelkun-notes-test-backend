import { Field, InputType } from '@nestjs/graphql'
import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator'
import { TaskStatus } from 'src/types/task.types'

@InputType()
export class UpdateTaskInput {

  @Field(() => String, {
    description: `Identifiant de la tache`
  })
  @IsUUID('4', { message: `L'identifiant de la tache doit être un UUID valide.` })
  id: string

  @Field({
    description: `Titre de la tache`,
    nullable: true
  })
  @IsOptional()
  @IsString({ message: 'validation.isString' })
  title?: string

  @Field({
    description: `Description de la tache`,
    nullable: true
  })
  @IsOptional()
  @IsString({ message: 'validation.isString' })
  description?: string

  @Field(() => TaskStatus, {
    description: `Statut de la tache`,
    nullable: true
  })
  @IsOptional()
  @IsEnum(TaskStatus, { message: 'Le statut est invalide.' })
  status?: TaskStatus
}
