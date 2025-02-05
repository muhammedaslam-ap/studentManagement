
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
    }


    public getStudentRoute(){
        return this.studentRouter;
    }
}