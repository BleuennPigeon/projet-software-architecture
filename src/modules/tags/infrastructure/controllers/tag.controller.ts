import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Requester } from '../../../shared/auth/infrastructure/decorators/requester.decorator';
import { JwtAuthGuard } from '../../../shared/auth/infrastructure/guards/jwt-auth.guard';
import { UserEntity } from '../../../users/domain/entities/user.entity';
import { CreateTagDto } from '../../application/dtos/create-tag.dto';
import { CreateTagUseCase } from '../../application/use-cases/create-tag.use-case';
import { DeleteTagUseCase } from '../../application/use-cases/delete-tag.use-case';
import { GetTagsUseCase } from '../../application/use-cases/get-tags.use-case';

@ApiTags('Tag')
@Controller('tags')
export class TagController {
  constructor(
    private readonly createTagUseCase: CreateTagUseCase,
    private readonly deleteTagUseCase: DeleteTagUseCase,
    private readonly getTagsUseCase: GetTagsUseCase,
  ) {}

  @Get()
  public async getTags() {
    const tags = await this.getTagsUseCase.execute();

    return tags.map((tag) => tag.toJSON());
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  public async createTag(
    @Requester() user: UserEntity,
    @Body() input: CreateTagDto,
  ) {
    return this.createTagUseCase.execute(input, user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  public async deleteTag(
    @Requester() user: UserEntity,
    @Param('id') id: string,
  ) {
    return this.deleteTagUseCase.execute(id, user);
  }
}