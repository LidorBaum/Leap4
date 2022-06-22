import * as mongoose from 'mongoose';

export const UrlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
  },
});

export interface ReturnUrl {
  id: string;
  originalUrl: string;
  mappedUrl: string;
}

export interface Url {
  id: string;
  originalUrl: string;
}
