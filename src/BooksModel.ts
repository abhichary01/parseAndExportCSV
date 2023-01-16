import { Document, model, Schema } from "mongoose";
  
export interface IBook {
    title: string;
    isbn: string;
    authors: string;
    description: string;
  }
  
  // 2. Create a Schema corresponding to the document interface.
  const booksSchema = new Schema<IBook>({
    title: { type: String, required: true },
    isbn: { type: String, required: true },
    authors: { type: String, required: true },
    description: { type: String, required: true },
  });
  
  // 3. Create a Model.
const Books = model<IBook>('Books', booksSchema);
  
export default Books;

