import { Field, InputType } from '@nestjs/graphql'
import { IsEnum, IsOptional, IsUUID } from 'class-validator'
import { Project } from 'src/database/entities'
import { TaskStatus } from 'src/types/task.types'
import { EntityExist } from 'src/utils/decorators/entity-exist.validator'

@InputType()
export class TaskFiltersInput {

  @Field(() => String, {
    description: `Identifiant du projet`,
    nullable: true
  })
  @IsOptional()
  @IsUUID('4', { message: `L'identifiant du projet doit être un UUID valide.` })
  @EntityExist(Project, { message: `Ce projet n'existe pas` })
  projectId: string

  @Field(() => Boolean, {
    description: `Filtrer par tâches archivées ou non`,
    nullable: true
  })
  @IsOptional()
  archived?: boolean

  @Field(() => TaskStatus, {
    description: `Filtrer par statut de la tâche`,
    nullable: true
  })
  @IsEnum(TaskStatus, { message: `Le statut de la tâche est invalide` })
  @IsOptional()
  status?: TaskStatus
}
