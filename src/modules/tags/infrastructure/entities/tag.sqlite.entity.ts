import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm';
import { SQLitePostEntity } from '../../../posts/infrastructure/entities/post.sqlite.entity';

@Entity('tags')
export class SQLiteTagEntity {
  @PrimaryColumn()
  id: string;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => SQLitePostEntity, (post) => post.tags)
  posts: SQLitePostEntity[];
}