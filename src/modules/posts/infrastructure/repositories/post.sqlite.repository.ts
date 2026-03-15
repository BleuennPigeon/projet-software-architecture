import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { SQLiteTagEntity } from '../../../tags/infrastructure/entities/tag.sqlite.entity';
import { PostEntity } from '../../domain/entities/post.entity';
import { PostRepository } from '../../domain/repositories/post.repository';
import { SQLitePostEntity } from '../entities/post.sqlite.entity';

@Injectable()
export class SQLitePostRepository implements PostRepository {
  constructor(private readonly dataSource: DataSource) {}

  public async getPosts(tagNames?: string[]): Promise<PostEntity[]> {
    const query = this.dataSource.getRepository(SQLitePostEntity).createQueryBuilder('post').leftJoinAndSelect('post.tags', 'tag');

    if (tagNames && tagNames.length > 0) {
      query.where('tag.name IN (:...tagNames)', { tagNames });
    }

    const data = await query.getMany();

    return data.map((post) =>
      PostEntity.reconstitute({ ...post, tagIds: (post.tags ?? []).map((tag) => tag.id) }),
    );
  }

  public async getPostById(id: string): Promise<PostEntity | undefined> {
    const post = await this.dataSource
      .getRepository(SQLitePostEntity)
      .findOne({ where: { id } });

    return post
      ? PostEntity.reconstitute({ ...post, tagIds: (post.tags ?? []).map((tag) => tag.id) }) : undefined;
  }

  public async createPost(input: PostEntity): Promise<void> {
    const tags = input.tagIds.length
      ? await this.dataSource.getRepository(SQLiteTagEntity).findByIds(input.tagIds) : [];

    await this.dataSource.getRepository(SQLitePostEntity).save({ ...input.toJSON(), tags });
  }

  public async updatePost(id: string, input: PostEntity): Promise<void> {
    const existingPost = await this.dataSource
      .getRepository(SQLitePostEntity)
      .findOne({ where: { id } });

    if (!existingPost) {
      return;
    }

    const tags = input.tagIds.length ? await this.dataSource.getRepository(SQLiteTagEntity).findByIds(input.tagIds) : [];

    await this.dataSource.getRepository(SQLitePostEntity).save({ ...existingPost, ...input.toJSON(), id, tags });
  }

  public async deletePost(id: string): Promise<void> {
    await this.dataSource.getRepository(SQLitePostEntity).delete(id);
  }
}