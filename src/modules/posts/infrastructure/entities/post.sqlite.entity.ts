import { Column, Entity, PrimaryColumn, JoinTable, ManyToMany } from 'typeorm';
import type { PostStatus } from '../../domain/entities/post.entity';
import { SQLiteTagEntity } from 'src/modules/tags/infrastructure/entities/tag.sqlite.entity';

@Entity('posts')
export class SQLitePostEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  status: PostStatus;

  @Column()
  authorId: string;

  @ManyToMany(() => SQLiteTagEntity, { eager: true })
  @JoinTable()
  tags: SQLiteTagEntity[];
}
