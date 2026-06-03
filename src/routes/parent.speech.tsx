import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Card, Badge, Button, SectionTitle, ProgressBar } from "@/components/ui-prim";

export const Route = createFileRoute("/parent/speech")({
  component: Speech,
});

type Phase = "idle" | "recording" | "analyzing" | "result";

function Speech() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (phase !== "analyzing") return;
    const id = setInterval(
      () =>
        setProgress((p) => {
          if (p >= 100) {
            clearInterval(id);
            setPhase("result");
            return 100;
          }
          return p + 5;
        }),
      90,
    );
    return () => clearInterval(id);
  }, [phase]);

  const bars = Array.from(
    { length: 48 },
    (_, i) => 20 + Math.abs(Math.sin(i * 0.6)) * 60 + (i % 5) * 4,
  );

  return (
    <>
      <SectionTitle
        eyebrow="Speech AI"
        title="Speech & Language Assessment"
        desc="Record a 15-second voice sample of your child responding to prompts."
      />

      <div className="mb-4 grid grid-cols-4 gap-2">
        {["Voice Recording", "Feature Extraction", "Language Assessment", "Risk Prediction"].map(
          (s, i) => {
            const active =
              phase === "idle"
                ? 0
                : phase === "recording"
                  ? 0
                  : phase === "analyzing"
                    ? Math.min(3, Math.floor(progress / 33))
                    : 3;
            return (
              <div
                key={s}
                className={`rounded-lg p-3 text-center text-xs ${i <= active ? "bg-navy text-white" : "bg-muted text-muted-foreground"}`}
              >
                <div className="font-semibold">Step {i + 1}</div>
                <div className="mt-0.5">{s}</div>
              </div>
            );
          },
        )}
      </div>

      {(phase === "idle" || phase === "recording") && (
        <Card>
          <div className="rounded-xl border border-border bg-muted/40 p-6">
            <div className="font-heading text-lg font-bold text-navy">Prompt</div>
            <p className="mt-1 text-sm">
              Ask your child: "What is this?" while pointing to objects in a picture book.
            </p>
          </div>
          <div className="mt-5 flex items-end justify-center gap-1 rounded-xl bg-navy/95 p-6">
            {bars.map((h, i) => (
              <div
                key={i}
                className={`w-1.5 rounded-sm ${phase === "recording" ? "bg-orange" : "bg-white/40"}`}
                style={{
                  height: `${phase === "recording" ? h : 12}px`,
                  transition: "height 200ms",
                }}
              />
            ))}
          </div>
          <div className="mt-5 flex justify-center gap-2">
            {phase === "idle" ? (
              <Button variant="orange" onClick={() => setPhase("recording")}>
                ● Start Recording
              </Button>
            ) : (
              <>
                <Button variant="outline" onClick={() => setPhase("idle")}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={() => setPhase("analyzing")}>
                  Stop & Analyze
                </Button>
              </>
            )}
          </div>
        </Card>
      )}

      {phase === "analyzing" && (
        <Card>
          <div className="font-heading text-lg font-bold text-navy">Analyzing speech features…</div>
          <div className="mt-2 text-sm text-muted-foreground">
            Pitch, articulation, vocabulary richness and turn-taking.
          </div>
          <div className="mt-4">
            <ProgressBar value={progress} tone="orange" />
          </div>
          <div className="mt-1 text-xs text-muted-foreground">{progress}%</div>
        </Card>
      )}

      {phase === "result" && (
        <Card>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">
                Speech AI Result
              </div>
              <div className="font-heading text-2xl font-bold text-navy">Monitor</div>
            </div>
            <Badge tone="warning">Language milestone score 52 / 100</Badge>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {[
              ["Vocabulary", 48, "warning"],
              ["Articulation", 66, "warning"],
              ["Turn-taking", 55, "warning"],
            ].map(([k, v, t]: [string, number, string]) => (
              <div key={k} className="rounded-lg bg-muted/60 p-3">
                <div className="text-xs text-muted-foreground">{k}</div>
                <div className="mt-1 font-heading text-xl font-bold">{v}</div>
                <div className="mt-1">
                  <ProgressBar value={v} tone={t} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-lg border border-warning/40 bg-warning/10 p-4 text-sm">
            <div className="font-semibold">Explainable insights</div>
            <ul className="mt-2 list-disc pl-5">
              <li>Vocabulary smaller than expected for 28 months</li>
              <li>Two-word phrases not yet consistent</li>
              <li>Recommend speech-language follow-up</li>
            </ul>
          </div>
          <div className="mt-5 flex flex-wrap justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setPhase("idle");
                setProgress(0);
              }}
            >
              Re-record
            </Button>
            <Button as={Link} to="/parent/referral" variant="orange">
              See Risk & Referral →
            </Button>
          </div>
        </Card>
      )}
    </>
  );
}
