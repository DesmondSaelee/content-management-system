USE departmentRoles_db
SELECT
  employee.id, employee.first_name, employee.last_name, roles.title, department.department_name  AS "Department", roles.salary, CONCAT(mgr.first_name, " ", mgr.last_name) AS "Manager"

FROM employee
JOIN roles ON employee.role_id = roles.id
JOIN department ON roles.department_id = department_id
LEFT OUTER JOIN employee mgr ON employee.manager_id = mgr.id;
