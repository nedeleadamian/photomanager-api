import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Max, Min } from 'class-validator';

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class SortDto {
  @ApiProperty()
  public field: string;

  @ApiProperty({ enum: SortOrder })
  public order: SortOrder;
}

export class AbstractPaginationDto {
  @ApiPropertyOptional({ type: Number, default: 20 })
  @Min(1)
  @Max(100)
  public limit = 20;

  @ApiPropertyOptional({ type: Number, default: 1 })
  @Min(1)
  public page = 1;
}
