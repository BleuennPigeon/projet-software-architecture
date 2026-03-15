import { v4 } from 'uuid';
import { PostContent } from '../value-objects/post-content.value-object';
import { PostTitle } from '../value-objects/post-title.value-object';

export type PostStatus = 'draft' | 'waiting' | 'accepted' | 'rejected';

export class PostEntity {
  private _title: PostTitle;
  private _content: PostContent;
  private _authorId: string;
  private _status: PostStatus;
  private _tagIds: string[];

  private constructor(
    readonly id: string,
    title: PostTitle,
    content: PostContent,
    authorId: string,
    status: PostStatus,
    tagIds: string[] = [],
  ) {
    this._title = title;
    this._content = content;
    this._authorId = authorId;
    this._status = status;
    this._tagIds = tagIds;
  }

  public get status() {
    return this._status;
  }

  public get authorId() {
    return this._authorId;
  }

  public get tagIds() {
    return this._tagIds;
  }

  public static reconstitute(input: Record<string, unknown>) {
    return new PostEntity(
      input.id as string,
      new PostTitle(input.title as string),
      new PostContent(input.content as string),
      input.authorId as string,
      input.status as PostStatus,
      Array.isArray(input.tagIds) ? (input.tagIds as string[]) : [],
    );
  }

  public toJSON(): Record<string, unknown> {
    return {
      id: this.id,
      title: this._title.toString(),
      content: this._content.toString(),
      status: this._status,
      authorId: this._authorId,
      tagIds: this._tagIds,
    };
  }

  public static create(
    title: string,
    content: string,
    authorId: string,
    tagIds: string[] = [],
  ): PostEntity {
    return new PostEntity(
      v4(),
      new PostTitle(title),
      new PostContent(content),
      authorId,
      'draft',
      tagIds,
    );
  }

  public update(title?: string, content?: string, tagIds?: string[]) {
    if (title) {
      this._title = new PostTitle(title);
    }

    if (content) {
      this._content = new PostContent(content);
    }

    if (tagIds) {
      this._tagIds = tagIds;
    }
  }
}