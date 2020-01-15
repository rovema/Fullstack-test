export class Book {
  _id: string;
  title: string;
  description: string;
  picture: string;
  status: boolean;
  isDeleted?: boolean;
  createdby?: string;
  createdon?: Date;
  uid: string;
}
