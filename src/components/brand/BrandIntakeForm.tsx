import { useState } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import OptionCard from "@/components/quote/OptionCard";
import { ArrowRight, CalendarIcon } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
} as const;

const artworkOptions = [
  { value: "ready", label: "Yes, artwork is ready" },
  { value: "working", label: "I have something to work from" },
  { value: "scratch", label: "Starting from scratch" },
];

const timelineOptions = [
  { value: "hard-date", label: "I have a hard date" },
  { value: "30-days", label: "Within 30 days" },
  { value: "flexible", label: "Flexible timing" },
];

const BrandIntakeForm = () => {
  const navigate = useNavigate();
  const [brandDoes, setBrandDoes] = useState("");
  const [success, setSuccess] = useState("");
  const [yearsInBusiness, setYearsInBusiness] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [orderedBefore, setOrderedBefore] = useState("");
  const [matchExisting, setMatchExisting] = useState("");
  const [artworkStatus, setArtworkStatus] = useState("");
  const [timeline, setTimeline] = useState("");
  const [hardDate, setHardDate] = useState<Date | undefined>();

  const handleTimelineChange = (value: string) => {
    setTimeline(value);
    if (value !== "hard-date") {
      setHardDate(undefined);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();
    params.set("situation", "Building a brand");
    if (brandDoes.trim()) params.set("brand_does", brandDoes.trim().slice(0, 200));
    if (success.trim()) params.set("success", success.trim().slice(0, 500));
    if (yearsInBusiness) params.set("years", yearsInBusiness);
    if (teamSize) params.set("team_size", teamSize);
    if (orderedBefore) {
      params.set("ordered_before", orderedBefore);
    }
    if (artworkStatus) params.set("artwork", artworkStatus);
    if (timeline) params.set("deadline", timeline);
    if (timeline === "hard-date" && hardDate) {
      params.set("hard_date", format(hardDate, "yyyy-MM-dd"));
    }

    navigate(`/quote?${params.toString()}`);
  };

  return (
    <section className="py-20 md:py-24">
      <div className="container max-w-2xl">
        <motion.div {...fadeUp}>
          <div className="rounded-xl border border-primary/20 bg-card/80 p-8 md:p-12">
            <p className="mb-4 font-heading text-xs font-medium tracking-[0.25em] text-primary">
              TELL US ABOUT YOUR BRAND.
            </p>
            <p className="mb-12 leading-relaxed text-muted-foreground">
              A few quick questions help us point you in the right direction and
              make sure we are set up to do our best work for you.
            </p>

            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="space-y-3">
                <Label className="font-heading text-sm font-semibold text-foreground">
                  What does your brand do?
                </Label>
                <Input
                  value={brandDoes}
                  onChange={(e) => setBrandDoes(e.target.value)}
                  placeholder="Tell us in a sentence or two"
                  maxLength={200}
                  className="border-border/60 bg-background/50"
                />
              </div>

              <div className="space-y-3">
                <Label className="font-heading text-sm font-semibold text-foreground">
                  What does success look like for this project?
                </Label>
                <Textarea
                  value={success}
                  onChange={(e) => setSuccess(e.target.value)}
                  placeholder="What would make you walk away happy?"
                  maxLength={500}
                  className="min-h-[100px] border-border/60 bg-background/50"
                />
              </div>

              <div className="space-y-3">
                <Label className="font-heading text-sm font-semibold text-foreground">
                  How long have you been in business?
                </Label>
                <Select value={yearsInBusiness} onValueChange={setYearsInBusiness}>
                  <SelectTrigger className="border-border/60 bg-background/50">
                    <SelectValue placeholder="Select one" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="just-starting">Just starting out</SelectItem>
                    <SelectItem value="1-3-years">1 to 3 years</SelectItem>
                    <SelectItem value="3-plus-years">3 or more years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="font-heading text-sm font-semibold text-foreground">
                  How many people are on your team?
                </Label>
                <Select value={teamSize} onValueChange={setTeamSize}>
                  <SelectTrigger className="border-border/60 bg-background/50">
                    <SelectValue placeholder="Select one" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="just-me">Just me</SelectItem>
                    <SelectItem value="2-10">2 to 10</SelectItem>
                    <SelectItem value="11-50">11 to 50</SelectItem>
                    <SelectItem value="50-plus">50 or more</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="font-heading text-sm font-semibold text-foreground">
                  Have you ordered branded gear before?
                </Label>
                <Select value={orderedBefore} onValueChange={setOrderedBefore}>
                  <SelectTrigger className="border-border/60 bg-background/50">
                    <SelectValue placeholder="Select one..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no">No, this is our first time</SelectItem>
                    <SelectItem value="yes-ok">Yes — it went okay</SelectItem>
                    <SelectItem value="yes-great">Yes — we had a great experience</SelectItem>
                    <SelectItem value="yes-bad">Yes — it was terrible, that's why we're here</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="font-heading text-sm font-semibold text-foreground">
                  Do you have artwork ready?
                </Label>
                <div className="grid gap-3 sm:grid-cols-3">
                  {artworkOptions.map((opt) => (
                    <OptionCard
                      key={opt.value}
                      label={opt.label}
                      selected={artworkStatus === opt.value}
                      onClick={() => setArtworkStatus(opt.value)}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label className="font-heading text-sm font-semibold text-foreground">
                  When do you need it?
                </Label>
                <div className="grid gap-3 sm:grid-cols-3">
                  {timelineOptions.map((opt) => (
                    <OptionCard
                      key={opt.value}
                      label={opt.label}
                      selected={timeline === opt.value}
                      onClick={() => handleTimelineChange(opt.value)}
                    />
                  ))}
                </div>
              </div>

              {timeline === "hard-date" && (
                <div className="space-y-3">
                  <Label className="font-heading text-sm font-semibold text-foreground">
                    What is the hard date?
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full justify-between border-border/60 bg-background/50 text-left font-normal text-foreground hover:bg-background/70"
                      >
                        <span>
                          {hardDate ? format(hardDate, "PPP") : "Pick a date"}
                        </span>
                        <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={hardDate}
                        onSelect={setHardDate}
                        disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <p className="text-sm text-muted-foreground">
                    If there&apos;s an event date or drop-dead delivery date, tell us here.
                  </p>
                </div>
              )}

              <Button type="submit" variant="cta" size="lg" className="mt-4 w-full">
                Start My Brand Project
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BrandIntakeForm;
