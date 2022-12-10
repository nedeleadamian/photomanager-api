import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginInputDto {
  @ApiProperty({ example: 'admin@admin.com' })
  @IsNotEmpty()
  @IsEmail()
  public readonly email: string;

  @ApiProperty({ example: 'admin123' })
  @IsNotEmpty()
  @IsString()
  public readonly password: string;
}
