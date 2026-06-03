import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Card, Badge, Button, SectionTitle, ProgressBar } from "@/components/ui-prim";

export const Route = createFileRoute("/parent/motor")({
  component: Motor,
});

type Phase = "upload" | "analyzing" | "result";

function Motor() {
  const [phase, setPhase] = useState<Phase>("upload");
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
          return p + 4;
        }),
      80,
    );
    return () => clearInterval(id);
  }, [phase]);

  const stages = ["Video Upload", "Pose Extraction", "Movement Analysis", "Risk Prediction"];
  const activeStage =
    phase === "upload" ? 0 : phase === "analyzing" ? Math.min(3, Math.floor(progress / 33)) : 3;

  return (
    <>
      <SectionTitle
        eyebrow="Vision AI"
        title="Motor Assessment"
        desc="Record or upload a short video of your child walking, balancing or playing."
      />

      <div className="mb-4 grid grid-cols-4 gap-2">
        {stages.map((s, i) => (
          <div
            key={s}
            className={`rounded-lg p-3 text-center text-xs ${i <= activeStage ? "bg-navy text-white" : "bg-muted text-muted-foreground"}`}
          >
            <div className="font-semibold">Step {i + 1}</div>
            <div className="mt-0.5">{s}</div>
          </div>
        ))}
      </div>

      {phase === "upload" && (
        <Card>
          <div className="rounded-xl border-2 border-dashed border-border p-10 text-center">
            <div className="text-4xl">🎥</div>
            <div className="mt-3 font-heading text-lg font-bold text-navy">
              Upload or record video
            </div>
            <div className="mt-1 text-sm text-muted-foreground">
              10–30 sec · MP4/MOV · Child's full body in frame
            </div>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              <Button variant="orange" onClick={() => setPhase("analyzing")}>
                Record from Camera
              </Button>
              <Button variant="outline" onClick={() => setPhase("analyzing")}>
                Upload File
              </Button>
            </div>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            All video data is processed on-device for the demo. No PII leaves your phone.
          </p>
        </Card>
      )}

      {phase === "analyzing" && (
        <Card>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="relative aspect-video overflow-hidden rounded-xl bg-navy">
              <div className="absolute inset-0 brand-gradient opacity-90" />
              <svg viewBox="0 0 200 120" className="relative h-full w-full">
                {/* skeleton */}
                <g stroke="#F36C21" strokeWidth="1.5" fill="none">
                  <circle cx="100" cy="30" r="8" />
                  <line x1="100" y1="38" x2="100" y2="70" />
                  <line x1="100" y1="48" x2="80" y2="60" />
                  <line x1="100" y1="48" x2="120" y2="60" />
                  <line x1="100" y1="70" x2="88" y2="100" />
                  <line x1="100" y1="70" x2="112" y2="100" />
                </g>
                <g fill="#F36C21">
                  {[
                    [100, 30],
                    [100, 48],
                    [80, 60],
                    [120, 60],
                    [100, 70],
                    [88, 100],
                    [112, 100],
                  ].map(([x, y], i) => (
                    <circle key={i} cx={x} cy={y} r="2.2">
                      <animate
                        attributeName="r"
                        values="2;3.2;2"
                        dur="1.2s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  ))}
                </g>
              </svg>
              <div className="absolute bottom-2 left-2 rounded-md bg-black/40 px-2 py-1 text-xs text-white">
                17 pose landmarks detected
              </div>
            </div>
            <div>
              <div className="font-heading text-lg font-bold text-navy">
                AI analyzing posture, balance and coordination…
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                Extracting key joints and motion patterns.
              </div>
              <div className="mt-4">
                <ProgressBar value={progress} tone="orange" />
                <div className="mt-1 text-xs text-muted-foreground">{progress}% complete</div>
              </div>
              <ul className="mt-5 space-y-2 text-sm">
                <li className={progress > 20 ? "text-foreground" : "text-muted-foreground"}>
                  ✓ Frames sampled at 10 fps
                </li>
                <li className={progress > 50 ? "text-foreground" : "text-muted-foreground"}>
                  ✓ Pose landmarks extracted
                </li>
                <li className={progress > 75 ? "text-foreground" : "text-muted-foreground"}>
                  ✓ Gait & balance metrics computed
                </li>
                <li className={progress >= 100 ? "text-foreground" : "text-muted-foreground"}>
                  ✓ Risk model scoring
                </li>
              </ul>
            </div>
          </div>
        </Card>
      )}

      {phase === "result" && (
        <Card>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">
                Motor AI Result
              </div>
              <div className="font-heading text-2xl font-bold text-navy">Monitor</div>
            </div>
            <Badge tone="warning">Score 64 / 100</Badge>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {[
              ["Balance", 72, "success"],
              ["Coordination", 60, "warning"],
              ["Gait symmetry", 58, "warning"],
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
              <li>Mild asymmetry detected in left-leg push-off</li>
              <li>Posture stable; trunk control age-appropriate</li>
              <li>Recommend re-assessment in 6 weeks</li>
            </ul>
          </div>
          <div className="mt-5 flex flex-wrap justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setPhase("upload");
                setProgress(0);
              }}
            >
              Re-run
            </Button>
            <Button as={Link} to="/parent/speech" variant="orange">
              Continue to Speech →
            </Button>
          </div>
        </Card>
      )}
    </>
  );
}
