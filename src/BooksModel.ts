import { Document, model, Schema } from "mongoose";
  
export interface IBook {
    title: string;
    isbn: string;
    authors: string;
    description: string;
  }
  
  // 2. Create a Schema corresponding to the document interface.
  const booksSchema = new Schema<IBook>({
    title: { type: String, default: "not available" },
    isbn: { type: String, default: "not available" },
    authors: { type: String, default: "not available" },
    description: { type: String,default: "not available" },
  });
  
  // 3. Create a Model.
const Books = model<IBook>('Books', booksSchema);
  
export default Books;

