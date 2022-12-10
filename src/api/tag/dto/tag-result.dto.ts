import { ApiProperty } from '@nestjs/swagger';
import { TagDto } from './tag.dto';

export class TagResultDto {
  @ApiProperty()
  public count: number;

  @ApiProperty({ type: TagDto, isArray: true })
  public data: TagDto[];
}
