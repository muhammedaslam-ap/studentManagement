import { Iadmin } from "../interfaces/adminModelInterface";

import { Istudent } from "../interfaces/studentModelInterface";
import { IadminRepository } from "../interfaces/adminRepoInterface";

import Admin from '../models/admin.models';
import Student from '../models/student.models';

export class AdminRepository implements IadminRepository{

    async findByEmail(email: string): Promise<Iadmin | null> {
        return await Admin.findOne({email})
    }
    async findStudent():Promise<Istudent[] |null>{
        return await Student.find();
    }
    async findStudentByEmail(email: string): Promise<Istudent | null> {
        return await Student.findOne({email});
    }
    async edit(email: string, name: string, clas: number, roleno: number): Promise<Istudent | null> {
        return await Student.findOneAndUpdate(
            {email},
            {
                name:name,
                class:clas,
                roleno:roleno
            },
            {new : true}
        );
    }
    async delete(email: string): Promise<Istudent | null> {
        return await Student.findOneAndDelete({email});
    }
    
}