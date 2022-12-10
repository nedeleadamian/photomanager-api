import { ApiProperty } from '@nestjs/swagger';
import { ImageDto } from './image.dto';

export class ImageResultDto {
  @ApiProperty()
  public count: number;

  @ApiProperty({ type: ImageDto, isArray: true })
  public data: ImageDto[];
}
