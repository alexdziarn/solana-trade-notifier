import { Controller, Get, Req } from '@nestjs/common';
import { TextChannel } from 'discord.js';
import { channel } from './discord';

@Controller("swap")
export class AppController {

  @Get()
  swap(@Req() request: Request): string {
    console.log(request);
    if (!channel) {
        console.error('Channel not found');
        return;
    }
    channel.send("SWAP DETECTED!").catch(console.error);
    return "success!";
  }
}