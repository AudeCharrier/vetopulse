import type { ResultSetHeader } from "mysql2";
import dbVet from "../../database/db";
import type { MedicalPeople } from "../types";

const addOne = async ({
	last_name,
	first_name,
	employee_status,
	email,
	hashedpassword,
	hashedpincode,
}: Omit<MedicalPeople, "id">) => {
	const [result] = await dbVet.query<ResultSetHeader>(
		"INSERT INTO `medical-people` (med_lastname, med_firstname, status, email, password, pin) VALUES (?, ?, ?, ?, ?, ?)",
		[
			last_name,
			first_name,
			employee_status,
			email,
			hashedpassword,
			hashedpincode,
		],
	);
	return {
		id: result.insertId,
		med_lastname: last_name,
		email: email,
	};
};

export { addOne };
