import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { TextChannel } from 'discord.js';
import { client } from './discord';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
