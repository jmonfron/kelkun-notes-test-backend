import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { TasksService } from './task.service'
import { Task } from 'src/database/entities'
import { CreateTaskInput, TaskFiltersInput, UpdateTaskInput } from './dto'

@Resolver(() => Task)
export class TasksResolver {
  constructor (private readonly taskService: TasksService) {}

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
}
