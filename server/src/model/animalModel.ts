import type { RowDataPacket } from "mysql2";
import dbVet from "../../database/db";

interface AnimalRows extends RowDataPacket {
	id: number;
	pet_name: string;
	species_name: string;
	race_name: string;
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
		`SELECT a.*, r.race_name, s.species_name
         FROM animal AS a 
         JOIN race as r ON a.race_id = r.id
		 JOIN species as s ON r.species_id = s.id
         WHERE a.owner_id = ?
         ORDER BY a.pet_name ASC`,
		[ownerId],
	);

	return rows;
};

export { browseAnimalsByOwnerId };
