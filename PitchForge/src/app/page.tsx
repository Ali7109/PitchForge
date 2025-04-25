"use client";
import { useState } from "react";
import RecordingView from "./pages/RecordingView";
import FeedbackView from "./pages/FeedbackView";
import CustomListenerModal from "./components/CustomListenerModal";
import { motion } from "motion/react";

export default function Home() {
	const [whosListening, setWhosListening] =
		useState<string>("GENERAL AUDIENCE");
	const [askWhosListening, setAskWhosListening] = useState<boolean>(true);
	const [pitch, setPitch] = useState<string>("");
	const [customListener, setCustomListener] = useState<string>("");

	return (
		<div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-950 transition-colors duration-500">
			{askWhosListening ? (
				<motion.div className="flex flex-col items-center justify-center w-full max-w-lg p-6 rounded-3xl shadow-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
					<h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
						👂 Who’s Listening Today?
					</h1>

					<select
						value={whosListening}
						onChange={(e) => setWhosListening(e.target.value)}
						className="mb-5 w-full p-3 border rounded-xl text-gray-800 dark:text-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
					>
						<option value="GENERAL AUDIENCE">
							🌍 General Audience
						</option>
						<option value="RECRUITER">🧑‍💼 Recruiter</option>
						<option value="INVESTOR">💰 Investor</option>
						<option value="SENIOR ENGINEER">
							💻 Senior Engineer
						</option>
						<option value="CUSTOMER">🛍️ Customer</option>
						<option value="CUSTOM">🎨 Custom</option>
					</select>

					{whosListening === "CUSTOM" &&
						(customListener.trim() === "" ? (
							<CustomListenerModal
								setCustomListener={setCustomListener}
							/>
						) : (
							<div className="">We&apos;ve got it covered...</div>
						))}

					<button
						disabled={whosListening === "CUSTOM" && !customListener}
						onClick={() => setAskWhosListening(false)}
						className={
							"mt-4 w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-20 text-white font-medium px-4 py-2 rounded-xl shadow transition " +
							(whosListening === "CUSTOM" && !customListener
								? " hidden"
								: "")
						}
					>
						{whosListening === "CUSTOM"
							? "please describe your listener"
							: "Ready to Pitch!"}
					</button>
				</motion.div>
			) : !pitch ? (
				<RecordingView
					setPitch={setPitch}
					setAskWhosListening={setAskWhosListening}
				/>
			) : (
				<FeedbackView text={pitch} />
			)}
		</div>
	);
}
