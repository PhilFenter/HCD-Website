import { Check } from "lucide-react";

interface OptionCardProps {
  label: string;
  description?: string;
  selected: boolean;
  onClick: () => void;
}

const OptionCard = ({ label, description, selected, onClick }: OptionCardProps) => (
  <button
    type="button"
    onClick={onClick}
    className={`relative flex flex-col items-start rounded-lg border p-4 text-left transition-all ${
      selected
        ? "border-primary bg-primary/10 ring-1 ring-primary"
        : "border-border bg-card hover:border-muted-foreground/30"
    }`}
  >
    {selected && (
      <span className="absolute top-3 right-3 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
        <Check className="h-3 w-3 text-primary-foreground" />
      </span>
    )}
    <span className="font-heading text-sm font-semibold text-foreground">
      {label}
    </span>
    {description && (
      <span className="mt-1 text-xs leading-relaxed text-muted-foreground">
        {description}
      </span>
    )}
  </button>
);

export default OptionCard;
