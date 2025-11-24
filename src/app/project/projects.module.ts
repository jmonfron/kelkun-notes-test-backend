import { Module } from '@nestjs/common'
import { ProjectsResolver } from './projects.resolver'
import { ProjectsService } from './projects.service'
import { TaskModule } from '../task/task.module'

@Module({
  imports: [
    TaskModule
  ],
  providers: [
    ProjectsResolver,
    ProjectsService
  ],
  exports: [ProjectsService]
})
export class ProjectsModule {}
