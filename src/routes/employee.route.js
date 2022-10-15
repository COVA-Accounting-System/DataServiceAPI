import { Router } from "express";
import _employeeService from "../services/employee.service.js";

const employeeService = new _employeeService();
const router = Router();

router.get("/", async (req, res) => {
  try {
    const employees = await employeeService.getEmployees();
    res.json(employees);
  } catch (err) {
    console.error(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const newEmployee = await employeeService.createEmployee(req);
    res.json(newEmployee);
  } catch (err) {
    console.error(err);
  }
});

router.put("/delete", async (req, res) => {
  try {
    const employee = await employeeService.updateEmployeeVisibility(req);
    res.json(employee);
  } catch (err) {
    console.error(err);
  }
});

router.put("/update", async (req, res) => {
  try {
    const employee = await employeeService.updateEmployee(req);
    res.json(employee);
  } catch (err) {
    console.error(err);
  }
});

router.delete("/delete", async (req, res) => {
  try {
    await employeeService.deleteEmployee(req);
    res.send("This employee was deleted");
  } catch (err) {
    console.error(err);
  }
});

export default router;
