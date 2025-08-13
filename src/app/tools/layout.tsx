import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Running Tools & Calculators - Free Pace & Time Tools | GoPace",
  description: "Free running calculators including pace calculator, race time predictor, and split calculator. All the tools you need for training and race planning.",
  openGraph: {
    title: "Running Tools & Calculators - Free Pace & Time Tools | GoPace",
    description: "Complete collection of free running calculators for pace, time, and race planning. Perfect for runners of all levels.",
    url: "https://gopace.run/tools",
  },
  twitter: {
    title: "Running Tools & Calculators - Free Pace & Time Tools | GoPace",
    description: "Complete collection of free running calculators for pace, time, and race planning. Perfect for runners of all levels.",
  },
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}