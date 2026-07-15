import type { RequestHandler } from "express";
import Joi from "joi";

// On étend l'interface Request d'Express pour que TypeScript ne râle pas
declare global {
	namespace Express {
		interface Request {
			validationErrors?: string[];
		}
	}
}

// Schéma pour la CRÉATION (POST)
const addUserSchema = Joi.object({
	last_name: Joi.string()
		.pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/)
		.min(2)
		.max(50)
		.required(),
	first_name: Joi.string()
		.pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/)
		.min(2)
		.max(50)
		.required(),
	employee_status: Joi.string().required(),
	email: Joi.string().email().required(),
	plain_password: Joi.string()
		.pattern(/^[0-9A-Za-zÀ-ÖØ-öø-ÿ&()=*+$%!?-]+$/)
		.min(8)
		.max(128)
		.required()
		.messages({
			"string.pattern.base": "Veuillez respecter les critères du mot de passe.",
		}),
	confirm_password: Joi.string()
		.valid(Joi.ref("plain_password"))
		.required()
		.messages({
			"any.only": "Les mots de passe ne correspondent pas.",
		}),
	plain_pincode: Joi.string()
		.pattern(/^[0-9]{4}$/)
		.required()
		.messages({
			"string.pattern.base":
				"Le code PIN doit être composé de exactement 4 chiffres.",
		}),
	confirm_pincode: Joi.string()
		.valid(Joi.ref("plain_pincode"))
		.required()
		.messages({
			"any.only": "Les codes pin ne correspondent pas.",
		}),
});

const validateBody = (schema: Joi.ObjectSchema): RequestHandler => {
	return (req, _res, next) => {
		const { error, value } = schema.validate(req.body, {
			abortEarly: false,
			stripUnknown: true,
			messages: {
				"any.required": "Le champ {#label} est obligatoire.",
				"number.base": "Le champ {#label} doit être un nombre.",
				"number.integer": "Le champ {#label} doit être un entier.",
				"number.positive": "Le champ {#label} doit être supérieur à 0.",
				"number.min":
					"Le champ {#label} doit être supérieur ou égal à {#limit}.",
				"number.max": "Le champ {#label} ne peut pas dépasser {#limit}.",
				"object.min": "Vous devez fournir au moins un champ à modifier.",
				"string.empty": "Le champ {#label} ne peut pas être vide.",
				"string.min":
					"Le champ {#label} doit contenir au moins {#limit} caractères.",
				"string.max":
					"Le champ {#label} ne peut pas dépasser {#limit} caractères.",
				"string.email": "Le champ {#label} doit être une adresse email valide.",
			},
		});

		if (error) {
			// Au lieu de faire un res.status(400), on stocke les erreurs dans "req"
			req.validationErrors = error.details.map((err) => err.message);
		} else {
			// Si tout va bien, on nettoie le body comme d'habitude
			req.body = value;
		}

		// On appelle TOUJOURS next() pour que le contrôleur prenne le relais
		next();
	};
};

// LES MIDDLEWARES PRÊTS À L'EMPLOI
const validateAddUser = validateBody(addUserSchema);

export default { validateAddUser };
