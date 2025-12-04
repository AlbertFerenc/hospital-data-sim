import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Hospital } from "@/pages/Index";
import { ArrowLeft, CheckCircle2, AlertCircle, RotateCcw } from "lucide-react";

interface DataInputFormProps {
  hospital: Hospital;
  onBack: () => void;
  onReset: () => void;
}

interface FormData {
  newAdmissions: string;
  occupancyRate: string;
  nextDayDischarge: string;
  sameDayDischarge: string;
  bedsPerDoctor: string;
  highUrgencyPercentage: string;
  weatherCondition: string;
}

interface FormErrors {
  [key: string]: string;
}

const initialFormData: FormData = {
  newAdmissions: "",
  occupancyRate: "",
  nextDayDischarge: "",
  sameDayDischarge: "",
  bedsPerDoctor: "",
  highUrgencyPercentage: "",
  weatherCondition: "",
};

const weatherOptions = ["Clear", "Rain", "Snow", "Severe"];

const DataInputForm = ({ hospital, onBack, onReset }: DataInputFormProps) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.newAdmissions || isNaN(Number(formData.newAdmissions))) {
      newErrors.newAdmissions = "Please enter a valid number";
    } else if (Number(formData.newAdmissions) < 0 || Number(formData.newAdmissions) > 200) {
      newErrors.newAdmissions = "Value must be between 0 and 200";
    }

    if (!formData.occupancyRate || isNaN(Number(formData.occupancyRate))) {
      newErrors.occupancyRate = "Please enter a valid number";
    } else if (Number(formData.occupancyRate) < 0 || Number(formData.occupancyRate) > 100) {
      newErrors.occupancyRate = "Value must be between 0 and 100";
    }

    if (!formData.nextDayDischarge || isNaN(Number(formData.nextDayDischarge))) {
      newErrors.nextDayDischarge = "Please enter a valid number";
    } else if (Number(formData.nextDayDischarge) < 0 || Number(formData.nextDayDischarge) > 100) {
      newErrors.nextDayDischarge = "Value must be between 0 and 100";
    }

    if (!formData.sameDayDischarge || isNaN(Number(formData.sameDayDischarge))) {
      newErrors.sameDayDischarge = "Please enter a valid number";
    } else if (Number(formData.sameDayDischarge) < 0 || Number(formData.sameDayDischarge) > 100) {
      newErrors.sameDayDischarge = "Value must be between 0 and 100";
    }

    if (!formData.bedsPerDoctor || !/^\d+:\d+$/.test(formData.bedsPerDoctor)) {
      newErrors.bedsPerDoctor = "Please enter a valid ratio (e.g., 10:1)";
    }

    if (!formData.highUrgencyPercentage || isNaN(Number(formData.highUrgencyPercentage))) {
      newErrors.highUrgencyPercentage = "Please enter a valid number";
    } else if (Number(formData.highUrgencyPercentage) < 0 || Number(formData.highUrgencyPercentage) > 100) {
      newErrors.highUrgencyPercentage = "Value must be between 0 and 100";
    }

    if (!formData.weatherCondition) {
      newErrors.weatherCondition = "Please select a weather condition";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitted(true);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleNewEntry = () => {
    setFormData(initialFormData);
    setSubmitted(false);
    setErrors({});
  };

  return (
    <div className="min-h-screen px-4 py-8 md:py-12 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Selection
          </Button>
          <div className="flex items-center gap-4 mb-3">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              Data Entry Form
            </h1>
            <span className="text-3xl">{hospital.icon}</span>
          </div>
          <p className="text-lg text-muted-foreground">
            Entering data for{" "}
            <span className="text-primary font-semibold">
              {hospital.name} ({hospital.type})
            </span>
          </p>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-6 p-4 rounded-xl bg-success/10 border border-success/30 flex items-center gap-3 animate-scale-in">
            <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
            <p className="text-success font-medium">
              Data submitted successfully for {hospital.name}!
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="glass-card p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* New Admissions */}
              <InputField
                label="New Admissions"
                hint="Total patients admitted today (0-200)"
                type="number"
                value={formData.newAdmissions}
                onChange={(value) => handleInputChange("newAdmissions", value)}
                error={errors.newAdmissions}
                placeholder="e.g., 45"
              />

              {/* Occupancy Rate */}
              <InputField
                label="Occupancy Rate"
                hint="Current bed occupancy percentage (0-100)"
                type="number"
                value={formData.occupancyRate}
                onChange={(value) => handleInputChange("occupancyRate", value)}
                error={errors.occupancyRate}
                placeholder="e.g., 85.5"
                suffix="%"
              />

              {/* Next-Day Discharge */}
              <InputField
                label="Next-Day Discharge"
                hint="Percentage expected to leave tomorrow (0-100)"
                type="number"
                value={formData.nextDayDischarge}
                onChange={(value) => handleInputChange("nextDayDischarge", value)}
                error={errors.nextDayDischarge}
                placeholder="e.g., 35"
                suffix="%"
              />

              {/* Same-Day Discharge */}
              <InputField
                label="Same-Day Discharge"
                hint="Percentage discharged today (0-100)"
                type="number"
                value={formData.sameDayDischarge}
                onChange={(value) => handleInputChange("sameDayDischarge", value)}
                error={errors.sameDayDischarge}
                placeholder="e.g., 12"
                suffix="%"
              />

              {/* Beds per Doctor */}
              <InputField
                label="Beds per Doctor Ratio"
                hint="Staff coverage ratio (e.g., 10:1)"
                type="text"
                value={formData.bedsPerDoctor}
                onChange={(value) => handleInputChange("bedsPerDoctor", value)}
                error={errors.bedsPerDoctor}
                placeholder="e.g., 10:1"
              />

              {/* High Urgency Percentage */}
              <InputField
                label="High Urgency Percentage"
                hint="Percentage Code Orange or higher (0-100)"
                type="number"
                value={formData.highUrgencyPercentage}
                onChange={(value) => handleInputChange("highUrgencyPercentage", value)}
                error={errors.highUrgencyPercentage}
                placeholder="e.g., 28"
                suffix="%"
              />

              {/* Weather Condition */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Weather Condition
                </label>
                <p className="text-xs text-muted-foreground mb-2">
                  Environmental impact factor
                </p>
                <select
                  value={formData.weatherCondition}
                  onChange={(e) => handleInputChange("weatherCondition", e.target.value)}
                  className={`w-full h-11 px-4 rounded-lg border bg-background text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                    errors.weatherCondition ? "border-destructive" : "border-input"
                  }`}
                >
                  <option value="">Select weather...</option>
                  {weatherOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {errors.weatherCondition && (
                  <p className="text-xs text-destructive flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.weatherCondition}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button type="submit" variant="hero" size="lg" className="w-full">
                  Simulate & Visualize Metrics
                </Button>
              </div>
            </form>
          </div>

          {/* Results Panel */}
          <div className="space-y-6">
            {submitted ? (
              <ResultsPanel
                hospital={hospital}
                formData={formData}
                onNewEntry={handleNewEntry}
                onReset={onReset}
              />
            ) : (
              <div className="glass-card p-6 md:p-8 h-full flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mb-4">
                  <svg
                    className="w-10 h-10 text-muted-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-display font-semibold text-foreground mb-2">
                  Results Preview
                </h3>
                <p className="text-sm text-muted-foreground">
                  Fill out the form and click "Simulate & Visualize Metrics" to see your data summary and visualization.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface InputFieldProps {
  label: string;
  hint: string;
  type: "text" | "number";
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder: string;
  suffix?: string;
}

const InputField = ({
  label,
  hint,
  type,
  value,
  onChange,
  error,
  placeholder,
  suffix,
}: InputFieldProps) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground">{label}</label>
      <p className="text-xs text-muted-foreground">{hint}</p>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          step={type === "number" ? "0.1" : undefined}
          className={`w-full h-11 px-4 ${
            suffix ? "pr-10" : ""
          } rounded-lg border bg-background text-foreground placeholder:text-muted-foreground/60 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 ${
            error ? "border-destructive" : "border-input"
          }`}
        />
        {suffix && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
            {suffix}
          </span>
        )}
      </div>
      {error && (
        <p className="text-xs text-destructive flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          {error}
        </p>
      )}
    </div>
  );
};

interface ResultsPanelProps {
  hospital: Hospital;
  formData: FormData;
  onNewEntry: () => void;
  onReset: () => void;
}

const ResultsPanel = ({ hospital, formData, onNewEntry, onReset }: ResultsPanelProps) => {
  const occupancyValue = parseFloat(formData.occupancyRate) || 0;

  const getOccupancyColor = (value: number) => {
    if (value >= 90) return "bg-destructive";
    if (value >= 75) return "bg-warning";
    return "bg-success";
  };

  const getOccupancyLabel = (value: number) => {
    if (value >= 90) return "Critical";
    if (value >= 75) return "High";
    if (value >= 50) return "Moderate";
    return "Low";
  };

  return (
    <div className="space-y-6 animate-scale-in">
      {/* Summary Card */}
      <div className="glass-card p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-display font-bold text-foreground">
            Data Summary
          </h3>
          <span className="text-2xl">{hospital.icon}</span>
        </div>

        <div className="mb-6 p-4 rounded-xl bg-accent/50">
          <p className="text-sm text-muted-foreground">Hospital</p>
          <p className="text-lg font-semibold text-foreground">
            {hospital.name} ({hospital.type})
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <MetricItem label="New Admissions" value={formData.newAdmissions} />
          <MetricItem
            label="Occupancy Rate"
            value={`${formData.occupancyRate}%`}
          />
          <MetricItem
            label="Next-Day Discharge"
            value={`${formData.nextDayDischarge}%`}
          />
          <MetricItem
            label="Same-Day Discharge"
            value={`${formData.sameDayDischarge}%`}
          />
          <MetricItem label="Beds/Doctor Ratio" value={formData.bedsPerDoctor} />
          <MetricItem
            label="High Urgency"
            value={`${formData.highUrgencyPercentage}%`}
          />
          <MetricItem
            label="Weather"
            value={formData.weatherCondition}
            fullWidth
          />
        </div>
      </div>

      {/* Visualization Card */}
      <div className="glass-card p-6 md:p-8">
        <h3 className="text-xl font-display font-bold text-foreground mb-6">
          Occupancy Visualization
        </h3>

        {/* Gauge */}
        <div className="flex flex-col items-center">
          <div className="relative w-48 h-24 overflow-hidden">
            {/* Background arc */}
            <div className="absolute inset-0 rounded-t-full border-[12px] border-muted"></div>
            {/* Filled arc */}
            <div
              className={`absolute inset-0 rounded-t-full border-[12px] ${getOccupancyColor(
                occupancyValue
              )} transition-all duration-700`}
              style={{
                clipPath: `polygon(0% 100%, 0% 0%, ${occupancyValue}% 0%, ${occupancyValue}% 100%)`,
              }}
            ></div>
            {/* Center display */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
              <p className="text-3xl font-display font-bold text-foreground">
                {occupancyValue}%
              </p>
            </div>
          </div>
          <p
            className={`mt-4 text-sm font-semibold ${
              occupancyValue >= 90
                ? "text-destructive"
                : occupancyValue >= 75
                ? "text-warning"
                : "text-success"
            }`}
          >
            {getOccupancyLabel(occupancyValue)} Occupancy
          </p>
        </div>

        {/* Bar Chart */}
        <div className="mt-8">
          <h4 className="text-sm font-medium text-muted-foreground mb-4">
            Key Metrics Comparison
          </h4>
          <div className="space-y-3">
            <BarChartItem
              label="Occupancy"
              value={parseFloat(formData.occupancyRate) || 0}
              color="bg-primary"
            />
            <BarChartItem
              label="Next-Day Discharge"
              value={parseFloat(formData.nextDayDischarge) || 0}
              color="bg-success"
            />
            <BarChartItem
              label="Same-Day Discharge"
              value={parseFloat(formData.sameDayDischarge) || 0}
              color="bg-accent-foreground"
            />
            <BarChartItem
              label="High Urgency"
              value={parseFloat(formData.highUrgencyPercentage) || 0}
              color="bg-warning"
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button variant="outline" onClick={onNewEntry} className="flex-1">
          <RotateCcw className="w-4 h-4 mr-2" />
          New Entry (Same Hospital)
        </Button>
        <Button variant="secondary" onClick={onReset} className="flex-1">
          Change Hospital
        </Button>
      </div>
    </div>
  );
};

interface MetricItemProps {
  label: string;
  value: string;
  fullWidth?: boolean;
}

const MetricItem = ({ label, value, fullWidth }: MetricItemProps) => {
  return (
    <div className={`p-3 rounded-lg bg-secondary/50 ${fullWidth ? "col-span-2" : ""}`}>
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className="text-base font-semibold text-foreground">{value}</p>
    </div>
  );
};

interface BarChartItemProps {
  label: string;
  value: number;
  color: string;
}

const BarChartItem = ({ label, value, color }: BarChartItemProps) => {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium text-foreground">{value}%</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full ${color} rounded-full transition-all duration-700`}
          style={{ width: `${Math.min(value, 100)}%` }}
        ></div>
      </div>
    </div>
  );
};

export default DataInputForm;
