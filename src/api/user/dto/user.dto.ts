import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from '@abstraction/dto/abstract.dto';

export class UserDto extends AbstractDto {
  @ApiProperty()
  public email: string;
}
