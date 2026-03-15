import { ConflictException } from '@nestjs/common';

export class TagAlreadyExistsException extends ConflictException {
  constructor() {
    super('Tag already exists');
  }
}