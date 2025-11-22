import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { ProjectsService } from './projects.service'
import { CreateProjectInput } from './dto'
import { ProjectFiltersInput } from './dto/input/project-filters.input'
import { Project, Task } from '../../database/entities'
import { TaskService } from '../task/task.service'

@Resolver(() => Project)
export class ProjectsResolver {
  constructor (
    private readonly projectsService: ProjectsService,
    private readonly taskService: TaskService
  ) { }

  @Query(() => [Project], {
    description :`Retourne la liste des projets, filtrables par utilisateur`
  })
  async allProjects (
    @Args('dto') dto: ProjectFiltersInput
  ) {
    return this.projectsService.all(dto)
  }

  @Query(() => Project, {
    description :`Retourne un projet par son identifiant`
  })
  async project (
    @Args('id') id: string
  ) {
    return this.projectsService.findById(id)
  }

  @Mutation(() => Project, {
    description :`Permet de créer un nouveau projet`
  })
  async createProject (
    @Args('dto') dto: CreateProjectInput
  ) {
    return this.projectsService.createProject(dto)
  }


  @ResolveField(() => [Task], { nullable: true })
  async tasks (@Parent() project: Project, @Args('archived', { type: () => Boolean, nullable: true }) archived?: boolean) {
    return this.taskService.all({ projectId: project.id, archived })
  }
}
