import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'
import { EntityExist } from 'src/utils/decorators/entity-exist.validator'
import { Project } from 'src/database/entities'

@InputType()
export class CreateTaskInput {

  @Field({
    description: `Titre de la tâche`
  })
  @IsString({ message: 'validation.isString' })
  @IsNotEmpty({ message: 'validation.isRequired' })
  title: string


  @Field({
    description: `Description de la tâche`,
    nullable: true
  })
  @IsOptional()
  @IsString({ message: 'validation.isString' })
  description?: string


  @Field(() => String, {
    description: `Identifiant du projet auquel la tâche appartient`,
    nullable: false
  })
  @IsUUID('4', { message: `L'identifiant du projet doit être un UUID valide.` })
  @EntityExist(Project, { message: `Ce projet n'existe pas` })
  projectId: string
}
