import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { client } from './discord';
import { config } from 'dotenv';
config();

const TOKEN = process.env.DISCORD_TOKEN;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3001);
}

client.login(TOKEN)
bootstrap();
