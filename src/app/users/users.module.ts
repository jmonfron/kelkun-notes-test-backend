import { Module } from '@nestjs/common'
import { UsersResolver } from './users.resolver'
import { UsersService } from './users.service'
import { ProjectsService } from '../project/projects.service'

@Module({
  providers: [
    UsersResolver,
    UsersService,
    ProjectsService
  ],
  exports: [UsersService]
})
export class UsersModule {}
