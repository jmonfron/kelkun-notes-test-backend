import { Module } from '@nestjs/common'
import { UsersResolver } from './users.resolver'
import { UsersService } from './users.service'
import { ProjectsModule } from '../project/projects.module'

@Module({
  imports: [
    ProjectsModule
  ],
  providers: [
    UsersResolver,
    UsersService
  ],
  exports: [UsersService]
})
export class UsersModule {}
