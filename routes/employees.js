const express = require('express');
const employees = express.Router();
const db = require('../config/database');
const jwt = require('jsonwebtoken');

employees.post("/", async (req, res, next) => {
    const { emp_name, emp_Lname, emp_cel, emp_mail, emp_address, emp_rol,emp_password } = req.body;

    if (emp_name && emp_Lname && emp_cel && emp_mail && emp_address && emp_rol && emp_password) {
        let query = "INSERT INTO employees(nombre, apellidos, telefono, correo, direccion, rol,contraseña)";
        query += ` VALUES ('${emp_name}','${emp_Lname}','${emp_cel}','${emp_mail}','${emp_address}','${emp_rol}','${emp_password}')`;
        const rows = await db.query(query);
        if (rows.affectedRows == 1) {
            return res.status(201).json({ code: 201, message: "employees insertado correctamente" });
        }
        return res.status(500).json({ code: 500, message: "Ocurrio un error" });
    }
    return res.status(500).json({ code: 500, message: "Campos incorrectos" });


});

employees.delete("/:id([0-9]{1,3})", async (req, res, next) => {
    const query = `DELETE FROM employees WHERE id=${req.params.id}`;
    const rows = await db.query(query);
    if (rows.affectedRows == 1) {
        return res.status(200).json({ code: 200, message: "employees borrado correctamente" });
    }
    return res.status(404).json({ code: 404, message: "employees no encontrado" });
});

employees.put("/:id([0-9]{1,3})", async (req, res, next) => {
    const { emp_name, emp_Lname, emp_cel, emp_mail, emp_address, emp_rol, emp_password } = req.body;

    if (emp_name && emp_Lname && emp_cel && emp_mail && emp_address && emp_rol && emp_password) {
        let query = `UPDATE employees SET nombre='${emp_name}',apellidos='${emp_Lname}',`;
        query += `telefono='${emp_cel}',correo=${emp_mail},direccion='${emp_address}',rol='${emp_rol}',contraseña='${emp_password}' WHERE id=${req.params.id};`;
        const rows = await db.query(query);
        if (rows.affectedRows == 1) {
            return res.status(201).json({ code: 200, message: "employees actualizado correctamente" });
        }
        return res.status(500).json({ code: 500, message: "Ocurrio un error" });
    }
    return res.status(500).json({ code: 500, message: "Campos incorrectos" });

});

employees.get("/", async (req, res, next) => {
    const emp = await db.query("SELECT * From employees");
    console.log(emp);
    return res.status(200).json({ code: 1, message: emp });
    //res.send(employees);
});

employees.get('/:id([0-9]{1,3})', async (req, res, next) => {
    const id = req.params.id;
    const result = await db.query("SELECT COUNT(*) AS total_empleados FROM employees;");
    const cont = result[0].total_empleados;
    //console.log(cont);
    if (id >= 0 && id <= cont) {
        const emp = await db.query("SELECT * From employees Where id=" + id + ";");
        return res.status(200).json({ code: 1, message: emp });
        //res.send(employees[req.params.id-1]);
    }

    return res.status(404).json({ code: 404, message: "employees not founded" });
    //res.send("employees not founded");

});

employees.post("/login", async (req, res, next) => {
    const { emp_id, emp_password } = req.body;
    const query = `SELECT * FROM employees WHERE id=${emp_id} AND contraseña ='${emp_password}';`;
    const rows = await db.query(query);
    const query2 = `SELECT rol FROM employees WHERE id=${emp_id} AND contraseña ='${emp_password}';`;
    const result = await db.query(query2);
    const rol= result[0].rol;
    console.log(rol);
    console.log(rows[0]);
    if (emp_id && emp_password) {
        if (rows.length == 1) {
            const token = jwt.sign({
                emp_id: rows[0].id,
                emp_rol: rows[0].emp_rol

            },"debugkey");
            return res.status(200).json({ code: 200, message:token+","+rol});
        }
        {
            return res.status(200).json({ code: 401, message: "Usuario y/o contraseña incorrectos" });
        }
    }
    return res.status(500).json({ code: 500, message: "Campos Incompletos" });

})

module.exports = employees; 