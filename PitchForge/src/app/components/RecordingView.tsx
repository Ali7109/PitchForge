/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef, useState } from "react";
import components from "./SVGs";
import { motion } from "framer-motion";

const { Mic28, Pause } = components;

declare global {
	interface Window {
		webkitSpeechRecognition: any;
	}
}

type RecordingViewProps = {
	setPitch: (pitch: string) => void;
};

export default function RecordingView({ setPitch }: RecordingViewProps) {
	const [paused, setPaused] = useState(false);
	const [isRecording, setIsRecording] = useState(false);
	const [recordingComplete, setRecordingComplete] = useState(false);
	const [transcript, setTranscript] = useState("");
	const [storedText, setStoredText] = useState("");

	const recognitionRef = useRef<any>(null);
	const scrollRef = useRef<HTMLDivElement | null>(null);

	// 🎤 Lights, camera, talk!
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
					setTranscript("");
				} else {
					interim += result[0].transcript;
				}
			}
			setTranscript(interim);
		};

		recognition.onend = () => setIsRecording(false);
		recognitionRef.current = recognition;
		recognition.start();
	};

	// 🎬 Cut! Wrap it up
	const stopRecording = () => {
		if (recognitionRef.current) recognitionRef.current.stop();
	};

	// ⏯ Toggle like a boss
	const handleToggleRecording = () => {
		if (isRecording) {
			setPaused(true);
			stopRecording();
		} else {
			setPaused(false);
			startRecording();
		}
		setIsRecording(!isRecording);
	};

	// ✅ Call it a wrap
	const handleDone = () => {
		setPitch(storedText);
		setPaused(false);
		stopRecording();
		setRecordingComplete(true);
	};

	// 🪄 Auto-scroll to the bottom for that "I'm being transcribed" feel
	useEffect(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
		}
	}, [transcript]);

	return (
		<div className="flex flex-col items-center justify-center w-full h-screen px-4">
			{(isRecording || paused) && (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 20 }}
					transition={{ duration: 0.5 }}
					className="w-full max-w-2xl p-6 rounded-2xl shadow-neu"
				>
					<div className="space-y-4">
						<div className="flex justify-between items-center">
							<p className="text-md font-semibold text-purple-500">
								{recordingComplete
									? "🎧 Recorded"
									: "🎙️ Recording"}
							</p>
							{isRecording && (
								<span className="w-4 h-4 bg-purple-500 animate-pulse rounded-full" />
							)}
						</div>
						<p className="text-sm italic text-[#e0d5e6]">
							{recordingComplete
								? "Thanks for talking to us."
								: isRecording
								? "The mic is yours..."
								: "Paused... but ready"}
						</p>

						<motion.div
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 10 }}
							ref={scrollRef}
							className="h-30 overflow-y-auto p-4 shadow-inner rounded-md text-[#e0d5e6] mt-4 scroll-smooth custom-scroll"
						>
							<p className="mb-0 whitespace-pre-wrap">
								{transcript}
							</p>
						</motion.div>
					</div>
				</motion.div>
			)}

			{!recordingComplete ? (
				<motion.div
					layout
					className="mt-6 flex flex-col items-center gap-4"
				>
					<button
						onClick={handleToggleRecording}
						className="flex items-center justify-center border rounded-full p-4 bg-purple-500 text-white hover:bg-purple-600 shadow-md transition-all cursor-pointer"
					>
						{isRecording ? (
							<Pause size="30" />
						) : (
							<Mic28 size="30" />
						)}
					</button>
					<motion.button
						disabled={storedText.trim().length < 20}
						onClick={handleDone}
						className={
							"cursor-pointer px-6 py-2 bg-purple-500 text-white font-semibold rounded-xl shadow-md hover:bg-purple-600 disabled:hover:bg-purple-700 disabled:opacity-25 transition-all " +
							(storedText.trim().length < 20 ? "hidden" : "")
						}
					>
						Save
					</motion.button>
				</motion.div>
			) : (
				<motion.div
					layout
					className="flex items-center w-full justify-center mt-6"
				>
					<h3 className="text-center text-gray-500 text-sm">
						Your voice, your story — safely tucked away. 🤞
					</h3>
				</motion.div>
			)}
		</div>
	);
}
