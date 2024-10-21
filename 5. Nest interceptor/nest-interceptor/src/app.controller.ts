import { Controller, Get, UseInterceptors } from '@nestjs/common';

// import { AuthorizationInterceptor } from './loggin.interceptor'

import { AppService } from './app.service';

// @UseInterceptors(AuthorizationInterceptor)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
