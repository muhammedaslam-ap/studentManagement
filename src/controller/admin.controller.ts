import { Istudent } from "../interfaces/studentModelInterface";
import { Iadmin } from "../interfaces/adminModelInterface";
import { Response, Request } from "express";
import { IadminService } from "../interfaces/adminServiceInterface";
import { error } from "console";

export class AdminController {
  private adminServices: IadminService;

  constructor(adminService: IadminService) {
    this.adminServices = adminService;
  }

  async loadAdminLogin(req: Request, res: Response): Promise<void> {
    try {
      res.render("admin/login");
    } catch (error) {
      console.log(error);
    }
  }

  async verifyAdmin(req: Request, res: Response): Promise<void> {
    try {
      const email: string = req.body.email;
      const password: string = req.body.password;

      const result: boolean | Iadmin = await this.adminServices.LoginStudent(
        email,
        password
      );

      if (result) {
        req.session.admin = email;
        res.redirect("/admin/dashboard");
      } else {
        req.flash("error_msg", "Wrong mail and Password");
        res.redirect("/admin");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async loadDashboard(req:Request,res:Response):Promise<void>{
    try {
      if (req.session.admin) {
        const result: null | Istudent[] =
          await this.adminServices.findStudent();
        if (result) {
          res.render("admin/dashboard", { result });
        } else {
          req.flash("error_msg", "canot fetch student data");
          res.redirect("/admin");
        }
      } else {
        req.flash("error_msg", "Please Login");
        res.redirect("/admin");
      }    } catch (error) {
      console.log(error)
    }
  }


  async AdminEditUser(req:Request,res:Response):Promise<void>{
    try {
      if (req.session.admin) {
        const email: string = req.params.id;
        const name: string = req.body.name;
        const clas: number = req.body.class;
        const roleno: number = req.body.roleno;
        const result: boolean = await this.adminServices.edit(
          email,
          name,
          clas,
          roleno
        );

        if (result) {
          req.flash("success_msg", "updated sucessfully ");
          res.redirect("/admin/dashboard");
        } else {
          req.flash("error_msg", "data updation failed");
          res.redirect("/admin/dashboard");
        }
      } else {
        req.flash("error_msg", "please login session expired ");
        res.redirect("/admin");
      }
    } catch (error) {
      console.log(error)
    }
  }

  async getEditUser(req:Request,res:Response):Promise<void>{
    try {
      if (req.session.admin) {
        const email: string = req.params.id;
        const userData = await this.adminServices.findStudentByEmail(email);
        if (userData) {
          res.render("admin/editUser", { userData });
        } else {
          req.flash("error_msg", "cant fetch data from database ");
          res.redirect("/admin/home");
        }
      } else {
        req.flash("error_msg", "please login session expired ");
        res.redirect("/admin");
      }
    } catch (error) {
      console.log(error)
    }
  }

  async deleteUser(req:Request,res:Response):Promise<void>{
    try {
      if(req.session.admin){
        const email: string = req.params.id;
        const deleteUser = await this.adminServices.delete(email)
        if (deleteUser) {
          req.flash('success_msg','User deleted successfully')
          res.redirect("/admin/dashboard");
        } else {
          req.flash("error_msg", "cant fetch data from database ");
          res.redirect("/admin/dashboard");
        }
      }else{
        throw error
      }
    } catch (error) {
      console.log(error)
    }
  }

  async logOut(req:Request,res:Response):Promise <void>{
    try {
      if(req.session.admin){
        req.session.admin = null
        req.flash('error_msg','logout success')
        res.redirect('/admin')
      }else{
        throw error
      }
    } catch (error) {
      console.log(error)
    }
  }
}