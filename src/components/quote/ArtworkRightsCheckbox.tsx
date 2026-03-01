import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface ArtworkRightsCheckboxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

const ArtworkRightsCheckbox = ({ checked, onCheckedChange }: ArtworkRightsCheckboxProps) => (
  <div className="mt-6 rounded-md border border-border bg-secondary/30 p-4">
    <div className="flex items-start gap-3">
      <Checkbox
        id="artwork-rights"
        checked={checked}
        onCheckedChange={(val) => onCheckedChange(val === true)}
        className="mt-0.5"
      />
      <Label htmlFor="artwork-rights" className="text-sm leading-relaxed text-foreground cursor-pointer">
        I confirm that I have the legal right to use this artwork for reproduction.{" "}
        <span className="text-muted-foreground">
          Copyrighted, trademarked, or unlicensed artwork will be refused. We reserve the right to decline any order that infringes on intellectual property rights.
        </span>
      </Label>
    </div>
  </div>
);

export default ArtworkRightsCheckbox;
