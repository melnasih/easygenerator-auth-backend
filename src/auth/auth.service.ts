import { Injectable, UnauthorizedException, ConflictException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto) {
    const { email, name, password } = signupDto;
    
    this.logger.log(`Signup attempt for email: ${email}`);
    
    // Check if user already exists
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      this.logger.warn(`Signup failed: User already exists with email ${email}`);
      throw new ConflictException('User with this email already exists');
    }

    // Create new user
    const user = await this.usersService.create(email, name, password);
    this.logger.log(`User created successfully: ${email}`);

    // Generate JWT token
    const payload = { email: user.email, sub: user._id, name: user.name };
    const token = this.jwtService.sign(payload);

    return {
      message: 'User created successfully',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    };
  }

  async signin(signinDto: SigninDto) {
    const { email, password } = signinDto;
    
    this.logger.log(`Signin attempt for email: ${email}`);

    // Find user by email
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      this.logger.warn(`Signin failed: User not found with email ${email}`);
      throw new UnauthorizedException('Invalid credentials');
    }

    // Validate password
    const isPasswordValid = await this.usersService.validatePassword(password, user.password);
    if (!isPasswordValid) {
      this.logger.warn(`Signin failed: Invalid password for email ${email}`);
      throw new UnauthorizedException('Invalid credentials');
    }

    this.logger.log(`User signed in successfully: ${email}`);

    // Generate JWT token
    const payload = { email: user.email, sub: user._id, name: user.name };
    const token = this.jwtService.sign(payload);

    return {
      message: 'Signed in successfully',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    };
  }
}
