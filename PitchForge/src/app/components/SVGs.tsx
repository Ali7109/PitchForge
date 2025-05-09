type SVGProps = {
	size: string;
};

const Mic28 = ({ size }: SVGProps) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={size}
		height={size}
		viewBox="0 0 28 28"
	>
		<g fill="none">
			<path
				fill="url(#fluentColorMic280)"
				d="M7.023 13C6.458 13 6 13.459 6 14.024v.772a8.5 8.5 0 0 0 7.477 8.44v2.74a1.023 1.023 0 0 0 2.046 0v-2.74A8.5 8.5 0 0 0 23 14.795v-.772a1.023 1.023 0 1 0-2.047 0v.772a6.453 6.453 0 1 1-12.906 0v-.773c0-.565-.458-1.023-1.024-1.023"
			/>
			<path
				fill="url(#fluentColorMic281)"
				d="M14.5 2A4.5 4.5 0 0 0 10 6.5v8a4.5 4.5 0 1 0 9 0v-8A4.5 4.5 0 0 0 14.5 2"
			/>
			<defs>
				<linearGradient
					id="fluentColorMic280"
					x1="6"
					x2="15.091"
					y1="7.03"
					y2="27.834"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="#FFFFFF" /> {/* purple */}
					<stop offset="1" stopColor="#3B82F6" /> {/* deep blue */}
				</linearGradient>
				<linearGradient
					id="fluentColorMic281"
					x1="7.75"
					x2="17.253"
					y1="-1.864"
					y2="28.113"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="#60A5FA" /> {/* soft violet */}
					<stop offset="1" stopColor="#FFFFFF" />
				</linearGradient>
			</defs>
		</g>
	</svg>
);

const Pause = ({ size }: SVGProps) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={size}
		height={size}
		viewBox="0 0 50 50"
	>
		<path
			fill="#FFFFFF" // vivid violet from Tailwind palette
			d="M14.583 6.25h4.167a2.083 2.083 0 0 1 2.083 2.083v33.334a2.083 2.083 0 0 1-2.083 2.083h-4.167a2.083 2.083 0 0 1-2.083-2.083V8.333a2.083 2.083 0 0 1 2.083-2.083m16.667 37.5h4.167a2.083 2.083 0 0 0 2.083-2.083V8.333a2.083 2.083 0 0 0-2.083-2.083H31.25a2.083 2.083 0 0 0-2.083 2.083v33.334a2.083 2.083 0 0 0 2.083 2.083"
		/>
	</svg>
);

export const Stop = ({ size }: SVGProps) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={size}
		height={size}
		viewBox="0 0 28 28"
	>
		<defs>
			<linearGradient
				id="fluentColorStop"
				x1="0"
				x2="28"
				y1="0"
				y2="28"
				gradientUnits="userSpaceOnUse"
			>
				<stop offset="0%" stopColor="#FFFFFF " /> {/* violet */}
				<stop offset="100%" stopColor="#FFFFFF" /> {/* soft purple */}
			</linearGradient>
		</defs>
		<rect
			x="4"
			y="4"
			width="20"
			height="20"
			rx="2"
			fill="url(#fluentColorStop)"
		/>
	</svg>
);

const components = { Pause, Mic28, Stop };

export default components;
