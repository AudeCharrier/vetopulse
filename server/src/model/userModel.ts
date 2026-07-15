import type { ResultSetHeader } from "mysql2";
import { MedicalPeople } from "../types";

import dbVet from "../../database/db";

const addOne = async ({
	last_name,
	first_name,
	employee_status,
	email,
	hashedpassword,
	hashedpincode,
}: Omit<MedicalPeople, "id">) => {
	const [result] = await dbVet.query<ResultSetHeader>(
		"INSERT INTO `medical-people` (lastname, firstname, status, email, password, pin) VALUES (?, ?, ?, ?, ?, ?)",
		[
			last_name,
			first_name,
			employee_status,
			email,
			hashedpassword,
			hashedpincode,
		],
	);
	return { id: result.insertId, last_name, email };
};

export { addOne };
