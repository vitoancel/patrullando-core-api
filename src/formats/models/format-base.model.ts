import { Expose } from 'class-transformer';

export class FormatBaseModel {
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

  @Expose()
  creation_date: Date;

  @Expose()
  created_user: number;

  @Expose()
  update_date: Date;

  @Expose()
  update_user: number;

  @Expose()
  category_name: string;
}
