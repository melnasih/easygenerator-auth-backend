import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Request,
  HttpCode,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { Request as ExpressRequest } from 'express';

class AuthResponseDto {
  token: string; 
  user: {
    id: string;
    email: string;
    name: string;
  };
}

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() signupDto: SignupDto): Promise<AuthResponseDto> {
    const result = await this.authService.signup(signupDto);
    this.logger.log(`signup: user=${signupDto.email}`);
    return result;
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signin(@Body() signinDto: SigninDto): Promise<AuthResponseDto> {
    const result = await this.authService.signin(signinDto);
    this.logger.log(`signin: user=${signinDto.email}`);
    return result;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  @HttpCode(HttpStatus.OK)
  getProfile(@Request() req: ExpressRequest) {
    return {
      message: 'Profile retrieved successfully',
      user: (req as any).user,
    };
  }
}