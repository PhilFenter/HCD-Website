import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const questions = [
  {
    prompt: "What are you working on?",
    options: [
      "Building a brand",
      "Outfitting a crew or team",
      "Planning an event or promotion",
      "Wholesale patches",
      "Something else",
    ],
  },
  {
    prompt: "Is this a one-time need or an ongoing program?",
    options: ["One time", "Ongoing program"],
  },
  {
    prompt: "Do you have a hard deadline?",
    options: ["Yes, fixed date", "Flexible timing"],
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
      setTimeout(() => setStep(step + 1), 250);
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
        <div className="mx-auto max-w-2xl text-center">
          {/* Step indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-10 flex items-center justify-center gap-2"
          >
            {questions.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i < answers.length
                    ? "w-8 bg-primary"
                    : i === step
                      ? "w-8 bg-primary/50"
                      : "w-4 bg-border"
                }`}
              />
            ))}
          </motion.div>

          <AnimatePresence mode="wait">
            {!isComplete ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
              >
                <h2 className="font-heading text-2xl font-bold text-foreground md:text-4xl">
                  {currentQuestion.prompt}
                </h2>

                <div className="mt-8 flex flex-col gap-3">
                  {currentQuestion.options.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleSelect(option)}
                      className={`rounded-lg border px-5 py-4 text-left font-heading text-sm font-medium tracking-wide transition-all sm:text-base ${
                        answers[step] === option
                          ? "border-primary bg-primary/10 text-foreground"
                          : "border-border bg-card text-muted-foreground hover:border-muted-foreground/40 hover:text-foreground"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                {/* Back link for questions 2+ */}
                {step > 0 && (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="mt-6 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    ← Back
                  </button>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="complete"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
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
