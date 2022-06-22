import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UrlModule } from './url/url.module';

//NEED TO SAVE THE MONGOURL AS ENV VAR
@Module({
  imports: [
    UrlModule,
    MongooseModule.forRoot(
      'mongodb+srv://Lidor:1234@cluster0.bphmz.mongodb.net/leap4?retryWrites=true&w=majority',
    ),
  ],
})
export class AppModule {}
