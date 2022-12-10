import { ApiProperty } from '@nestjs/swagger';

export abstract class AbstractDto {
  @ApiProperty()
  public _id: string;
}
