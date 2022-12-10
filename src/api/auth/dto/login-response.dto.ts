import { ApiProperty } from '@nestjs/swagger';
import { TokenDto } from './token.dto';

export class LoginResponseDto {
  @ApiProperty()
  public _id: string;
  @ApiProperty()
  public email: string;
  
  @ApiProperty()
  public tokens: TokenDto;
}
