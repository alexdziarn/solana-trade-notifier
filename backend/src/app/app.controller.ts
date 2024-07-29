import { Controller, Get, Post, Body, Headers } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  messageDiscord(): string {
    console.log("get")
    return this.appService.messageDiscord("hello");
  }
  
  @Post()
  handleSwapNotification(@Body() payload: any, @Headers() headers: any): string {
    // Log the incoming webhook payload and headers
    console.log('Received transaction payload:', payload);
    console.log('Received transaction headers:', headers);
    this.appService.messageDiscord("notification");

    // Process the webhook payload here
    // You can add your business logic to handle different types of webhooks
    return 'Webhook received';
  }
  
}
