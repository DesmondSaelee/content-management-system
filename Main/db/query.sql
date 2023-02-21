USE departmentRoles_db
SELECT  employee.id, employee.first_name AS "First Name", employee.last_name AS "Last Name", roles.title AS "Title", department.department_name  AS "Department", roles.salary, CONCAT(mgr.first_name, " ", mgr.last_name) AS "Manager" 
FROM employee

LEFT JOIN roles ON roles.id = employee.role_id
LEFT JOIN department ON department.id = roles.department_id 
LEFT JOIN employee mgr ON employee.manager_id = mgr.id ;

  


