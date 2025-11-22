import { Module } from '@nestjs/common'
import { ProjectsResolver } from './projects.resolver'
import { ProjectsService } from './projects.service'
import { TaskService } from '../task/task.service'

@Module({
  providers: [
    ProjectsResolver,
    ProjectsService,
    TaskService
  ],
  exports: [ProjectsService]
})
export class ProjectsModule {}
