import { ApiProperty } from '@nestjs/swagger';

export abstract class AbstractFindManyResultDto<T> {
  @ApiProperty()
  items: T[];

  @ApiProperty()
  count: number;
}