import { createServer } from "http";
import app from "./csvUpload";

const server = createServer(app)

server.listen(3000, ()=>{
  console.log('Server listening on port 3000!');
})