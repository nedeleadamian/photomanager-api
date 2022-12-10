import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Query } from '@nestjs/common';
import { AbstractPaginationDto } from '@abstraction/dto/abstract-pagination.dto';
import { TagResultDto } from './dto/tag-result.dto';
import { TagService } from './tag.service';

@ApiTags('tag')
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {
  }

  @Get()
  @ApiResponse({ type: TagResultDto, isArray: false })
  public getImages(
    @Query() query: AbstractPaginationDto,
  ): Promise<TagResultDto> {
    return this.tagService.findTags(query);
  }
}
