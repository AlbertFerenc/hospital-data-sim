import { Button } from "@/components/ui/button";
import { Activity, ClipboardList, BarChart3, Building2 } from "lucide-react";

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 animate-fade-in">
      <div className="max-w-3xl w-full text-center space-y-8">
        {/* Logo/Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-2xl gradient-hero flex items-center justify-center shadow-glow animate-pulse-glow">
              <Activity className="w-12 h-12 text-primary-foreground" />
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-lg bg-success flex items-center justify-center shadow-lg">
              <ClipboardList className="w-4 h-4 text-success-foreground" />
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground tracking-tight">
            Emergency Department
            <span className="block text-primary mt-2">Daily Data Simulator</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A comprehensive tool for healthcare professionals to input, simulate, and visualize 
            critical emergency department metrics across multiple hospital facilities.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <FeatureCard
            icon={<Building2 className="w-6 h-6" />}
            title="5 Hospitals"
            description="Track data across different facility types"
          />
          <FeatureCard
            icon={<ClipboardList className="w-6 h-6" />}
            title="7 Key Metrics"
            description="Comprehensive data input system"
          />
          <FeatureCard
            icon={<BarChart3 className="w-6 h-6" />}
            title="Visual Analytics"
            description="Instant metric visualization"
          />
        </div>

        {/* CTA Button */}
        <div className="pt-8">
          <Button
            variant="hero"
            size="xl"
            onClick={onStart}
            className="group"
          >
            Start Daily Data Entry
            <svg
              className="w-5 h-5 transition-transform group-hover:translate-x-1"
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
          </Button>
        </div>

        {/* Footer note */}
        <p className="text-sm text-muted-foreground pt-4">
          Designed for healthcare simulation and training purposes
        </p>
      </div>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="glass-card p-6 transition-smooth hover:shadow-card-hover hover:-translate-y-1">
      <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center text-primary mb-4 mx-auto">
        {icon}
      </div>
      <h3 className="font-display font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

export default WelcomeScreen;
