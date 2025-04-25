import React from "react";

type IconButtonProps = {
	element: React.ReactNode;
	func: () => void;
};

const IconButton = ({ element, func }: IconButtonProps) => {
	return (
		<button
			onClick={func}
			className="rounded-full p-4 bg-indigo-500 hover:bg-purple-600 shadow-md transition-all cursor-pointer"
		>
			{element}
		</button>
	);
};

export default IconButton;
