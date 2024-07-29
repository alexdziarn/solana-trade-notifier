import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { client } from './discord/discord';
import { config } from 'dotenv';
config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3001);
}

const TOKEN = process.env.DISCORD_TOKEN;
client.login(TOKEN)

bootstrap();
