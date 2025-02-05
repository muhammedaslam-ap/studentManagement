import Express, { Request, Response } from "express";
import { AdminController } from '../controller/admin.controller'

export class AdminRoute {
  private adminController: AdminController;
  private adminRouter: Express.Router;

  constructor(adminController: AdminController) {
    this.adminController = adminController;
    this.adminRouter = Express.Router();
    this.setRoutes();
  }

  private setRoutes() {
    this.adminRouter.get("/", (req: Request, res: Response) => {
        this.adminController.loadAdminLogin(req, res);
      });


  

} 
  public getAdminRoute(){
    return this.adminRouter;
  }
}