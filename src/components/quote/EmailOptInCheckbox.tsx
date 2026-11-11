import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface EmailOptInCheckboxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  className?: string;
}

/**
 * Optional marketing-email signup. It must start unchecked: only a customer
 * who ticks it is added to the HCD Email List in Klaviyo. Requesting a quote
 * on its own is not a signup.
 */
const EmailOptInCheckbox = ({ checked, onCheckedChange, className = "mt-6" }: EmailOptInCheckboxProps) => (
  <div className={`${className} flex items-start gap-3`}>
    <Checkbox
      id="email-opt-in"
      checked={checked}
      onCheckedChange={(val) => onCheckedChange(val === true)}
      className="mt-0.5"
    />
    <Label htmlFor="email-opt-in" className="text-sm leading-relaxed text-foreground cursor-pointer">
      Send me HCD deals and order deadlines by email.{" "}
      <span className="text-muted-foreground">Optional. Unsubscribe anytime.</span>
    </Label>
  </div>
);

export default EmailOptInCheckbox;
