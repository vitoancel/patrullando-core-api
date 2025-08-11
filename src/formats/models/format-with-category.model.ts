import { Exclude, Expose } from 'class-transformer';
import { FormatBaseModel } from './format-base.model';

export class FormatWithCategoryModel extends FormatBaseModel {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  file_url: string;

  @Expose()
  category_id: number;

  @Exclude()
  creation_date: Date;

  @Exclude()
  created_user: number;

  @Exclude()
  update_date: Date;

  @Exclude()
  category: Date;

  @Exclude()
  update_user: number;

  @Expose()
  category_name: string;
}
