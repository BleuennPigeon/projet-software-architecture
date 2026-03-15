import { v4 } from 'uuid';

export class TagEntity {
  private _name: string;

  private constructor(
    public readonly id: string,
    name: string,
  ) {
    this._name = name.trim();
  }

  public static create(name: string): TagEntity {
    return new TagEntity(v4(), name);
  }

  public static reconstitute(input: Record<string, unknown>): TagEntity {
    return new TagEntity(input.id as string, input.name as string);
  }

  public toJSON() {
    return {
      id: this.id,
      name: this._name,
    };
  }

  public get name(): string {
    return this._name;
  }
}