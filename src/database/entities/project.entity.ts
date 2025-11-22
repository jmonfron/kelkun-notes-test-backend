import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Tracking } from './common/tracking.entity'
import { User } from './user.entity'
import { Task } from './task.entity'

@Entity()
@ObjectType()
export class Project extends Tracking {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field(() => String)
  @Column({ name: 'name' })
  name: string

  @Field(() => User)
  @ManyToOne(() => User, (u) => u.projects, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User

  @Field(() => [Task], { nullable: true })
  @OneToMany(() => Task, (t) => t.project)
  tasks?: Task[]
}
