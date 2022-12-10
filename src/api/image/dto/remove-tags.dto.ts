import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RemoveTagsDto {
  @ApiProperty()
  @IsString({ each: true })
  public tagsIds: string[];
}
