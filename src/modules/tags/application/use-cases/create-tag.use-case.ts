import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../../users/domain/entities/user.entity';
import { TagEntity } from '../../domain/entities/tag.entity';
import { TagAlreadyExistsException } from '../../domain/exceptions/tag-already-exists.exception';
import { UserCannotManageTagsException } from '../../domain/exceptions/user-cannot-manage-tags.exception';
import { TagRepository } from '../../domain/repositories/tag.repository';
import { CreateTagDto } from '../dtos/create-tag.dto';

@Injectable()
export class CreateTagUseCase {
  constructor(private readonly tagRepository: TagRepository) {}

  public async execute(input: CreateTagDto, user: UserEntity): Promise<void> {
    if (!user.permissions.tags.canManage()) {
      throw new UserCannotManageTagsException();
    }

    const existingTag = await this.tagRepository.getTagByName(input.name.trim());

    if (existingTag) {
      throw new TagAlreadyExistsException();
    }

    const tag = TagEntity.create(input.name);

    await this.tagRepository.createTag(tag);
  }
}