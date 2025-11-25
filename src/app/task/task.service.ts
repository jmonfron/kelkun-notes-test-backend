import { Injectable, NotFoundException } from '@nestjs/common'
import { Task } from 'src/database/entities'
import { CreateTaskInput, TaskFiltersInput, UpdateTaskInput } from './dto'
import { isUndefined, omitBy } from 'lodash'
import dayjs from 'dayjs'

@Injectable()
export class TasksService {
  async all (dto: TaskFiltersInput): Promise<Task[]> {
    const { projectId, archived, status } = dto

    const where: any = {}

    if (projectId) {
      where.project = { id: projectId }
    }

    if (archived !== undefined) {
      where.isArchived = archived
    }

    if (status) {
      where.status = status
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
  async createTask (dto: CreateTaskInput): Promise<Task> {
    return await Task.create({
      ...dto,
      project: {
        id: dto.projectId
      }
    }).save()
  }

  async updateTask (dto: UpdateTaskInput): Promise<Task> {
    const task = await Task.findOne({
      where: { id: dto.id }
    })

    if (!task) {
      throw new NotFoundException('Tâche non trouvée')
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

  async archiveOldTasks (): Promise<void> {
    const limit = dayjs().subtract(15, 'minutes').toDate()

    await Task.createQueryBuilder()
      .update(Task)
      .set({ isArchived: true })
      .where('is_archived = :isArchived', { isArchived: false })
      .andWhere('created_at < :limit', { limit })
      .execute()
  }
}
