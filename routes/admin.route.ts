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
    this.adminRouter.post('/verifyAdmin',(req:Request,res:Response)=>{
      this.adminController.verifyAdmin(req,res);
    })
    this.adminRouter.get("/dashboard",(req:Request,res:Response)=>{
      this.adminController.loadDashboard(req,res)
    })
    this.adminRouter.post("/editUser/:id",(req:Request,res:Response)=>{
      this.adminController.AdminEditUser(req,res)
    })
    this.adminRouter.get('/editUser/:id',(req:Request,res:Response)=>{
      this.adminController.getEditUser(req,res)
    })
    this.adminRouter.get('/deleteUser/:id',(req:Request,res:Response)=>{
      this.adminController.deleteUser(req,res)
    })
    this.adminRouter.get('/logOut',(req:Request,res:Response)=>{
      this.adminController.logOut(req,res)
    })


  

} 
  public getAdminRoute(){
    return this.adminRouter;
  }
}