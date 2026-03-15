import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../../users/domain/entities/user.entity';
import { UserCannotManageTagsException } from '../../domain/exceptions/user-cannot-manage-tags.exception';
import { TagRepository } from '../../domain/repositories/tag.repository';

@Injectable()
export class DeleteTagUseCase {
  constructor(private readonly tagRepository: TagRepository) {}

  public async execute(id: string, user: UserEntity): Promise<void> {
    if (!user.permissions.tags.canManage()) {
      throw new UserCannotManageTagsException();
    }

    await this.tagRepository.deleteTag(id);
  }
}