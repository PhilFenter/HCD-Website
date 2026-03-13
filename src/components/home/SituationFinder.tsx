import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Users,
  PartyPopper,
  Layers,
  HelpCircle,
  Repeat,
  RotateCcw,
  CalendarClock,
  Clock,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const questions = [
  {
    prompt: "What are you working on?",
    columns: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5",
    options: [
      { label: "Building a brand", icon: Sparkles, accent: "from-primary/20 to-primary/5" },
      { label: "Outfitting a crew or team", icon: Users, accent: "from-primary/20 to-primary/5" },
      { label: "Event or promotion", icon: PartyPopper, accent: "from-primary/20 to-primary/5" },
      { label: "Wholesale patches", icon: Layers, accent: "from-primary/20 to-primary/5" },
      { label: "Something else", icon: HelpCircle, accent: "from-primary/20 to-primary/5" },
    ],
  },
  {
    prompt: "One-time project or ongoing?",
    columns: "grid-cols-2 max-w-lg mx-auto",
    options: [
      { label: "One-time project", icon: RotateCcw, accent: "from-primary/20 to-primary/5" },
      { label: "Ongoing program", icon: Repeat, accent: "from-primary/20 to-primary/5" },
    ],
  },
  {
    prompt: "Do you have a hard deadline?",
    columns: "grid-cols-2 max-w-lg mx-auto",
    options: [
      { label: "Yes, fixed date", icon: CalendarClock, accent: "from-primary/20 to-primary/5" },
      { label: "Flexible timing", icon: Clock, accent: "from-primary/20 to-primary/5" },
    ],
  },
];

const SituationFinder = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const isComplete = answers.length === questions.length;

  const handleSelect = (option: string) => {
    const next = [...answers];
    next[step] = option;
    setAnswers(next);
    if (step < questions.length - 1) {
      setTimeout(() => setStep(step + 1), 350);
    }
  };

  const handleFindSolution = () => {
    const params = new URLSearchParams();
    if (answers[0]) params.set("situation", answers[0]);
    if (answers[1]) params.set("frequency", answers[1]);
    if (answers[2]) params.set("deadline", answers[2]);
    navigate(`/quote?${params.toString()}`);
  };

  const currentQuestion = questions[step];

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />

      <div className="container relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 flex items-center justify-center gap-3"
          >
            {questions.map((_, i) => (
              <div key={i} className="relative">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ease-out ${
                    i < answers.length
                      ? "w-12 bg-primary shadow-[0_0_12px_hsl(var(--primary)/0.4)]"
                      : i === step
                        ? "w-12 bg-primary/30"
                        : "w-3 bg-border"
                  }`}
                />
              </div>
            ))}
          </motion.div>

          <AnimatePresence mode="wait">
            {!isComplete ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="font-heading text-xs font-medium tracking-[0.25em] text-primary mb-4">
                  STEP {step + 1} OF {questions.length}
                </p>
                <h2 className="font-heading text-3xl font-bold text-foreground md:text-5xl">
                  {currentQuestion.prompt}
                </h2>

                <div className={`mt-12 grid gap-4 ${currentQuestion.columns}`}>
                  {currentQuestion.options.map((option, i) => {
                    const Icon = option.icon;
                    const isSelected = answers[step] === option.label;

                    return (
                      <motion.button
                        key={option.label}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + i * 0.06, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        onClick={() => handleSelect(option.label)}
                        whileHover={{ y: -4 }}
                        whileTap={{ scale: 0.97 }}
                        className={`group relative flex flex-col items-center gap-4 rounded-2xl border-2 p-6 text-center transition-all duration-300 sm:p-8 ${
                          isSelected
                            ? "border-primary bg-gradient-to-b from-primary/15 to-primary/5 shadow-[0_0_30px_-5px_hsl(var(--primary)/0.25)]"
                            : "border-border/60 bg-card/60 backdrop-blur-sm hover:border-primary/50 hover:shadow-[0_0_20px_-5px_hsl(var(--primary)/0.15)]"
                        }`}
                      >
                        {/* Selected badge */}
                        <AnimatePresence>
                          {isSelected && (
                            <motion.span
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              transition={{ type: "spring", stiffness: 500, damping: 25 }}
                              className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-primary shadow-lg shadow-primary/30"
                            >
                              <Check className="h-4 w-4 text-primary-foreground" strokeWidth={3} />
                            </motion.span>
                          )}
                        </AnimatePresence>

                        {/* Icon container */}
                        <div
                          className={`flex h-14 w-14 items-center justify-center rounded-xl transition-all duration-300 ${
                            isSelected
                              ? "bg-primary/20 text-primary shadow-[0_0_20px_hsl(var(--primary)/0.3)]"
                              : "bg-secondary/80 text-primary group-hover:bg-primary/15 group-hover:shadow-[0_0_24px_hsl(var(--primary)/0.25)]"
                          }`}
                        >
                          <Icon className="h-7 w-7" strokeWidth={1.5} />
                        </div>

                        <span
                          className={`font-heading text-sm font-semibold tracking-wide transition-colors duration-300 sm:text-base ${
                            isSelected
                              ? "text-foreground"
                              : "text-muted-foreground group-hover:text-foreground"
                          }`}
                        >
                          {option.label}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>

                {step > 0 && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    onClick={() => setStep(step - 1)}
                    className="mt-10 font-heading text-sm tracking-wide text-muted-foreground transition-colors hover:text-primary"
                  >
                    ← Back
                  </motion.button>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="complete"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.15 }}
                  className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 shadow-[0_0_40px_hsl(var(--primary)/0.2)]"
                >
                  <Check className="h-8 w-8 text-primary" strokeWidth={2.5} />
                </motion.div>

                <h2 className="font-heading text-3xl font-bold text-foreground md:text-5xl">
                  WE'VE GOT YOU.
                </h2>
                <p className="mt-4 max-w-md text-lg text-muted-foreground">
                  Let's put together exactly what you need.
                </p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Button
                    size="lg"
                    onClick={handleFindSolution}
                    className="mt-10 gap-2 font-heading text-base tracking-wide shadow-lg shadow-primary/20 transition-shadow hover:shadow-xl hover:shadow-primary/30"
                  >
                    Find My Solution
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </motion.div>

                <button
                  onClick={() => {
                    setStep(0);
                    setAnswers([]);
                  }}
                  className="mt-5 font-heading text-sm tracking-wide text-muted-foreground transition-colors hover:text-primary"
                >
                  Start over
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default SituationFinder;
