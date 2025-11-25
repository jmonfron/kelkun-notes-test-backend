import { Module } from '@nestjs/common'
import { TasksService } from './task.service'
import { TasksResolver } from './task.resolver'
import { TaskScheduler } from './task.scheduler'

@Module({
  providers: [TasksResolver, TasksService, TaskScheduler],
  exports: [TasksService]
})
export class TaskModule {}
