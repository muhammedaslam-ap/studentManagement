import express, { Request, Response, Application } from 'express';
import dotenv from 'dotenv'
// import {studentRoute} from './routes/student.route'
// import {adminRoute} from './routes/admin.route'
import path from 'path'
import session from 'express-session'; 
import flash from 'connect-flash'; 
import nocache from 'nocache'; 
import 'express-session' ;

import { StudentRoute } from "./routes/student.route";




import { StudentController } from "./controller/student.controller";
import { StudentService } from "./services/studentServices";
import { StudentRepository } from "./repo/studentRepo";
import { AdminRepository } from "./repo/adminRepo";
import { AdminService } from "./services/adminServices";
import { AdminController } from "./controller/admin.controller";
import { AdminRoute } from "./routes/admin.route";





declare module 'express-session'{
    interface SessionData{
      student?:string|null;
      admin?:string|null;
    }
  }
  
  export class App {
    public app: Application;
  
    constructor() {
      dotenv.config();
      this.app = express();
      this.setMiddleWare();
      this.setAdminRoute();
      this.setStudentRoute();
      this.setupViewEngine();
    }
  
    private setupViewEngine() {
      // Set the views directory
      this.app.set("views", path.join(__dirname, "views"));
      // Set EJS as the templating engine
  
      this.app.set("view engine", "ejs");
    }
  
    private setMiddleWare(): void {
      this.app.use(express.json());
      this.app.use(express.urlencoded({ extended: true }));
  
      this.app.use(
        session({
          secret: "secret", // You should store this in .env file
          resave: false,
          saveUninitialized: true,
        })
      );
  
      this.app.use(nocache());
      this.app.use(flash());
      // Middleware to make flash messages available in the view templates
      this.app.use((req: Request, res: Response, next: () => void) => {
        res.locals.success_msg = req.flash("success_msg");
        res.locals.error_msg = req.flash("error_msg");
        next();
      });
    }
  
    private setStudentRoute() {
  
      const studentRepository = new StudentRepository();
      const studentServices = new StudentService(studentRepository);
      const studentController = new StudentController(studentServices);
      const studentRoutes = new StudentRoute(studentController);
      this.app.use('/',studentRoutes.getStudentRoute());
    }
  
    private setAdminRoute() {
      const adminRepository = new AdminRepository();
      const adminServices = new AdminService(adminRepository);
      const adminController = new AdminController(adminServices);
      const adminRoutes = new AdminRoute(adminController);
      this.app.use('/admin',adminRoutes.getAdminRoute());
  
    }
  
    public getApp() {
      return this.app;
    }
  
  
  }
  