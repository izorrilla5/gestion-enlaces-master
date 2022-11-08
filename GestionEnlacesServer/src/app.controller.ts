import { Controller, Get, UseGuards, Post, Request, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { EmailSenderService } from './general/emailSender.service';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService, private readonly emailSenderService: EmailSenderService) { }

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('auth/update-token')
  async updateToken(@Body() body: any) {
    const refreshToken = body.token;
    return this.authService.refreshToken(refreshToken);
  }

  @Post('sendjoinmail')
  async sendjoinmail(@Body() body: any) {
    return this.emailSenderService.sendJoinMail(body);
  }

  @Post('sendcontactmail')
  async sendcontactmail(@Body() body: any) {
    return this.emailSenderService.sendContactMail(body);
  }
}
