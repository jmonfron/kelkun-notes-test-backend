import { Injectable } from '@nestjs/common'
import { CreateProjectInput } from './dto'
import { ProjectFiltersInput } from './dto/input/project-filters.input'
import { Project } from '../../database/entities'

@Injectable()
export class ProjectsService {

  async all (dto: ProjectFiltersInput) {
    const where: any = {}

    if (dto.userId) {
      where.user = { id: dto.userId }
    }

    return Project.find({
      where,
      order: {
        createdAt: 'DESC'
      },
      relations: {
        user: true
      }
    })
  }

  async createProject (dto: CreateProjectInput) {
    return await Project.create({
      ...dto,
      user: {
        id: dto.userId
      }
    }).save()
  }
}
