import {Router} from "express"
import _employeeService from "../services/employee.service.js"

const employeeService = new _employeeService();
const router = Router();



router.get('/', async(req, res) =>{
    try{
        const employees = await employeeService.getEmployees();
        res.json(employees);
    }
    catch(err){
        console.error(err);
    }
   
});

router.post('/', async(req, res) =>{
    try{
        const newEmployee = await employeeService.createEmployee(req)
        res.json(newEmployee);
    }
    catch(err){
        console.error(err);
    }
})


export default router;