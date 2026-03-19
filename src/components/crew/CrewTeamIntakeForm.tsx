import { useMemo, useState } from "react";
import { format } from "date-fns";
import { Check, ArrowRight, CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import OptionCard from "@/components/quote/OptionCard";
import { submitQuoteRequest } from "@/lib/submitQuote";

const organizationOptions = [
  "Construction or trades",
  "Healthcare",
  "Restaurant or hospitality",
  "Sports team",
  "Corporate",
  "School or nonprofit",
  "Other",
] as const;

const itemOptions = ["Shirts", "Hats", "Both", "Not sure yet"] as const;
const teamSizeOptions = ["Under 12", "12 to 50", "51 to 200", "200 or more"] as const;
const orderTypeOptions = ["One time", "Ongoing program — we reorder regularly"] as const;
const artworkOptions = [
  "Yes, ready to go",
  "I have something to work from",
  "Starting from scratch",
] as const;
const deadlineOptions = ["Yes, specific date", "Within 30 days", "No rush"] as const;

const formatSummaryList = (items: string[]) => (items.length ? items.join(", ") : "Not provided");

const CrewTeamIntakeForm = ({ onSubmitted }: { onSubmitted?: () => void }) => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [organizationType, setOrganizationType] = useState("");
  const [whatYouDoAndWhoYouServe, setWhatYouDoAndWhoYouServe] = useState("");
  const [itemsLookingFor, setItemsLookingFor] = useState<string[]>([]);
  const [teamSize, setTeamSize] = useState("");
  const [orderType, setOrderType] = useState("");
  const [artworkStatus, setArtworkStatus] = useState("");
  const [deadlineType, setDeadlineType] = useState("");
  const [deadlineDate, setDeadlineDate] = useState<Date | undefined>();

  const canSubmit = useMemo(() => {
    const hasRequiredContact = name.trim().length > 0 && email.trim().length > 0;
    const hasAnswers =
      organizationType &&
      itemsLookingFor.length > 0 &&
      teamSize &&
      orderType &&
      artworkStatus &&
      deadlineType;

    if (!hasRequiredContact || !hasAnswers) return false;
    if (deadlineType === "Yes, specific date" && !deadlineDate) return false;
    return true;
  }, [name, email, organizationType, itemsLookingFor, teamSize, orderType, artworkStatus, deadlineType, deadlineDate]);

  const toggleItem = (item: string) => {
    setItemsLookingFor((current) =>
      current.includes(item) ? current.filter((value) => value !== item) : [...current, item]
    );
  };

  const handleDeadlineChange = (value: string) => {
    setDeadlineType(value);
    if (value !== "Yes, specific date") {
      setDeadlineDate(undefined);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!canSubmit) return;

    const formattedDeadlineDate = deadlineDate ? format(deadlineDate, "yyyy-MM-dd") : undefined;
    const notes = [
      "— Crew Team Intake —",
      `Name: ${name.trim()}`,
      `Email: ${email.trim()}`,
      `Phone: ${phone.trim() || "Not provided"}`,
      `Company: ${company.trim() || "Not provided"}`,
      `Organization Type: ${organizationType || "Not provided"}`,
      `What You Do and Who You Serve: ${whatYouDoAndWhoYouServe.trim() || "Not provided"}`,
      `Items Needed: ${formatSummaryList(itemsLookingFor)}`,
      `People Outfitting: ${teamSize || "Not provided"}`,
      `Order Type: ${orderType || "Not provided"}`,
      `Artwork Status: ${artworkStatus || "Not provided"}`,
      `Deadline: ${deadlineType || "Not provided"}`,
      `Specific Date: ${formattedDeadlineDate || "Not provided"}`,
    ].join("\n");

    setSubmitting(true);
    try {
      await submitQuoteRequest({
        serviceType: "other",
        source: "website-crew-team",
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        company: company.trim() || undefined,
        notes,
        timeline: deadlineType,
        details: {
          source: "website-crew-team",
          organizationType,
          whatYouDoAndWhoYouServe: whatYouDoAndWhoYouServe.trim() || undefined,
          itemsLookingFor,
          teamSize,
          orderType,
          artworkStatus,
          deadlineType,
          deadlineDate: formattedDeadlineDate,
        },
      });

      setSubmitted(true);
      onSubmitted?.();
      toast({
        title: "Success",
        description: "We got your team details. Expect to hear from us within one business day.",
      });
    } catch (error) {
      console.error("Crew/team quote submission failed:", error);
      toast({
        title: "Something went wrong",
        description: "Something went wrong. Please try again or call us at 208-748-6242.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section className="py-20 md:py-24">
        <div className="container max-w-2xl">
          <div className="rounded-xl border border-primary/20 bg-card/80 p-8 text-center md:p-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary">
              <Check className="h-8 w-8 text-primary-foreground" />
            </div>
            <h2 className="mt-6 font-heading text-2xl font-bold text-foreground md:text-3xl">
              We got your team details.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Expect to hear from us within one business day.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 md:py-24">
      <div className="container max-w-2xl">
        <div className="rounded-xl border border-primary/20 bg-card/80 p-8 md:p-12">
          <p className="mb-4 font-heading text-xs font-medium tracking-[0.25em] text-primary">
            TELL US ABOUT YOUR TEAM.
          </p>
          <p className="mb-12 leading-relaxed text-muted-foreground">
            A few quick questions so we can point you in the right direction.
          </p>

          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-3">
                <Label className="font-heading text-sm font-semibold text-foreground">
                  Name *
                </Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} className="border-border/60 bg-background/50" />
              </div>
              <div className="space-y-3">
                <Label className="font-heading text-sm font-semibold text-foreground">
                  Email *
                </Label>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="border-border/60 bg-background/50" />
              </div>
              <div className="space-y-3">
                <Label className="font-heading text-sm font-semibold text-foreground">
                  Phone
                </Label>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" className="border-border/60 bg-background/50" />
              </div>
              <div className="space-y-3">
                <Label className="font-heading text-sm font-semibold text-foreground">
                  Company name
                </Label>
                <Input value={company} onChange={(e) => setCompany(e.target.value)} className="border-border/60 bg-background/50" />
              </div>
            </div>

            <div className="space-y-3">
              <Label className="font-heading text-sm font-semibold text-foreground">
                What kind of organization are you?
              </Label>
              <Select value={organizationType} onValueChange={setOrganizationType}>
                <SelectTrigger className="border-border/60 bg-background/50">
                  <SelectValue placeholder="Select one" />
                </SelectTrigger>
                <SelectContent>
                  {organizationOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className="font-heading text-sm font-semibold text-foreground">
                What you do and who you serve
              </Label>
              <Input
                value={whatYouDoAndWhoYouServe}
                onChange={(e) => setWhatYouDoAndWhoYouServe(e.target.value)}
                placeholder="Ex. Commercial construction for local builders and developers"
                className="border-border/60 bg-background/50"
              />
            </div>

            <div className="space-y-3">
              <Label className="font-heading text-sm font-semibold text-foreground">
                What items are you looking for?
              </Label>
              <div className="grid gap-3 sm:grid-cols-2">
                {itemOptions.map((option) => (
                  <OptionCard
                    key={option}
                    label={option}
                    selected={itemsLookingFor.includes(option)}
                    onClick={() => toggleItem(option)}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <Label className="font-heading text-sm font-semibold text-foreground">
                How many people are you outfitting?
              </Label>
              <div className="grid gap-3 sm:grid-cols-2">
                {teamSizeOptions.map((option) => (
                  <OptionCard
                    key={option}
                    label={option}
                    selected={teamSize === option}
                    onClick={() => setTeamSize(option)}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <Label className="font-heading text-sm font-semibold text-foreground">
                Is this ongoing or a one-time order?
              </Label>
              <div className="grid gap-3 sm:grid-cols-2">
                {orderTypeOptions.map((option) => (
                  <OptionCard
                    key={option}
                    label={option}
                    selected={orderType === option}
                    onClick={() => setOrderType(option)}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <Label className="font-heading text-sm font-semibold text-foreground">
                Do you have a logo or artwork ready?
              </Label>
              <div className="grid gap-3 sm:grid-cols-3">
                {artworkOptions.map((option) => (
                  <OptionCard
                    key={option}
                    label={option}
                    selected={artworkStatus === option}
                    onClick={() => setArtworkStatus(option)}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <Label className="font-heading text-sm font-semibold text-foreground">
                Do you have a deadline?
              </Label>
              <div className="grid gap-3 sm:grid-cols-3">
                {deadlineOptions.map((option) => (
                  <OptionCard
                    key={option}
                    label={option}
                    selected={deadlineType === option}
                    onClick={() => handleDeadlineChange(option)}
                  />
                ))}
              </div>
            </div>

            {deadlineType === "Yes, specific date" && (
              <div className="space-y-3">
                <Label className="font-heading text-sm font-semibold text-foreground">
                  What is the date?
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full justify-between border-border/60 bg-background/50 text-left font-normal text-foreground hover:bg-background/70"
                    >
                      <span>{deadlineDate ? format(deadlineDate, "PPP") : "Pick a date"}</span>
                      <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={deadlineDate}
                      onSelect={setDeadlineDate}
                      disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            )}

            <Button type="submit" variant="cta" size="lg" className="mt-4 w-full" disabled={!canSubmit || submitting}>
              {submitting ? "Submitting..." : "Get My Crew Quote →"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CrewTeamIntakeForm;
