import { Injectable } from '@nestjs/common';
import { channel } from './discord';

@Injectable()
export class AppService {
  getHello(): string {
    
    if (!channel) {
        console.error('Channel not found');
        return;
    }
    channel.send("SWAP DETECTED!").catch(console.error);
    return 'Hello World!';
  }
}
