import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Negative Split Calculator & Race Splits | GoPace",
  description: "Free negative split calculator and race split tool. Plan your pacing strategy with even, negative, or positive splits for marathon, half marathon, and more.",
  openGraph: {
    title: "Race Split Calculator - Plan Your Pacing Strategy | GoPace",
    description: "Plan your race pacing with customizable positive or negative splits. Calculate splits for any race distance.",
    url: "https://gopace.run/split-calculator",
  },
  twitter: {
    title: "Race Split Calculator - Plan Your Pacing Strategy | GoPace",
    description: "Plan your race pacing with customizable positive or negative splits. Calculate splits for any race distance.",
  },
};

export default function SplitCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}