import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginInputDto } from './dto/login-input.dto';
import { RegisterInputDto } from './dto/register-input.dto';
import { LoginResponseDto } from './dto/login-response.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({ type: LoginResponseDto, isArray: false })
  @Post('login')
  public login(
    @Body() { email, password }: LoginInputDto,
  ): Promise<LoginResponseDto> {
    return this.authService.authenticate(email, password);
  }

  @ApiResponse({ type: LoginResponseDto, isArray: false })
  @Post('register')
  public register(
    @Body() registerInputDto: RegisterInputDto,
  ): Promise<LoginResponseDto> {
    return this.authService.register(registerInputDto);
  }
}
