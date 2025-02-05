import { IstudentService } from "../interfaces/studentServiceInterface";
import { Istudent } from "../interfaces/studentModelInterface";
import { Request, Response } from "express";

export class StudentController{
    private studentServices:IstudentService;

    constructor(studentServices:IstudentService){
        this.studentServices = studentServices;
    }
    async loadStudentLogin(req: Request, res: Response): Promise<void> {
        try {
          res.render("student/login");
        } catch (error) {
          console.log(error);
        }
    }
}
