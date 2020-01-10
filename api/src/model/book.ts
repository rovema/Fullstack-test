import mongoose = require("mongoose");

export interface IBook extends mongoose.Document {
  id: string;
  title: string;
  description: string;
  picture: string;
  status: boolean;
  isDeleted?: boolean;
  createdby?: string;
  createdon?: Date;
  uid: string;
}

let schema = {
  title: { type: String, required: true, index: true },
  description: { type: String, required: true },
  picture: { type: String, required: true },
  status: { type: Boolean, required: true, index: true },
  uid: { type: String, required: true, index: true },
  isDeleted: { type: Boolean, default: false }
};

export const BookMasterSchema = new mongoose.Schema(schema, {
  timestamps: true,
  autoIndex: true
});
export const Book = mongoose.model<IBook>(
  "books",
  BookMasterSchema,
  "books",
  false
);
