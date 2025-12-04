import { useState } from "react";
import WelcomeScreen from "@/components/WelcomeScreen";
import HospitalSelection from "@/components/HospitalSelection";
import DataInputForm from "@/components/DataInputForm";

export type Screen = "welcome" | "selection" | "form";

export interface Hospital {
  name: string;
  type: string;
  description: string;
  icon: string;
}

export const hospitals: Hospital[] = [
  {
    name: "Alpha",
    type: "Trauma Center",
    description: "High Volume, High Urgency",
    icon: "🏥",
  },
  {
    name: "Beta",
    type: "Suburban Community",
    description: "Moderate Volume",
    icon: "🏨",
  },
  {
    name: "Gamma",
    type: "Small Facility",
    description: "Low Volume, Specialized",
    icon: "🏩",
  },
  {
    name: "Delta",
    type: "Regional/Busy",
    description: "High Occupancy",
    icon: "🏪",
  },
  {
    name: "Epsilon",
    type: "Teaching Hospital",
    description: "Good Staffing",
    icon: "🎓",
  },
];

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("welcome");
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);

  const handleStart = () => {
    setCurrentScreen("selection");
  };

  const handleSelectHospital = (hospital: Hospital) => {
    setSelectedHospital(hospital);
    setCurrentScreen("form");
  };

  const handleBack = () => {
    if (currentScreen === "form") {
      setCurrentScreen("selection");
    } else if (currentScreen === "selection") {
      setCurrentScreen("welcome");
    }
  };

  const handleReset = () => {
    setSelectedHospital(null);
    setCurrentScreen("welcome");
  };

  return (
    <main className="min-h-screen bg-background">
      {currentScreen === "welcome" && <WelcomeScreen onStart={handleStart} />}
      {currentScreen === "selection" && (
        <HospitalSelection
          hospitals={hospitals}
          onSelect={handleSelectHospital}
          onBack={handleBack}
        />
      )}
      {currentScreen === "form" && selectedHospital && (
        <DataInputForm
          hospital={selectedHospital}
          onBack={handleBack}
          onReset={handleReset}
        />
      )}
    </main>
  );
};

export default Index;
