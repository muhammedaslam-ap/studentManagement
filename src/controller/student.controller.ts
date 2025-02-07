import { IstudentService } from "../interfaces/studentServiceInterface";
import { Istudent } from "../interfaces/studentModelInterface";
import { Request, Response } from "express";
import { promises } from "dns";
import { error } from "console";

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

     async loginStudent(req:Request,res:Response):Promise <void>{
        try {

            const email:string = req.body.email;
            const password:string = req.body.password;

            const result:boolean | Istudent = await this.studentServices.loginStudent(email,password);


            if(result){
                req.session.student = email;
                res.redirect('/home');
            }else{
                req.flash('error_msg','Email and password is not matching');
                res.redirect('/');
            }
            
        } catch (error) {
            console.log(error);
            
        }

    }


    async registerStudent(req:Request,res:Response): Promise <void>{
      try {

          const student:Istudent = req.body

          const result = await this.studentServices.createStudent(student);

          if(!result){
              req.flash('error_msg','Email alredy exist');
              res.redirect('/register');
          }else{
              req.flash("success_msg", "successfully registered");
              res.redirect('/');
          }

          
      } catch (error) {
          if(error instanceof Error) {
              console.log(error.message);
          }
      }
  }

    async loadRegisterStudent(req:Request,res:Response):Promise <void>{
      try {
          res.render('student/register');
      } catch (error) {
          console.log(error);
          
      }
  }


  async loadHome(req:Request,res:Response):Promise <void>{
    try {
        if(req.session.student){
            const userData:Istudent | null = await this.studentServices.findStudent(req.session.student);
           return res.render('student/home',{userData})
        }else{
            res.redirect('/');
        }
    } catch (error) {
        console.log(error);
    }
}

  async logOut(req:Request,res:Response):Promise<void>{
    try {

      if(req.session.student){
       req.session.student = null
       req.flash('error_msg','logout success')
       res.redirect('/')
    }else{
      throw error
    }
    } catch (error) {
      console.log(error)
    }
  }

  async LoadEditUser(req:Request,res:Response):Promise<void>{
    try {
      if(req.session.student){
        const userData:Istudent|null = await this.studentServices.findStudent(req.session.student);
        res.render('student/editUser',{userData})
      }else{
        res.redirect('/')
      }
    } catch (error) {
      console.log(error)
    }
  }

  async editUser(req:Request,res:Response):Promise <void>{
    try {
      if(req.session.student){
        const student:Istudent = req.body;
        const currentEmail = req.session.student;
        const userData = await this.studentServices.editStudent(student,currentEmail);
        if(userData){
          req.flash('success_msg','updated Successfully')
          res.redirect('/home')
        }else{
          req.flash('error','an occured while updating user data')
          res.redirect('/home')
        }
    }else{
        res.redirect('/');
    }
    } catch (error) {
      console.log(error)
    }
   
  }
}
