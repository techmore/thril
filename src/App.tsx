import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  Cable,
  ExternalLink,
  Globe,
  MonitorSmartphone,
  Package,
  Printer,
  Server,
  ShieldCheck,
  Workflow,
} from 'lucide-react'

import {
  cockpitChecklist,
  commandBlocks,
  consistencyChecklist,
  diagnosticsIdeas,
  printerSteps,
  realityChecks,
  recommendation,
  references,
  setupHighlights,
  ubuntuSteps,
  wineVerdict,
} from '@/content'
import { Badge } from '@/components/ui/badge'
import { ButtonLink } from '@/components/ui/button'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'

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
                <Badge>Updated April 2, 2026</Badge>
              </div>

              <div className="space-y-4">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">
                  THRIL setup playbook
                </p>
                <h1 className="max-w-4xl font-serif text-5xl leading-[0.95] tracking-[-0.05em] text-[var(--ink)] sm:text-6xl lg:text-7xl">
                  Ubuntu + XM-F025 + Zebra ZT410, with the PacKit reality check
                  built in.
                </h1>
                <p className="max-w-3xl text-base leading-8 text-[var(--muted)] sm:text-lg">
                  This guide is designed to be the practical, stable path for a
                  touchscreen workstation or kiosk that needs to print Zebra labels
                  reliably. It includes Ubuntu bring-up, touch mapping, Zebra queue
                  recommendations, reprint strategy, and a clear answer on where
                  PacKit fits and where it does not.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <ButtonLink href="#stable-setup">
                  See the stable setup
                  <ArrowRight className="ml-2 size-4" />
                </ButtonLink>
                <ButtonLink href="#references" variant="secondary">
                  Jump to references
                </ButtonLink>
              </div>
            </div>

            <Card className="relative overflow-hidden border-[rgba(15,23,42,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(255,251,235,0.9))]">
              <div className="absolute inset-x-6 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--accent),transparent)]" />
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
                One-paragraph answer
              </p>
              <p className="text-lg leading-8 text-[var(--ink)]">
                The most stable setup is Ubuntu Desktop 24.04.4 LTS on a dedicated
                x86 box, XM-F025 connected with both video and USB touch, and the
                Zebra on wired Ethernet using a single CUPS queue over raw
                `socket://...:9100` if your app emits ZPL. PacKit should stay on a
                Windows admin workstation for packaging and deployment workflows,
                not in the Ubuntu print path.
              </p>
            </Card>
          </div>
        </section>

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

        <section id="stable-setup" className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
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
                Keep the problem simple: one display, one touch device, one output
                mapping. If a mixed-monitor layout causes touch drift, move the box
                to GNOME on Xorg and map explicitly with `xinput`.
              </CardDescription>
            </Card>

            <Card className="h-full">
              <div className="mb-4 flex items-center gap-3">
                <Printer className="size-5 text-[var(--accent)]" />
                <CardTitle>Printer strategy</CardTitle>
              </div>
              <CardDescription>
                Prefer LAN over serial. If your app can emit ZPL, a raw Zebra queue
                over AppSocket is usually the cleanest and most repeatable path on
                Ubuntu.
              </CardDescription>
            </Card>

            <Card className="h-full">
              <div className="mb-4 flex items-center gap-3">
                <Workflow className="size-5 text-[var(--accent)]" />
                <CardTitle>Reprint strategy</CardTitle>
              </div>
              <CardDescription>
                Archive the original label payload and reprint from your app or
                backend. That is more auditable and less error-prone than relying on
                whatever the printer last saw.
              </CardDescription>
            </Card>

            <Card className="h-full">
              <div className="mb-4 flex items-center gap-3">
                <Globe className="size-5 text-[var(--accent)]" />
                <CardTitle>Deployment strategy</CardTitle>
              </div>
              <CardDescription>
                This repo is configured as a Vite-built static site for GitHub
                Pages, so the guide can live publicly at
                `https://techmore.github.io/thril/`.
              </CardDescription>
            </Card>
          </div>
        </section>

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

        <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <Card id="ubuntu" className="h-full">
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
                      <p key={bullet} className="flex gap-3 leading-7 text-[var(--muted)]">
                        <span className="mt-3 block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                        <span>{bullet}</span>
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card id="zebra" className="h-full">
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
                      <p key={bullet} className="flex gap-3 leading-7 text-[var(--muted)]">
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
              <CardTitle>Command checklist</CardTitle>
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
              failed and a controlled proof-of-concept clearly beats it in repeated
              real-world runs.
            </CardDescription>
          </Card>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <Card className="h-full bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(255,247,237,0.9))]">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
              If you keep the ZT410
            </p>
            <CardTitle className="mb-3">Most stable supported-by-you setup</CardTitle>
            <CardDescription className="text-base">
              Ubuntu 24.04.4 LTS, Zebra on wired Ethernet, raw ZPL queue, archived
              label payloads, and zero dependence on PacKit in the Ubuntu runtime.
              This is the path with the fewest moving pieces.
            </CardDescription>
          </Card>

          <Card className="h-full bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(239,246,255,0.92))]">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
              If you can upgrade hardware
            </p>
            <CardTitle className="mb-3">Better long-term path</CardTitle>
            <CardDescription className="text-base">
              Move to a ZT411, keep the same LAN-first architecture, and revisit
              driver/firmware choices around current Zebra support. That reduces the
              risk tied to the ZT410’s support sunset.
            </CardDescription>
          </Card>
        </section>

        <section id="references">
          <Card>
            <div className="mb-6 flex items-center gap-3">
              <ExternalLink className="size-5 text-[var(--accent)]" />
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
                  References
                </p>
                <CardTitle>Primary links used in this guide</CardTitle>
              </div>
            </div>

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
