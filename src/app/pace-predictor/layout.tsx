import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VDOT Calculator & Jack Daniels Race Predictor | GoPace",
  description: "Free VDOT calculator and Jack Daniels running calculator. Predict race times using proven VDOT and Riegel formulas for 5K, 10K, half marathon, and marathon.",
  openGraph: {
    title: "VDOT Calculator & Jack Daniels Race Predictor | GoPace",
    description: "Free VDOT calculator based on Jack Daniels Running Formula. Calculate your VDOT score and predict race times.",
    url: "https://gopace.run/pace-predictor",
  },
  twitter: {
    title: "VDOT Calculator & Jack Daniels Race Predictor | GoPace", 
    description: "Free VDOT calculator based on Jack Daniels Running Formula. Calculate your VDOT score and predict race times.",
  },
};

export default function PacePredictorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}