import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(email: string, name: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12);
    const createdUser = new this.userModel({
      email,
      name,
      password: hashedPassword,
    });
    return createdUser.save();
  }

  async findByEmail(email: string): Promise<UserDocument | undefined> {
    return this.userModel.findOne({ email }).exec();
  }

  async validatePassword(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainTextPassword, hashedPassword);
  }
}
