import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiImplicitFile } from '@nestjs/swagger/dist/decorators/api-implicit-file.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { AUTH_GUARD, AuthUser, IAuthUser } from '@core/auth';
import { AbstractPaginationDto } from '@abstraction/dto/abstract-pagination.dto';
import { ImageResultDto } from './dto/image-result.dto';
import { ImageService } from './image.service';
import { AddTagsDto } from './dto/add-tags.dto';
import { RemoveTagsDto } from './dto/remove-tags.dto';

@ApiBearerAuth()
@UseGuards(AUTH_GUARD)
@ApiTags('image')
@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get()
  @ApiResponse({ type: ImageResultDto, isArray: false })
  public getImages(
    @AuthUser() authUser: IAuthUser,
    @Query() query: AbstractPaginationDto,
  ): Promise<ImageResultDto> {
    return this.imageService.findImages(authUser._id, query);
  }

  @ApiImplicitFile({ name: 'image', required: true })
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  public async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @AuthUser() authUser: IAuthUser,
  ): Promise<object> {
    console.log(file);
    return this.imageService.uploadImage(authUser, file);
  }

  @Delete('/:imageId')
  public async deleteImage(
    @AuthUser() authUser: IAuthUser,
    @Param('imageId') imageId: string,
  ): Promise<{ success: boolean }> {
    return this.imageService.deleteImage(imageId, authUser);
  }

  @Post('/:imageId/add-tags')
  public addTags(
    @Param('imageId') imageId: string,
    @AuthUser() authUser: IAuthUser,
    @Body() body: AddTagsDto,
  ): Promise<{ success: boolean }> {
    return this.imageService.addTags(imageId, authUser, body);
  }

  @Post('/:imageId/remove-tags')
  public deleteTags(
    @Param('imageId') imageId: string,
    @AuthUser() authUser: IAuthUser,
    @Body() body: RemoveTagsDto,
  ): Promise<{ success: boolean }> {
    return this.imageService.removeTags(imageId, authUser, body);
  }
}
