import { Body, Controller, Delete, Get, Post } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get('/health')
  health(): string {
    return 'ok';
  }
}
