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
  RefreshCw,
  Repeat,
  CalendarClock,
  Clock,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const questions = [
  {
    prompt: "What are you working on?",
    columns: "grid-cols-2 sm:grid-cols-3",
    options: [
      { label: "Building a brand", icon: Sparkles },
      { label: "Outfitting a crew or team", icon: Users },
      { label: "Planning an event or promotion", icon: PartyPopper },
      { label: "Wholesale patches", icon: Layers },
      { label: "Something else", icon: HelpCircle },
    ],
  },
  {
    prompt: "Is this a one-time need or an ongoing program?",
    columns: "grid-cols-2",
    options: [
      { label: "One time", icon: RefreshCw },
      { label: "Ongoing program", icon: Repeat },
    ],
  },
  {
    prompt: "Do you have a hard deadline?",
    columns: "grid-cols-2",
    options: [
      { label: "Yes, fixed date", icon: CalendarClock },
      { label: "Flexible timing", icon: Clock },
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
      setTimeout(() => setStep(step + 1), 300);
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
    <section className="py-20 md:py-28">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          {/* Progress dots */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-10 flex items-center justify-center gap-2.5"
          >
            {questions.map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all duration-500 ${
                  i < answers.length
                    ? "w-10 bg-primary"
                    : i === step
                      ? "w-10 bg-primary/40"
                      : "w-2 bg-border"
                }`}
              />
            ))}
          </motion.div>

          <AnimatePresence mode="wait">
            {!isComplete ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="font-heading text-2xl font-bold text-foreground md:text-4xl">
                  {currentQuestion.prompt}
                </h2>

                <div className={`mt-10 grid gap-4 ${currentQuestion.columns}`}>
                  {currentQuestion.options.map((option, i) => {
                    const Icon = option.icon;
                    const isSelected = answers[step] === option.label;

                    return (
                      <motion.button
                        key={option.label}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05, duration: 0.25 }}
                        onClick={() => handleSelect(option.label)}
                        className={`group relative flex flex-col items-center gap-3 rounded-xl border-2 px-4 py-6 text-center transition-all duration-200 sm:py-8 ${
                          isSelected
                            ? "border-primary bg-primary/10 shadow-lg shadow-primary/10"
                            : "border-border bg-card hover:border-primary/40 hover:bg-card/80"
                        }`}
                      >
                        {/* Selected check */}
                        {isSelected && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-3 right-3 flex h-5 w-5 items-center justify-center rounded-full bg-primary"
                          >
                            <Check className="h-3 w-3 text-primary-foreground" />
                          </motion.span>
                        )}

                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-lg transition-colors duration-200 ${
                            isSelected
                              ? "bg-primary/20 text-primary"
                              : "bg-secondary text-muted-foreground group-hover:text-foreground"
                          }`}
                        >
                          <Icon className="h-6 w-6" />
                        </div>

                        <span
                          className={`font-heading text-sm font-semibold tracking-wide transition-colors sm:text-base ${
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
                  <button
                    onClick={() => setStep(step - 1)}
                    className="mt-8 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    ← Back
                  </button>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="complete"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col items-center"
              >
                <h2 className="font-heading text-2xl font-bold text-foreground md:text-4xl">
                  WE'VE GOT YOU.
                </h2>
                <p className="mt-4 max-w-md text-muted-foreground">
                  Let's put together exactly what you need.
                </p>
                <Button
                  size="lg"
                  onClick={handleFindSolution}
                  className="mt-8 gap-2 font-heading text-base tracking-wide"
                >
                  Find My Solution
                  <ArrowRight className="h-4 w-4" />
                </Button>

                <button
                  onClick={() => {
                    setStep(0);
                    setAnswers([]);
                  }}
                  className="mt-4 text-sm text-muted-foreground transition-colors hover:text-foreground"
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
