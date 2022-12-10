import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from '@abstraction/dto/abstract.dto';
import { TagDto } from '../../tag/dto/tag.dto';

export class ImageDto extends AbstractDto {
  @ApiProperty()
  public fileName: string;

  @ApiProperty()
  public path: string;

  @ApiProperty()
  public mimetype: string;

  @ApiProperty({ type: TagDto, isArray: true })
  public tags: TagDto[];
}
