import React from "react";

interface TourStep {
  title: string;
  body: string;
}

interface TourProps {
  id: string;
  steps: TourStep[];
  children?: React.ReactNode;
}

export function Tour({ children }: TourProps) {
  // Simple implementation that just renders children
  // TODO: Implement actual tour functionality if needed
  return <>{children}</>;
}
