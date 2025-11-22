import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { Project, User } from 'src/database/entities'
import { UsersService } from './users.service'
import { CreateUserInput } from './dto'
import { ProjectsService } from '../project/projects.service'

@Resolver(() => User)
export class UsersResolver {
  constructor (
    private readonly userService: UsersService,
    private readonly projectService: ProjectsService
  ) { }

  @Query(() => [User], {
    description :`Retourne la liste des utilisateurs`
  })
  async allUsers () {
    return this.userService.all()
  }

  @Mutation(() => User, {
    description :`Permet de créer un nouvel utilisateur`
  })
  async createUser (
    @Args('dto') dto: CreateUserInput
  ) {
    return this.userService.createUser(dto)
  }

  @ResolveField(() => [Project], { nullable: true })
  async projects (@Parent() user: User) {
    return this.projectService.all({ userId: user.id })
  }

}
