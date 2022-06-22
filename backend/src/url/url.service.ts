import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Url, ReturnUrl } from './url.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

//NEED TO ADD THIS CONST TO ENV VAR
const MAPPED_URL_START = 'www.leap4-test.com';

@Injectable()
export class UrlsService {
  private urls: Url[] = [];

  constructor(@InjectModel('Url') private readonly urlModel: Model<Url>) {}

  async addUrl(originalUrl: string) {
    const isExist = await this.urlModel
      .findOne({ originalUrl: originalUrl })
      .exec();
    if (isExist)
      throw new ConflictException('This URL Address Already Exists!');

    const newUrl = new this.urlModel({ originalUrl });
    const result = await newUrl.save();
    const url = {
      ...result.toObject(),
      mappedUrl: `${MAPPED_URL_START}/${result.id}`,
      id: result.id,
    };
    delete url._id;
    return url as Url;
  }
  async getAllUrls() {
    const result = await this.urlModel.find().sort({ _id: -1 }).exec();
    const urlsArray = result.map((url) => ({
      id: url.id,
      originalUrl: url.originalUrl,
      mappedUrl: `${MAPPED_URL_START}/${url.id}`,
    }));
    return { urls: urlsArray };
  }

  async getUrlById(urlId: string): Promise<ReturnUrl> {
    let url;
    try {
      url = await this.urlModel.findById(urlId);
    } catch (error) {
      throw new NotFoundException('Could not find this URL');
    }
    if (!url) throw new NotFoundException('Could not find this URL');
    return {
      id: url.id,
      originalUrl: url.originalUrl,
      mappedUrl: `${MAPPED_URL_START}/${url.id}`,
    };
  }
}
