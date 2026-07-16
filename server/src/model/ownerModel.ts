import type { RowDataPacket } from "mysql2";
import dbVet from "../../database/db";

// On définit l'interface pour typer ce que retourne la table owner (optionnel mais recommandé en TS)
interface OwnerRows extends RowDataPacket {
	id: number;
	lastname: string;
	firstname: string;
	email: string;
	telephone: string;
	adress: string;
	zipcode: string;
	city: string;
}

const browseAll = async (): Promise<OwnerRows[]> => {
	const [rows] = await dbVet.query<OwnerRows[]>("SELECT * FROM `owner`");

	return rows;
};

export { browseAll };
