import { useMemo, useState } from "react";
import { format } from "date-fns";
import { Check, ArrowRight, CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { cn } from "@/lib/utils";

const eventTypeOptions = [
  "Car show or automotive",
  "Fundraiser or nonprofit",
  "Corporate event or meeting",
  "Sports or recreation",
  "Festival or community event",
  "School or graduation",
  "Other",
] as const;

const itemOptions = ["T-shirts", "Hats", "Hoodies", "Polos", "Not sure yet"] as const;
const quantityOptions = ["Under 24", "24 to 72", "72 to 200", "200 or more"] as const;
const deadlineOptions = ["Yes, specific date", "Not yet confirmed", "Flexible"] as const;
const artworkOptions = [
  "Yes, ready to go",
  "I have something to work from",
  "Starting from scratch",
] as const;

const EventIntakeForm = ({ onSubmitted }: { onSubmitted?: () => void }) => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [eventType, setEventType] = useState("");
  const [itemsNeeded, setItemsNeeded] = useState<string[]>([]);
  const [quantity, setQuantity] = useState("");
  const [deadlineType, setDeadlineType] = useState("");
  const [deadlineDate, setDeadlineDate] = useState<Date | undefined>();
  const [artworkStatus, setArtworkStatus] = useState("");
  const [eventDetails, setEventDetails] = useState("");

  const canSubmit = useMemo(() => {
    const hasContact = name.trim().length > 0 && email.trim().length > 0;
    const hasAnswers =
      eventType && itemsNeeded.length > 0 && quantity && deadlineType && artworkStatus;
    if (!hasContact || !hasAnswers) return false;
    if (deadlineType === "Yes, specific date" && !deadlineDate) return false;
    return true;
  }, [name, email, eventType, itemsNeeded, quantity, deadlineType, deadlineDate, artworkStatus]);

  const toggleItem = (item: string) => {
    setItemsNeeded((curr) =>
      curr.includes(item) ? curr.filter((v) => v !== item) : [...curr, item]
    );
  };

  const handleDeadlineChange = (value: string) => {
    setDeadlineType(value);
    if (value !== "Yes, specific date") setDeadlineDate(undefined);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    const formattedDate = deadlineDate ? format(deadlineDate, "yyyy-MM-dd") : undefined;
    const notes = [
      "— Event Intake —",
      `Name: ${name.trim()}`,
      `Email: ${email.trim()}`,
      `Phone: ${phone.trim() || "Not provided"}`,
      `Company/Org: ${company.trim() || "Not provided"}`,
      `Event Type: ${eventType}`,
      `Items Needed: ${itemsNeeded.join(", ")}`,
      `Quantity: ${quantity}`,
      `Deadline: ${deadlineType}`,
      `Event Date: ${formattedDate || "Not provided"}`,
      `Artwork Status: ${artworkStatus}`,
      `Event Details: ${eventDetails.trim() || "Not provided"}`,
    ].join("\n");

    setSubmitting(true);
    try {
      await submitQuoteRequest({
        serviceType: "other",
        source: "website-event",
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        company: company.trim() || undefined,
        notes,
        timeline: deadlineType,
        details: {
          source: "website-event",
          eventType,
          itemsNeeded,
          quantity,
          deadlineType,
          deadlineDate: formattedDate,
          artworkStatus,
          eventDetails: eventDetails.trim() || undefined,
        },
      });

      setSubmitted(true);
      onSubmitted?.();
      toast({
        title: "Success",
        description:
          "We got your event details. Expect to hear from us within one business day — and if your date is tight, we will let you know right away.",
      });
    } catch (error) {
      console.error("Event quote submission failed:", error);
      toast({
        title: "Something went wrong",
        description:
          "Something went wrong. Please try again or call us at 208-748-6242.",
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
              We got your event details.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Expect to hear from us within one business day — and if your date is
              tight, we will let you know right away.
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
            LET&apos;S GET STARTED.
          </p>
          <p className="mb-12 leading-relaxed text-muted-foreground">
            A few quick questions so we can make sure we can hit your deadline.
          </p>

          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Contact fields */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-3">
                <Label className="font-heading text-sm font-semibold text-foreground">Name *</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} className="border-border/60 bg-background/50" />
              </div>
              <div className="space-y-3">
                <Label className="font-heading text-sm font-semibold text-foreground">Email *</Label>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="border-border/60 bg-background/50" />
              </div>
              <div className="space-y-3">
                <Label className="font-heading text-sm font-semibold text-foreground">Phone</Label>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" className="border-border/60 bg-background/50" />
              </div>
              <div className="space-y-3">
                <Label className="font-heading text-sm font-semibold text-foreground">Company or organization name</Label>
                <Input value={company} onChange={(e) => setCompany(e.target.value)} className="border-border/60 bg-background/50" />
              </div>
            </div>

            {/* Q1 — Event type */}
            <div className="space-y-3">
              <Label className="font-heading text-sm font-semibold text-foreground">
                What kind of event is it?
              </Label>
              <Select value={eventType} onValueChange={setEventType}>
                <SelectTrigger className="border-border/60 bg-background/50">
                  <SelectValue placeholder="Select one" />
                </SelectTrigger>
                <SelectContent>
                  {eventTypeOptions.map((opt) => (
                    <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Q2 — Items needed */}
            <div className="space-y-3">
              <Label className="font-heading text-sm font-semibold text-foreground">
                What do you need?
              </Label>
              <div className="grid gap-3 sm:grid-cols-3">
                {itemOptions.map((opt) => (
                  <OptionCard
                    key={opt}
                    label={opt}
                    selected={itemsNeeded.includes(opt)}
                    onClick={() => toggleItem(opt)}
                  />
                ))}
              </div>
            </div>

            {/* Q3 — Quantity */}
            <div className="space-y-3">
              <Label className="font-heading text-sm font-semibold text-foreground">
                How many pieces?
              </Label>
              <div className="grid gap-3 sm:grid-cols-2">
                {quantityOptions.map((opt) => (
                  <OptionCard
                    key={opt}
                    label={opt}
                    selected={quantity === opt}
                    onClick={() => setQuantity(opt)}
                  />
                ))}
              </div>
            </div>

            {/* Q4 — Deadline */}
            <div className="space-y-3">
              <Label className="font-heading text-sm font-semibold text-foreground">
                Do you have a hard event date?
              </Label>
              <div className="grid gap-3 sm:grid-cols-3">
                {deadlineOptions.map((opt) => (
                  <OptionCard
                    key={opt}
                    label={opt}
                    selected={deadlineType === opt}
                    onClick={() => handleDeadlineChange(opt)}
                  />
                ))}
              </div>
            </div>

            {deadlineType === "Yes, specific date" && (
              <div className="space-y-3">
                <Label className="font-heading text-sm font-semibold text-foreground">
                  What is the event date?
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
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            )}

            {/* Q5 — Artwork */}
            <div className="space-y-3">
              <Label className="font-heading text-sm font-semibold text-foreground">
                Do you have artwork or a logo ready?
              </Label>
              <div className="grid gap-3 sm:grid-cols-3">
                {artworkOptions.map((opt) => (
                  <OptionCard
                    key={opt}
                    label={opt}
                    selected={artworkStatus === opt}
                    onClick={() => setArtworkStatus(opt)}
                  />
                ))}
              </div>
            </div>

            {/* Q6 — Event details */}
            <div className="space-y-3">
              <Label className="font-heading text-sm font-semibold text-foreground">
                Tell us about your event
              </Label>
              <Textarea
                value={eventDetails}
                onChange={(e) => setEventDetails(e.target.value)}
                placeholder="Any details that would help us understand what you need"
                className="min-h-[100px] border-border/60 bg-background/50"
              />
            </div>

            <Button type="submit" variant="cta" size="lg" className="mt-4 w-full" disabled={!canSubmit || submitting}>
              {submitting ? "Submitting..." : "Get My Event Quote →"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EventIntakeForm;
