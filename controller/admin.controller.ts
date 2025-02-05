import { Istudent } from "../interfaces/studentModelInterface";
import { Iadmin } from "../interfaces/adminModelInterface";
import { Response, Request } from "express";
import { IadminService } from "../interfaces/adminServiceInterface";

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
}