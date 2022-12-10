import { Controller, Get, Param, Res } from '@nestjs/common';

@Controller()
export class AppController {

  @Get('/storage/images/:fileId')
  public sendImageUrlFromStorage(
    @Param('fileId') fileId: string,
    @Res() res
  ): void {
    res.sendFile(fileId, {
      root: `${process.cwd()}/storage/images`,
    });
  }
}
