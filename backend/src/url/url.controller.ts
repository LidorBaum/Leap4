import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UrlsService } from './url.service';

@Controller('url')
export class UrlsController {
  constructor(private readonly urlsService: UrlsService) {}
  @Post()
  async addUrl(@Body('url') originalUrl: string) {
    const generatedUrl = await this.urlsService.addUrl(originalUrl);
    return generatedUrl;
  }

  @Get()
  async getAllUrls() {
    const urls = await this.urlsService.getAllUrls();
    return urls;
  }

  @Get(':id')
  async getUrlById(@Param('id') urlId: string) {
    return await this.urlsService.getUrlById(urlId);
  }
}
