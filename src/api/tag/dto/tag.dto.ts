import { AbstractDto } from '@abstraction/dto/abstract.dto';
import { ApiProperty } from '@nestjs/swagger';

export class TagDto extends AbstractDto {
@ApiProperty()
  public name: string;

@ApiProperty()
  public extension: boolean;
}
