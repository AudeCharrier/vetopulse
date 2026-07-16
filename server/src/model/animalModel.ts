import type { RowDataPacket } from "mysql2";
import dbVet from "../../database/db";

interface AnimalRows extends RowDataPacket {
	id: number;
	pet_name: string;
	//race
	birth_date: string;
	gender: string;
	is_neutered: boolean;
	insurance: string;
	microchip_number: string;
	tatoo_number: string;
	observations: string;
}

const browseAnimalsByOwnerId = async (
	ownerId: number,
): Promise<AnimalRows[]> => {
	const [rows] = await dbVet.query<AnimalRows[]>(
		`SELECT a.*
         FROM animal AS a 
         JOIN owner AS o ON a.owner_id = o.id 
         WHERE o.id = ? 
         ORDER BY a.pet_name ASC`,
		[ownerId],
	);

	return rows;
};

export { browseAnimalsByOwnerId };
