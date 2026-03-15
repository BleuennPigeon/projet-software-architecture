import { TagEntity } from '../entities/tag.entity';

export abstract class TagRepository {
  public abstract getTags(): TagEntity[] | Promise<TagEntity[]>;

  public abstract getTagById(
    id: string,
  ): TagEntity | undefined | Promise<TagEntity | undefined>;

  public abstract getTagByName(
    name: string,
  ): TagEntity | undefined | Promise<TagEntity | undefined>;

  public abstract createTag(input: TagEntity): void | Promise<void>;

  public abstract deleteTag(id: string): void | Promise<void>;
}