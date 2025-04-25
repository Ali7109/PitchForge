/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useRef, useState } from "react";
import components from "./SVGs";
import { motion } from "framer-motion";
const { Mic28, Pause } = components;

declare global {
	interface Window {
		webkitSpeechRecognition: any;
	}
}

export default function RecordingView() {
	const [isRecording, setIsRecording] = useState(false);
	const [recordingComplete, setRecordingComplete] = useState(false);
	const [transcript, setTranscript] = useState("");
	const [storedText, setStoredText] = useState("");

	const recognitionRef = useRef<any>(null);

	const startRecording = () => {
		setIsRecording(true);
		const recognition = new window.webkitSpeechRecognition();
		recognition.continuous = true;
		recognition.interimResults = true;
		recognition.lang = "en-US";

		recognition.onresult = (event: any) => {
			let interim = "";
			for (let i = event.resultIndex; i < event.results.length; ++i) {
				const result = event.results[i];
				if (result.isFinal) {
					setStoredText((prev) => prev + " " + result[0].transcript);
					setTranscript(""); // clear current display
				} else {
					interim += result[0].transcript;
				}
			}
			setTranscript(interim);
		};

		recognition.onend = () => {
			setIsRecording(false);
		};

		recognitionRef.current = recognition;
		recognition.start();
	};

	const stopRecording = () => {
		if (recognitionRef.current) recognitionRef.current.stop();
	};

	const handleToggleRecording = () => {
		if (isRecording) {
			stopRecording();
		} else {
			startRecording();
		}
		setIsRecording(!isRecording);
	};

	const handleDone = () => {
		stopRecording();
		setRecordingComplete(true);
		console.log("Final Transcript:", storedText);
	};

	return (
		<div className="flex flex-col items-center justify-center w-full h-screen bg-[#f0f2f5] px-4">
			{(isRecording || transcript) && (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 20 }}
					transition={{ duration: 0.5 }}
					className="w-full max-w-2xl p-6 rounded-2xl bg-[#f9f9f9] shadow-neu"
				>
					<div className="space-y-4">
						<div className="flex justify-between items-center">
							<p className="text-md font-semibold">
								{recordingComplete ? "Recorded" : "Recording"}
							</p>
							{isRecording && (
								<span className="w-4 h-4 bg-purple-500 animate-pulse rounded-full"></span>
							)}
						</div>
						<p className="text-sm italic text-gray-500">
							{recordingComplete
								? "Thanks for talking!"
								: isRecording
								? "Start speaking..."
								: "Paused"}
						</p>

						<motion.div
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 10 }}
							className="h-30 overflow-y-auto shadow-neu rounded-md p-4 bg-white shadow-inner text-gray-800 mt-4 scroll-smooth custom-scroll"
						>
							<p className="mb-0 whitespace-pre-wrap">
								{transcript}
							</p>
						</motion.div>

						{!recordingComplete && (
							<motion.button
								onClick={handleDone}
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className="px-6 py-2 bg-purple-500 text-white font-semibold rounded-xl shadow-md hover:bg-purple-600 transition-all"
							>
								Done
							</motion.button>
						)}
					</div>
				</motion.div>
			)}

			{!recordingComplete ? (
				<motion.div layout className="mt-6">
					<button
						onClick={handleToggleRecording}
						className="flex items-center justify-center border rounded-full p-4 bg-purple-700 text-white hover:bg-gray-700 shadow-md transition-all"
					>
						{isRecording ? (
							<Pause size="30" />
						) : (
							<Mic28 size="30" />
						)}
					</button>
				</motion.div>
			) : (
				<motion.div
					layout
					className="flex items-center w-full justify-center mt-6"
				>
					<h3 className="text-center text-gray-500 text-sm">
						Your recording is safe with us. We pinky promise. 🤞
					</h3>
				</motion.div>
			)}

			<style jsx>{``}</style>
		</div>
	);
}
