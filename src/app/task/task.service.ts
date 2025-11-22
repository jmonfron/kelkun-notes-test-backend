import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateTaskInput } from 'src/app/project/dto/input/task/create-task.input'
import { Task } from 'src/database/entities'
import { UpdateTaskInput } from '../project/dto/input/task/update-task.input'
import { TaskFiltersInput } from '../project/dto/input/task/task-filters.input'
import { isUndefined, omitBy } from 'lodash'

@Injectable()
export class TaskService {
  async all (dto: TaskFiltersInput) {
    const where: any = {}
    if (dto.projectId) {
      where.project = { id: dto.projectId }
    }

    return Task.find({
      where,
      order: {
        createdAt: 'DESC'
      },
      relations: {
        project: true
      }
    })

  }
  async createTask (dto: CreateTaskInput) {
    return await Task.create({
      ...dto,
      project: {
        id: dto.projectId
      }
    }).save()
  }

  async updateTask (dto: UpdateTaskInput) {
    const task = await Task.findOne({
      where: { id: dto.id }
    })

    if (!task) {
      throw new NotFoundException('Tache non trouvée')
    }

    const dataToUpdate = omitBy({
      title: dto.title,
      description: dto.description,
      status: dto.status
    }, isUndefined)

    Object.assign(task, dataToUpdate)

    await task.save()

    return task
  }
}
