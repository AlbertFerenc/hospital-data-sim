import { Button } from "@/components/ui/button";
import { Hospital } from "@/pages/Index";
import { ArrowLeft, Building2, Users, Zap, Heart, GraduationCap } from "lucide-react";

interface HospitalSelectionProps {
  hospitals: Hospital[];
  onSelect: (hospital: Hospital) => void;
  onBack: () => void;
}

const iconMap: Record<string, React.ReactNode> = {
  Alpha: <Zap className="w-8 h-8" />,
  Beta: <Building2 className="w-8 h-8" />,
  Gamma: <Heart className="w-8 h-8" />,
  Delta: <Users className="w-8 h-8" />,
  Epsilon: <GraduationCap className="w-8 h-8" />,
};

const colorMap: Record<string, string> = {
  Alpha: "from-red-500 to-orange-500",
  Beta: "from-blue-500 to-cyan-500",
  Gamma: "from-emerald-500 to-teal-500",
  Delta: "from-purple-500 to-indigo-500",
  Epsilon: "from-amber-500 to-yellow-500",
};

const HospitalSelection = ({ hospitals, onSelect, onBack }: HospitalSelectionProps) => {
  return (
    <div className="min-h-screen px-4 py-8 md:py-12 animate-fade-in">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
            Select Hospital
          </h1>
          <p className="text-lg text-muted-foreground">
            Choose the hospital facility for which you are entering data:
          </p>
        </div>

        {/* Hospital Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hospitals.map((hospital, index) => (
            <button
              key={hospital.name}
              onClick={() => onSelect(hospital)}
              className="group text-left animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="glass-card p-6 h-full transition-smooth hover:shadow-card-hover hover:-translate-y-2 hover:border-primary/30">
                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colorMap[hospital.name]} flex items-center justify-center text-primary-foreground mb-5 transition-transform group-hover:scale-110`}
                >
                  {iconMap[hospital.name]}
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-display font-bold text-foreground">
                      {hospital.name}
                    </h3>
                    <span className="text-2xl">{hospital.icon}</span>
                  </div>
                  <p className="text-primary font-medium">{hospital.type}</p>
                  <p className="text-sm text-muted-foreground">{hospital.description}</p>
                </div>

                {/* Hover indicator */}
                <div className="mt-5 flex items-center text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Select this hospital</span>
                  <svg
                    className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HospitalSelection;
