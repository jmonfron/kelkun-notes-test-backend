import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { TaskService } from './task.service'
import { Task } from 'src/database/entities'
import { CreateTaskInput } from 'src/app/project/dto/input/task/create-task.input'
import { TaskFiltersInput } from '../project/dto/input/task/task-filters.input'
import { UpdateTaskInput } from '../project/dto/input/task/update-task.input'

@Resolver(() => Task)
export class TaskResolver {
  constructor (private readonly taskService: TaskService) {}

  @Query(() => [Task], {
    description: `Retourne la liste des tâches`
  })
  async allTasks (@Args('dto') dto: TaskFiltersInput ) {
    return this.taskService.all(dto)
  }

  @Mutation(() => Task, {
    description: `Permet de créer une nouvelle tâche`
  })
  async createTask (@Args('dto') dto: CreateTaskInput) {
    return this.taskService.createTask(dto)
  }

  @Mutation(() => Task, {
    description: `Permet de mettre à jour une tâche`
  })
  async updateTask (@Args('dto') dto: UpdateTaskInput) {
    return this.taskService.updateTask(dto)
  }

  @Mutation(() => Boolean, {
    description: `Permet de supprimer une tâche`
  })
  async deleteTask (@Args('id') id: string) {
    return this.taskService.deleteTask(id)
  }

}
