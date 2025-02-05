import { App } from './app';

const app = new App()

app.getApp()
  .listen(process.env.PORT, () =>
    console.log(`Server is running on http://127.0.0.1:${process.env.PORT}`)
  );