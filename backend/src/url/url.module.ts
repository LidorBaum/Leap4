import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UrlsController } from './url.controller';
import { UrlSchema } from './url.model';
import { UrlsService } from './url.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Url', schema: UrlSchema }])],
  controllers: [UrlsController],
  providers: [UrlsService],
})
export class UrlModule {}
