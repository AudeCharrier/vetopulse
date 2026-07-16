const BASE_URL = import.meta.env.VITE_API_URL;

export const apiFetch = async (
	endpoint: string,
	options: RequestInit = {},
): Promise<Response> => {
	const isFormData = options.body instanceof FormData;

	return fetch(`${BASE_URL}${endpoint}`, {
		...options,
		headers: {
			// Si FormData, pas de Content-Type → le browser le gère avec la boundary
			...(isFormData ? {} : { "Content-Type": "application/json" }),
			...options.headers,
		},
	});
};
