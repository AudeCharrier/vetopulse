import { useState } from "react";

function EditableField({ label, value, onSave }) {
	const [isEditing, setIsEditing] = useState(false);
	const [tempValue, setTempValue] = useState(value);

	const handleSave = () => {
		onSave(tempValue);
		setIsEditing(false);
	};

	return (
		<div
			style={{
				display: "flex",
				gap: "10px",
				alignItems: "center",
				margin: "8px 0",
			}}
		>
			{/* Label du champ (ex: "Email :") */}
			<strong>{label} :</strong>

			{isEditing ? (
				<>
					<input
						type="text"
						value={tempValue}
						onChange={(e) => setTempValue(e.target.value)}
					/>
					<button type="button" onClick={handleSave}>
						Enregistrer
					</button>
					<button
						type="button"
						onClick={() => {
							setTempValue(value);
							setIsEditing(false);
						}}
					>
						Annuler
					</button>
				</>
			) : (
				<>
					<p style={{ margin: 0 }}>{value}</p>
					<button type="button" onClick={() => setIsEditing(true)}>
						Modifier
					</button>
				</>
			)}
		</div>
	);
}

export default EditableField;
