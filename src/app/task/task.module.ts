import { Module } from '@nestjs/common'
import { TasksService } from './task.service'
import { TasksResolver } from './task.resolver'

@Module({
  providers: [TasksResolver, TasksService],
  exports: [TasksService]
})
export class TaskModule {}
