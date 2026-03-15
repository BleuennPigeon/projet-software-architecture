import { ForbiddenException } from '@nestjs/common';

export class UserCannotManageTagsException extends ForbiddenException {
  constructor() {
    super('User cannot manage tags');
  }
}