import { App } from '../src/app';
import { ConnectMongo } from '../src/config/dbConfig';

const app = new App()
const database = new ConnectMongo();

database.connectDB()

app.getApp()
  .listen(process.env.PORT, () =>
    console.log(`Server is running on http://127.0.0.1:${process.env.PORT}`)
  );