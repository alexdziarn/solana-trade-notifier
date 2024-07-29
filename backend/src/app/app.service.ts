import { Injectable } from '@nestjs/common';
import { channel } from '../discord/discord';

@Injectable()
export class AppService {
  messageDiscord(message: string): string {
    if (!channel) {
        console.error('Channel not found');
        return;
    }
    channel.send(message).catch(console.error);
    return 'Successfully sent discord message';
  }
}
