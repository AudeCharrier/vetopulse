import type { RowDataPacket, ResultSetHeader } from "mysql2";
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

const editAnimalById = async (
	animalId: number,
	dataToUpdate: Partial<AnimalRows>,
): Promise<Partial<AnimalRows> | null> => {
	const fields = Object.keys(dataToUpdate);
	if (fields.length === 0) {
		throw new Error("Aucun champ à mettre à jour");
	}
	const setClause = fields.map((field) => `\`${field}\` = ?`).join(", ");
	const values = Object.values(dataToUpdate);
	values.push(animalId);
	const query = `UPDATE animal SET ${setClause} WHERE id = ?`;

	try {
		const [result] = await dbVet.query<ResultSetHeader>(query, values);

		if (result.affectedRows === 0) {
			return null;
		}

		return { animalId, ...dataToUpdate };
	} catch (error) {
		console.error("Erreur SQL lors de la mise à jour :", error);
		throw error;
	}
};

export { browseAnimalsByOwnerId, editAnimalById };
