import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { LocaleEnum } from '../../constants';

export abstract class AbstractTranslationDto {
  @ApiProperty({ enum: LocaleEnum })
  public locale: LocaleEnum;
  @ApiPropertyOptional()
  public createdAt?: string | Date;
  @ApiPropertyOptional()
  public updatedAt?: string | Date;
}
