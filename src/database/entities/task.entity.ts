import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Tracking } from './common/tracking.entity'
import { Project } from './project.entity'
import { TaskStatus } from 'src/types/task.types'

registerEnumType(TaskStatus, {
  name: 'TaskStatus'
})

@Entity()
@ObjectType()
export class Task extends Tracking {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field(() => String)
  @Column({
    name: 'title',
    nullable: false
  })
  title: string

  @Field(() => String, { nullable: true })
  @Column({ name: 'description', type: 'text', nullable: true })
  description?: string | null

  @Field(() => TaskStatus)
  @Column({
    name: 'status',
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.TODO
  })
  status: TaskStatus

  @Field(() => Boolean)
  @Column({
    name: 'is_archived',
    default: false
  })
  isArchived: boolean

  @Field(() => Project )
  @ManyToOne(() => Project, (p) => p.tasks, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'project_id' })
  project: Project
}
