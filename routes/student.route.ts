
import Express, { Request, Response } from "express";
import { StudentController } from "../controller/student.controller";

export class StudentRoute{
    private studentController : StudentController;
    private studentRouter:Express.Router;

    constructor(studentController:StudentController){
        this.studentController = studentController;
        this.studentRouter = Express.Router();
        this.setRoutes();
    }

    private setRoutes(){
        this.studentRouter.get("/", (req: Request, res: Response) => {
            this.studentController.loadStudentLogin(req, res);
          });
          this.studentRouter.post('/login',(req:Request,res:Response) =>{
            this.studentController.loginStudent(req,res);
        });
          this.studentRouter.get('/register',(req:Request,res:Response) =>{
            this.studentController.loadRegisterStudent(req,res);
        })
        this.studentRouter.post('/register',(req:Request,res:Response)=>{
            this.studentController.registerStudent(req,res);
        })
        this.studentRouter.get('/home',(req:Request,res:Response)=>{
            this.studentController.loadHome(req,res);
        })
        this.studentRouter.get('/logOut',(req:Request,res:Response)=>{
            this.studentController.logOut(req,res)
        })
        this.studentRouter.get('/editUser',(req:Request,res:Response)=>{
            this.studentController.LoadEditUser(req,res)
        })
        this.studentRouter.post('/editUser',(req:Request,res:Response)=>{
            this.studentController.editUser(req,res)
        })
    }


    public getStudentRoute(){
        return this.studentRouter;
    }
}