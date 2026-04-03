import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  Boxes,
  Cable,
  Cloud,
  ExternalLink,
  MonitorSmartphone,
  Package,
  Printer,
  Server,
  ShieldCheck,
  Workflow,
} from 'lucide-react'

import {
  cloudInitExample,
  cloudInitGuidance,
  cockpitChecklist,
  commandBlocks,
  consistencyChecklist,
  defaultPrinterDrift,
  diagnosticsIdeas,
  guardRailRecommendation,
  loggingStrategy,
  incusGuidance,
  longTermPlatform,
  printerSteps,
  provenTopology,
  quickStartSteps,
  realityChecks,
  reprintGuidance,
  recommendation,
  references,
  setupHighlights,
  transportComparison,
  ubuntuSteps,
  wineVerdict,
} from '@/content'
import { Badge } from '@/components/ui/badge'
import { ButtonLink } from '@/components/ui/button'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'

type SectionHeadingProps = {
  eyebrow: string
  title: string
  description: string
}

function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">
        {eyebrow}
      </p>
      <h2 className="font-serif text-4xl tracking-[-0.04em] text-[var(--ink)]">
        {title}
      </h2>
      <p className="max-w-3xl leading-8 text-[var(--muted)]">{description}</p>
    </div>
  )
}

function App() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_top,rgba(243,145,96,0.24),transparent_52%),radial-gradient(circle_at_15%_25%,rgba(234,179,8,0.18),transparent_30%),radial-gradient(circle_at_90%_20%,rgba(14,116,144,0.2),transparent_30%)]" />

      <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-10 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <section className="rounded-[2rem] border border-[var(--line)] bg-[linear-gradient(135deg,rgba(255,255,255,0.86),rgba(255,247,237,0.92))] p-6 shadow-[0_30px_80px_rgba(15,23,42,0.08)] backdrop-blur md:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                <Badge>Shadcn Luma-style docs</Badge>
                <Badge>GitHub Pages ready</Badge>
                <Badge>Updated April 3, 2026</Badge>
              </div>

              <div className="space-y-4">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">
                  THRIL setup playbook
                </p>
                <h1 className="max-w-4xl font-serif text-5xl leading-[0.95] tracking-[-0.05em] text-[var(--ink)] sm:text-6xl lg:text-7xl">
                  Ubuntu + XM-F025 + Zebra ZT410, organized like a real SOP.
                </h1>
                <p className="max-w-3xl text-base leading-8 text-[var(--muted)] sm:text-lg">
                  This guide is now structured into the four jobs people actually
                  have: set the station up, troubleshoot it when it drifts, read the
                  deeper operational notes, and open the vendor references when they
                  need the source material.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <ButtonLink href="#setup">
                  Go to setup
                  <ArrowRight className="ml-2 size-4" />
                </ButtonLink>
                <ButtonLink href="#troubleshooting" variant="secondary">
                  Go to troubleshooting
                </ButtonLink>
              </div>
            </div>

            <Card className="relative overflow-hidden border-[rgba(15,23,42,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(255,251,235,0.9))]">
              <div className="absolute inset-x-6 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--accent),transparent)]" />
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
                One-paragraph answer
              </p>
              <p className="text-lg leading-8 text-[var(--ink)]">
                The stable baseline is Ubuntu 24.04.4 LTS on the XM-F025, the Zebra
                ZT410 on a dedicated Ethernet link at `192.168.0.100`, one raw CUPS
                queue over `socket://...:9100`, app-side reprints, and a guard script
                that keeps the printer default from drifting to PDF.
              </p>
            </Card>
          </div>
        </section>

        <section>
          <Card className="bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(248,250,252,0.92))]">
            <div className="mb-5 flex items-center gap-3">
              <Workflow className="size-5 text-[var(--accent)]" />
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
                  Guide structure
                </p>
                <CardTitle>Read this page in four passes</CardTitle>
              </div>
            </div>
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              <a
                href="#setup"
                className="rounded-[1.4rem] border border-[var(--line)] bg-white/80 p-5 transition hover:-translate-y-0.5"
              >
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                  1. Setup
                </p>
                <p className="leading-7 text-[var(--ink)]">
                  Network layout, queue setup, and the known-good station baseline.
                </p>
              </a>
              <a
                href="#troubleshooting"
                className="rounded-[1.4rem] border border-[var(--line)] bg-white/80 p-5 transition hover:-translate-y-0.5"
              >
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                  2. Troubleshooting
                </p>
                <p className="leading-7 text-[var(--ink)]">
                  Reprints, PDF default drift, guard automation, and logging.
                </p>
              </a>
              <a
                href="#detailed-docs"
                className="rounded-[1.4rem] border border-[var(--line)] bg-white/80 p-5 transition hover:-translate-y-0.5"
              >
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                  3. Detailed docs
                </p>
                <p className="leading-7 text-[var(--ink)]">
                  Cockpit, Wine, Rocky, Incus, and cloud-init planning notes.
                </p>
              </a>
              <a
                href="#references"
                className="rounded-[1.4rem] border border-[var(--line)] bg-white/80 p-5 transition hover:-translate-y-0.5"
              >
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                  4. References
                </p>
                <p className="leading-7 text-[var(--ink)]">
                  Manuals, vendor pages, CUPS docs, and official source material.
                </p>
              </a>
            </div>
          </Card>
        </section>

        <section id="setup" className="space-y-6">
          <SectionHeading
            eyebrow="Setup"
            title="Build the station in this order"
            description="This is the primary SOP. If someone is at the XM-F025 and the ZT410 and just needs a working station, start here and work top to bottom."
          />

          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {setupHighlights.map((item) => (
              <Card key={item.title} className="flex h-full flex-col gap-3">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
                  {item.title}
                </p>
                <p className="text-xl font-semibold leading-8 text-[var(--ink)]">
                  {item.value}
                </p>
                <CardDescription>{item.note}</CardDescription>
              </Card>
            ))}
          </section>

          <section>
            <Card>
              <div className="mb-6 flex items-center gap-3">
                <Cable className="size-5 text-[var(--accent)]" />
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
                    Proven topology
                  </p>
                  <CardTitle>The wiring and addressing that is working now</CardTitle>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {provenTopology.map((item) => (
                  <div
                    key={item}
                    className="flex gap-3 rounded-[1.3rem] border border-[var(--line)] bg-white/75 p-4"
                  >
                    <BadgeCheck className="mt-1 size-4 shrink-0 text-[var(--accent)]" />
                    <p className="leading-7 text-[var(--ink)]">{item}</p>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          <section>
            <Card>
              <div className="mb-6 flex items-center gap-3">
                <Workflow className="size-5 text-[var(--accent)]" />
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
                    Start here
                  </p>
                  <CardTitle>Use this order and the setup becomes much simpler</CardTitle>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {quickStartSteps.map((step) => (
                  <div
                    key={step.title}
                    className="rounded-[1.5rem] border border-[var(--line)] bg-white/75 p-5"
                  >
                    <h3 className="mb-3 text-lg font-semibold text-[var(--ink)]">
                      {step.title}
                    </h3>
                    <p className="leading-7 text-[var(--muted)]">{step.body}</p>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          <section className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
            <Card className="h-full">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-2xl bg-[var(--accent-soft)] p-3 text-[var(--accent)]">
                  <ShieldCheck className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
                    Recommended baseline
                  </p>
                  <CardTitle>The setup I would deploy for stability</CardTitle>
                </div>
              </div>
              <div className="space-y-3 text-[var(--ink)]">
                {recommendation.map((item) => (
                  <div
                    key={item}
                    className="flex gap-3 rounded-[1.3rem] border border-[var(--line)] bg-white/75 p-4"
                  >
                    <BadgeCheck className="mt-1 size-4 shrink-0 text-[var(--accent)]" />
                    <p className="leading-7">{item}</p>
                  </div>
                ))}
              </div>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card className="h-full">
                <div className="mb-4 flex items-center gap-3">
                  <MonitorSmartphone className="size-5 text-[var(--accent)]" />
                  <CardTitle>Touchscreen strategy</CardTitle>
                </div>
                <CardDescription>
                  Keep the problem simple: one station, one touch device, one known
                  display mapping. If touch drift appears, move the box to GNOME on
                  Xorg and map explicitly with `xinput`.
                </CardDescription>
              </Card>

              <Card className="h-full">
                <div className="mb-4 flex items-center gap-3">
                  <Printer className="size-5 text-[var(--accent)]" />
                  <CardTitle>Printer strategy</CardTitle>
                </div>
                <CardDescription>
                  Prefer LAN over serial. If your app emits ZPL, a raw Zebra queue
                  over AppSocket is the cleanest path on Ubuntu.
                </CardDescription>
              </Card>

              <Card className="h-full">
                <div className="mb-4 flex items-center gap-3">
                  <Workflow className="size-5 text-[var(--accent)]" />
                  <CardTitle>Reprint strategy</CardTitle>
                </div>
                <CardDescription>
                  Archive the original label payload and reprint from the app or
                  backend instead of relying on the printer panel.
                </CardDescription>
              </Card>

              <Card className="h-full">
                <div className="mb-4 flex items-center gap-3">
                  <Server className="size-5 text-[var(--accent)]" />
                  <CardTitle>Operations strategy</CardTitle>
                </div>
                <CardDescription>
                  Use Cockpit and a printer guard timer as the station’s operational
                  control surface, not manual fixes each morning.
                </CardDescription>
              </Card>
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
            <Card className="h-full">
              <div className="mb-6 flex items-center gap-3">
                <Printer className="size-5 text-[var(--accent)]" />
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
                    Printer decision
                  </p>
                  <CardTitle>Why wired IP beats serial for this station</CardTitle>
                </div>
              </div>
              <div className="space-y-4">
                {transportComparison.map((row) => (
                  <div
                    key={row.point}
                    className="rounded-[1.5rem] border border-[var(--line)] bg-white/70 p-5"
                  >
                    <h3 className="mb-4 text-lg font-semibold text-[var(--ink)]">
                      {row.point}
                    </h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="rounded-[1.25rem] border border-[rgba(163,72,18,0.18)] bg-[rgba(163,72,18,0.06)] p-4">
                        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                          Wired IP / LAN
                        </p>
                        <p className="leading-7 text-[var(--ink)]">{row.ip}</p>
                      </div>
                      <div className="rounded-[1.25rem] border border-[var(--line)] bg-[rgba(23,32,51,0.03)] p-4">
                        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                          Serial
                        </p>
                        <p className="leading-7 text-[var(--ink)]">{row.serial}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="h-full">
              <div className="mb-6 flex items-center gap-3">
                <BadgeCheck className="size-5 text-[var(--accent)]" />
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
                    Bottom line
                  </p>
                  <CardTitle>Recommendation for this exact printer problem</CardTitle>
                </div>
              </div>
              <div className="space-y-3">
                <div className="rounded-[1.35rem] border border-[var(--line)] bg-white/75 p-5">
                  <p className="leading-8 text-[var(--ink)]">
                    If the application can talk to the Zebra over the network, use one
                    raw queue over `socket://printer-ip:9100` and stop switching
                    transports.
                  </p>
                </div>
                <div className="rounded-[1.35rem] border border-[var(--line)] bg-white/75 p-5">
                  <p className="leading-8 text-[var(--ink)]">
                    Keep serial only for a true legacy requirement. It is not the
                    transport I would choose for a station already showing
                    connection and consistency issues.
                  </p>
                </div>
                <div className="rounded-[1.35rem] border border-[var(--line)] bg-white/75 p-5">
                  <p className="leading-8 text-[var(--ink)]">
                    If your labels are ZPL already, LAN plus a raw queue is the most
                    direct path. If the app emits PDFs or images, Zebra’s Linux CUPS
                    package is the next thing to test.
                  </p>
                </div>
              </div>
            </Card>
          </section>

          <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
            <Card className="h-full">
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-2xl bg-[var(--accent-soft)] p-3 text-[var(--accent)]">
                  <MonitorSmartphone className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
                    Ubuntu + XM-F025
                  </p>
                  <CardTitle>Bring-up and touchscreen mapping</CardTitle>
                </div>
              </div>
              <div className="space-y-5">
                {ubuntuSteps.map((step) => (
                  <div
                    key={step.title}
                    className="rounded-[1.5rem] border border-[var(--line)] bg-white/70 p-5"
                  >
                    <h3 className="mb-3 text-lg font-semibold text-[var(--ink)]">
                      {step.title}
                    </h3>
                    <div className="space-y-2">
                      {step.bullets.map((bullet) => (
                        <p
                          key={bullet}
                          className="flex gap-3 leading-7 text-[var(--muted)]"
                        >
                          <span className="mt-3 block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                          <span>{bullet}</span>
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="h-full">
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-2xl bg-[var(--accent-soft)] p-3 text-[var(--accent)]">
                  <Printer className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
                    Zebra ZT410
                  </p>
                  <CardTitle>Connectivity, consistency, and reprints</CardTitle>
                </div>
              </div>
              <div className="space-y-5">
                {printerSteps.map((step) => (
                  <div
                    key={step.title}
                    className="rounded-[1.5rem] border border-[var(--line)] bg-white/70 p-5"
                  >
                    <h3 className="mb-3 text-lg font-semibold text-[var(--ink)]">
                      {step.title}
                    </h3>
                    <div className="space-y-2">
                      {step.bullets.map((bullet) => (
                        <p
                          key={bullet}
                          className="flex gap-3 leading-7 text-[var(--muted)]"
                        >
                          <span className="mt-3 block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                          <span>{bullet}</span>
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <Card className="h-full">
              <div className="mb-6 flex items-center gap-3">
                <Cable className="size-5 text-[var(--accent)]" />
                <CardTitle>Command reference</CardTitle>
              </div>
              <div className="space-y-4">
                {commandBlocks.map((block) => (
                  <div key={block.title} className="space-y-3">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                      {block.title}
                    </p>
                    <pre className="overflow-x-auto rounded-[1.5rem] border border-[var(--line)] bg-[var(--night)] p-5 text-sm leading-7 text-[var(--night-ink)]">
                      <code>{block.code}</code>
                    </pre>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="h-full">
              <div className="mb-6 flex items-center gap-3">
                <ShieldCheck className="size-5 text-[var(--accent)]" />
                <CardTitle>Consistency checklist</CardTitle>
              </div>
              <div className="space-y-3">
                {consistencyChecklist.map((item) => (
                  <div
                    key={item}
                    className="flex gap-3 rounded-[1.3rem] border border-[var(--line)] bg-white/70 p-4"
                  >
                    <BadgeCheck className="mt-1 size-4 shrink-0 text-[var(--accent)]" />
                    <p className="leading-7 text-[var(--ink)]">{item}</p>
                  </div>
                ))}
              </div>
            </Card>
          </section>
        </section>

        <section id="troubleshooting" className="space-y-6">
          <SectionHeading
            eyebrow="Troubleshooting"
            title="Diagnose drift, reprints, and morning surprises"
            description="This section is for day-two operations. If the printer default flips, jobs miss, or operators keep pressing reprint, start here."
          />

          <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <Card className="h-full">
              <div className="mb-6 flex items-center gap-3">
                <Printer className="size-5 text-[var(--accent)]" />
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
                    Reprints
                  </p>
                  <CardTitle>Will IP printing reduce the need to press reprint?</CardTitle>
                </div>
              </div>
              <div className="space-y-3">
                {reprintGuidance.map((item) => (
                  <div
                    key={item}
                    className="flex gap-3 rounded-[1.3rem] border border-[var(--line)] bg-white/70 p-4"
                  >
                    <BadgeCheck className="mt-1 size-4 shrink-0 text-[var(--accent)]" />
                    <p className="leading-7 text-[var(--ink)]">{item}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="h-full">
              <div className="mb-6 flex items-center gap-3">
                <Activity className="size-5 text-[var(--accent)]" />
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
                    Best workflow fix
                  </p>
                  <CardTitle>What to change if operators reprint a lot today</CardTitle>
                </div>
              </div>
              <div className="space-y-4">
                <div className="rounded-[1.4rem] border border-[var(--line)] bg-white/75 p-5">
                  <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                    If the first print often fails
                  </p>
                  <p className="leading-7 text-[var(--ink)]">
                    Move to one wired IP path, reserve the printer IP, and standardize
                    on one queue. This usually lowers transport-related misses.
                  </p>
                </div>
                <div className="rounded-[1.4rem] border border-[var(--line)] bg-white/75 p-5">
                  <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                    If users need another copy on purpose
                  </p>
                  <p className="leading-7 text-[var(--ink)]">
                    Add “Reprint last label”, “Reprint shipment”, or “Print N copies”
                    to the application and back it with stored label payloads.
                  </p>
                </div>
                <div className="rounded-[1.4rem] border border-[var(--line)] bg-white/75 p-5">
                  <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                    If the team uses the printer panel today
                  </p>
                  <p className="leading-7 text-[var(--ink)]">
                    Zebra Reprint Mode can be a stopgap for the last label only, but it
                    is a fallback convenience, not the main workflow I would design
                    around.
                  </p>
                </div>
              </div>
            </Card>
          </section>

          <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
            <Card className="h-full">
              <div className="mb-6 flex items-center gap-3">
                <Printer className="size-5 text-[var(--accent)]" />
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
                    Default printer drift
                  </p>
                  <CardTitle>Why the station may wake up on PDF instead</CardTitle>
                </div>
              </div>
              <div className="space-y-3">
                {defaultPrinterDrift.map((item) => (
                  <div
                    key={item}
                    className="flex gap-3 rounded-[1.3rem] border border-[var(--line)] bg-white/70 p-4"
                  >
                    <BadgeCheck className="mt-1 size-4 shrink-0 text-[var(--accent)]" />
                    <p className="leading-7 text-[var(--ink)]">{item}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="h-full">
              <div className="mb-6 flex items-center gap-3">
                <Server className="size-5 text-[var(--accent)]" />
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
                    Recommended fix
                  </p>
                  <CardTitle>Use a guard script plus timer, not a blind cron hack</CardTitle>
                </div>
              </div>
              <div className="space-y-3">
                {guardRailRecommendation.map((item) => (
                  <div
                    key={item}
                    className="flex gap-3 rounded-[1.3rem] border border-[var(--line)] bg-white/70 p-4"
                  >
                    <BadgeCheck className="mt-1 size-4 shrink-0 text-[var(--accent)]" />
                    <p className="leading-7 text-[var(--ink)]">{item}</p>
                  </div>
                ))}
                <div className="rounded-[1.3rem] border border-[var(--line)] bg-[rgba(23,32,51,0.03)] p-4 text-sm leading-7 text-[var(--muted)]">
                  <p className="mb-2 font-semibold text-[var(--ink)]">Repo samples</p>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href="/Users/seandolbec/Projects/thril/scripts/thril-printer-guard.sh"
                      className="rounded-full border border-[var(--line)] bg-white px-3 py-1.5 text-sm text-[var(--ink)] transition hover:-translate-y-0.5"
                    >
                      `scripts/thril-printer-guard.sh`
                    </a>
                    <a
                      href="/Users/seandolbec/Projects/thril/ops/systemd/thril-printer-guard.service"
                      className="rounded-full border border-[var(--line)] bg-white px-3 py-1.5 text-sm text-[var(--ink)] transition hover:-translate-y-0.5"
                    >
                      `thril-printer-guard.service`
                    </a>
                    <a
                      href="/Users/seandolbec/Projects/thril/ops/systemd/thril-printer-guard.timer"
                      className="rounded-full border border-[var(--line)] bg-white px-3 py-1.5 text-sm text-[var(--ink)] transition hover:-translate-y-0.5"
                    >
                      `thril-printer-guard.timer`
                    </a>
                    <a
                      href="/Users/seandolbec/Projects/thril/ops/examples/thril-printer-guard.env"
                      className="rounded-full border border-[var(--line)] bg-white px-3 py-1.5 text-sm text-[var(--ink)] transition hover:-translate-y-0.5"
                    >
                      `thril-printer-guard.env`
                    </a>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <Card className="h-full">
              <div className="mb-6 flex items-center gap-3">
                <Activity className="size-5 text-[var(--accent)]" />
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
                    Logging
                  </p>
                  <CardTitle>What to log so the next flip leaves evidence</CardTitle>
                </div>
              </div>
              <div className="space-y-3">
                {loggingStrategy.map((item) => (
                  <div
                    key={item}
                    className="flex gap-3 rounded-[1.3rem] border border-[var(--line)] bg-white/70 p-4"
                  >
                    <BadgeCheck className="mt-1 size-4 shrink-0 text-[var(--accent)]" />
                    <p className="leading-7 text-[var(--ink)]">{item}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="h-full">
              <div className="mb-6 flex items-center gap-3">
                <Workflow className="size-5 text-[var(--accent)]" />
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
                    Practical next step
                  </p>
                  <CardTitle>How I would deploy this on the station</CardTitle>
                </div>
              </div>
              <div className="space-y-4">
                <div className="rounded-[1.4rem] border border-[var(--line)] bg-white/75 p-5">
                  <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                    1. Keep the known-good queue
                  </p>
                  <p className="leading-7 text-[var(--ink)]">
                    Keep the Zebra on `192.168.0.100:9100` with one queue and one
                    default destination.
                  </p>
                </div>
                <div className="rounded-[1.4rem] border border-[var(--line)] bg-white/75 p-5">
                  <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                    2. Install the guard
                  </p>
                  <p className="leading-7 text-[var(--ink)]">
                    Put the sample script in `/usr/local/bin`, add the env file, and
                    enable the included timer so it checks the default on boot and
                    every few minutes.
                  </p>
                </div>
                <div className="rounded-[1.4rem] border border-[var(--line)] bg-white/75 p-5">
                  <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                    3. Review journal plus guard log
                  </p>
                  <p className="leading-7 text-[var(--ink)]">
                    Use `journalctl -u thril-printer-guard.service` and
                    `/var/log/thril-printer-guard.log` to see when the setting changed
                    and when the station repaired it.
                  </p>
                </div>
              </div>
            </Card>
          </section>
        </section>

        <section id="detailed-docs" className="space-y-6">
          <SectionHeading
            eyebrow="Detailed documents"
            title="Supporting operational notes and future-state guidance"
            description="These sections matter, but they are not the first-line SOP. Keep them here as deeper operational guidance for admins and future planning."
          />

          <section className="grid gap-4 lg:grid-cols-3">
            {realityChecks.map((item) => (
              <Card key={item.title} className="h-full">
                <div className="mb-4 flex items-center gap-3">
                  <AlertTriangle className="size-5 text-[var(--warm)]" />
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </div>
                <CardDescription className="text-base">{item.body}</CardDescription>
              </Card>
            ))}
          </section>

          <section className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
            <Card className="h-full">
              <div className="mb-6 flex items-center gap-3">
                <Package className="size-5 text-[var(--accent)]" />
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
                    Wine + PackIt addendum
                  </p>
                  <CardTitle>Compatibility layer, not the preferred print stack</CardTitle>
                </div>
              </div>
              <div className="space-y-3">
                {wineVerdict.map((item) => (
                  <div
                    key={item}
                    className="flex gap-3 rounded-[1.3rem] border border-[var(--line)] bg-white/70 p-4"
                  >
                    <BadgeCheck className="mt-1 size-4 shrink-0 text-[var(--accent)]" />
                    <p className="leading-7 text-[var(--ink)]">{item}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="h-full">
              <div className="mb-6 flex items-center gap-3">
                <Server className="size-5 text-[var(--accent)]" />
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
                    Cockpit management
                  </p>
                  <CardTitle>Recommended browser-based operations plane</CardTitle>
                </div>
              </div>
              <div className="space-y-3">
                {cockpitChecklist.map((item) => (
                  <div
                    key={item}
                    className="flex gap-3 rounded-[1.3rem] border border-[var(--line)] bg-white/70 p-4"
                  >
                    <BadgeCheck className="mt-1 size-4 shrink-0 text-[var(--accent)]" />
                    <p className="leading-7 text-[var(--ink)]">{item}</p>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          <section className="grid gap-4 md:grid-cols-2">
            <Card className="h-full bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(239,246,255,0.92))]">
              <div className="mb-4 flex items-center gap-3">
                <Activity className="size-5 text-[var(--accent)]" />
                <CardTitle className="text-xl">Optional diagnostics dashboard</CardTitle>
              </div>
              <div className="space-y-3">
                {diagnosticsIdeas.map((item) => (
                  <p key={item} className="flex gap-3 leading-7 text-[var(--muted)]">
                    <span className="mt-3 block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                    <span>{item}</span>
                  </p>
                ))}
              </div>
            </Card>

            <Card className="h-full bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(255,247,237,0.9))]">
              <div className="mb-4 flex items-center gap-3">
                <ShieldCheck className="size-5 text-[var(--accent)]" />
                <CardTitle className="text-xl">Practical recommendation</CardTitle>
              </div>
              <CardDescription className="text-base">
                Use native Ubuntu printing plus Cockpit as the production baseline.
                Treat Wine as a last-mile compatibility test harness for a specific
                Windows app only. I would not make Wine-hosted Zebra drivers or
                Wine-hosted PacKit the primary path unless native printing has already
                failed and a controlled proof-of-concept clearly beats it.
              </CardDescription>
            </Card>
          </section>

          <section className="grid gap-4 md:grid-cols-2">
            <Card className="h-full bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(255,247,237,0.9))]">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
                Current hardware plan
              </p>
              <CardTitle className="mb-3">Most stable supported-by-you setup</CardTitle>
              <CardDescription className="text-base">
                Ubuntu 24.04.4 LTS on the XM-F025 if it is the workstation, Zebra
                ZT410 on wired Ethernet, raw ZPL queue, archived label payloads, and
                zero dependence on PacKit in the Ubuntu runtime.
              </CardDescription>
            </Card>

            <Card className="h-full bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(239,246,255,0.92))]">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
                Reality check
              </p>
              <CardTitle className="mb-3">What matters more than replacing hardware</CardTitle>
              <CardDescription className="text-base">
                The bigger win is a stable LAN-first architecture, one queue, one
                label format path, and app-side reprints. Those changes matter more
                than swapping the printer or adding another computer.
              </CardDescription>
            </Card>
          </section>

          <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
            <Card className="h-full">
              <div className="mb-6 flex items-center gap-3">
                <Server className="size-5 text-[var(--accent)]" />
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
                    Long term
                  </p>
                  <CardTitle>Should this eventually move to Rocky Linux?</CardTitle>
                </div>
              </div>
              <div className="space-y-3">
                {longTermPlatform.map((item) => (
                  <div
                    key={item}
                    className="flex gap-3 rounded-[1.3rem] border border-[var(--line)] bg-white/70 p-4"
                  >
                    <BadgeCheck className="mt-1 size-4 shrink-0 text-[var(--accent)]" />
                    <p className="leading-7 text-[var(--ink)]">{item}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="h-full">
              <div className="mb-6 flex items-center gap-3">
                <Boxes className="size-5 text-[var(--accent)]" />
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
                    Incus addendum
                  </p>
                  <CardTitle>Where Incus helps and where it does not</CardTitle>
                </div>
              </div>
              <div className="space-y-3">
                {incusGuidance.map((item) => (
                  <div
                    key={item}
                    className="flex gap-3 rounded-[1.3rem] border border-[var(--line)] bg-white/70 p-4"
                  >
                    <BadgeCheck className="mt-1 size-4 shrink-0 text-[var(--accent)]" />
                    <p className="leading-7 text-[var(--ink)]">{item}</p>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <Card className="h-full">
              <div className="mb-6 flex items-center gap-3">
                <Cloud className="size-5 text-[var(--accent)]" />
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
                    Cloud-init addendum
                  </p>
                  <CardTitle>Useful if you expect more stations later</CardTitle>
                </div>
              </div>
              <div className="space-y-3">
                {cloudInitGuidance.map((item) => (
                  <div
                    key={item}
                    className="flex gap-3 rounded-[1.3rem] border border-[var(--line)] bg-white/70 p-4"
                  >
                    <BadgeCheck className="mt-1 size-4 shrink-0 text-[var(--accent)]" />
                    <p className="leading-7 text-[var(--ink)]">{item}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="h-full">
              <div className="mb-6 flex items-center gap-3">
                <Cable className="size-5 text-[var(--accent)]" />
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
                    Starter template
                  </p>
                  <CardTitle>Baseline cloud-init example</CardTitle>
                </div>
              </div>
              <pre className="overflow-x-auto rounded-[1.5rem] border border-[var(--line)] bg-[var(--night)] p-5 text-sm leading-7 text-[var(--night-ink)]">
                <code>{cloudInitExample}</code>
              </pre>
            </Card>
          </section>
        </section>

        <section id="references" className="space-y-6">
          <SectionHeading
            eyebrow="References"
            title="Primary source material"
            description="These are the manuals, vendor docs, and official references the guide relies on."
          />

          <Card>
            <div className="grid gap-4 md:grid-cols-2">
              {references.map((reference) => (
                <a
                  key={reference.href}
                  href={reference.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-[1.5rem] border border-[var(--line)] bg-white/70 p-5 transition hover:-translate-y-0.5 hover:bg-white"
                >
                  <div className="mb-2 flex items-start justify-between gap-4">
                    <h3 className="text-lg font-semibold text-[var(--ink)]">
                      {reference.title}
                    </h3>
                    <ExternalLink className="mt-1 size-4 shrink-0 text-[var(--muted)] transition group-hover:text-[var(--accent)]" />
                  </div>
                  <p className="text-sm leading-7 text-[var(--muted)]">
                    {reference.detail}
                  </p>
                </a>
              ))}
            </div>
          </Card>
        </section>
      </main>
    </div>
  )
}

export default App
