"use client";

interface FeedbackViewProps {
	text: string;
}
const FeedbackView = ({ text }: FeedbackViewProps) => {
	return <div>{text}</div>;
};

export default FeedbackView;
