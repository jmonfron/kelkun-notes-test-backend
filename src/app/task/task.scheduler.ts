import { Injectable } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { TasksService } from './task.service'

@Injectable()
export class TaskScheduler {
  constructor (private readonly tasksService: TasksService) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async handleCron () {
    await this.tasksService.archiveOldTasks()
  }
}
