import { Istudent } from "../interfaces/studentModelInterface";
import Student from '../models/student.models';

import { IstudentRepository } from "../interfaces/studentRepoInterface";


export class StudentRepository implements IstudentRepository{

    async createStudent(student: Istudent): Promise<Istudent> {
        return await Student.create(student);
    }

    async findByEmail(email: string): Promise<Istudent | null> {
        return await Student.findOne({email});
    }

    async editStudent(student:Istudent,email:string):Promise <Istudent|null>{

        const existingStudent = await Student.findOne({email});

        if(!existingStudent){
            throw new Error("Student not found with the provided email.")
        }

        // Update only the provided fields
        existingStudent.name = student.name ?? existingStudent.name;
        existingStudent.class = student.class ?? existingStudent.class;
        existingStudent.password = student.password ?? existingStudent.password;
        existingStudent.roll_no = student.roll_no ?? existingStudent.roll_no;
        existingStudent.email = student.email ?? existingStudent.email;

        return await existingStudent.save();
    }

}