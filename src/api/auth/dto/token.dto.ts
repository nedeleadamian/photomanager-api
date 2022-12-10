import { ApiProperty } from '@nestjs/swagger';

export class TokenDto {
  @ApiProperty()
  public accessToken: string;
  @ApiProperty()
  public refreshToken?: string;
}
