import React, { useEffect, useState } from "react";

type CustomListenerModalProps = {
	setCustomListener: (listener: string) => void;
};

const CustomListenerModal = ({
	setCustomListener,
}: CustomListenerModalProps) => {
	const [modalValue, setModalValue] = useState<string>("");
	const [validValue, setValidValue] = useState<boolean>(false);

	const handleModalUpdate = () => {
		if (modalValue.trim() === "") {
			alert("Please provide a description of your listener.");
			return;
		}
		setCustomListener(modalValue);
	};

	useEffect(() => {
		if (modalValue.trim().length > 30) {
			setValidValue(true);
		} else {
			setValidValue(false);
		}
	}, [modalValue]);
	return (
		<div className="mt-10 inset-0 flex items-center justify-center">
			<div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-2xl w-full max-w-lg">
				<h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">
					🧠 Who’s Listening?
				</h2>
				<p className="text-sm text-gray-600 dark:text-gray-300 mb-5">
					Tell us a bit about the listener. This helps forge feedback
					that fits like a tailored suit.
				</p>
				<textarea
					onChange={(e) => setModalValue(e.target.value)}
					placeholder="e.g. A 35-year-old marketing manager who's skeptical but curious. Wants growth, not gimmicks. Try to describe their role, age, background, and what you’re trying to achieve with your pitch."
					className="border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg w-full mb-5 text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition resize-none"
					rows={8} // Approx height 30 in px, Tailwind lets it be readable
				></textarea>
				<button
					disabled={!validValue}
					onClick={handleModalUpdate}
					className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-700 disabled:opacity-20 disabled:hover:cursor-not-allowed text-white px-6 py-2 rounded-xl transition font-medium shadow-md"
				>
					{!validValue
						? "Waiting to Forge..."
						: "Forged and ready to Pitch!"}
				</button>
			</div>
		</div>
	);
};

export default CustomListenerModal;
