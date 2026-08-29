# Personal Portfolio Site - Cybersecurity & AI

## Visit [connordethomasis.dev](https://connordethomasis.github.io "Go to Connor's personal website")

I'm Connor De Thomasis, a second-year student at QUT studying a Bachelor of Information Technology majoring in Cyber Security and second majoring in Artificial Intelligence.

This website serves the role of a personal portfolio to demonstrate my skills and capabilities as an aspiring AI security Researcher.

---

## What's on the site

### `index.html` — the portfolio

**About** — Cyber Security & AI Analyst working across Security & GRC, blue team and AI guardrails.
Based in Brisbane, QLD, graduating December 2027, CompTIA Security+ in progress, and open to
internship opportunities. Résumé is downloadable from the nav bar and the hero.

**Education & Certifications**

| | |
|---|---|
| Bachelor of Information Technology | QUT, Gardens Point — Feb 2025 to present, graduating Dec 2027 |
| Secondary Graduation Certificate | Holy Spirit College, Mackay — graduated Nov 2024, Year 12 Academic Excellence |
| CompTIA Security+ | In progress, studied alongside coursework |
| P2 Provisional Driver's Licence | Current, manual |

**Professional Experience**

- **IT Work Experience (school-based)** — Mackay Regional Council, 2023 & 2024. Two one-week
  placements across network, systems and endpoint engineering, help desk, IT operations,
  governance and digital transformation, and cyber security engineering.
- **Crew Member** — McDonald's, North Mackay, Mar 2022 to Jan 2025. Training and onboarding new
  crew, front-line service under sustained volume, and strict food safety compliance.

**Skills** — grouped into Security & GRC, Detection & Infrastructure, AI Security, Programming &
Data, Systems & Support, and Professional skills.

**Projects**

1. **Information Security Risk Assessment & Incident Response Planning** (QUT, Mar–May 2026) — a
   two-part GRC engagement for a simulated 10-property hospitality group. Owned network
   infrastructure as one of six assessed assets, scored a flat network architecture as a Critical
   inherent risk against a 5×5 matrix, and costed EDR and MFA rollouts across 1,100 devices for a
   budget-constrained treatment plan. Followed by a business impact analysis and a NIST SP 800-61
   aligned incident response plan with SEV 1–3 classification and OAIC notifiable data breach
   escalation triggers.
2. **Secure Topic-Constrained AI Chatbot with Layered Guardrails** (QUT, May 2026) — a Python
   chatbot on Azure OpenAI wrapping every turn in a six-layer guardrail pipeline: token cap,
   keyword denylist, embedding similarity against 26 jailbreak archetypes, topic-anchor
   similarity, and an LLM-as-a-Judge on both input and output. Refusals are generic while the
   triggering layer and scores go to a rotating JSON audit log.
   [Repository](https://github.com/connordethomasis/secure-chatbot)
3. **Detection Engineering Homelab** (personal, July 2026 to present) — see below.

**Contact** — email, LinkedIn and GitHub.

### `homelab.html` — the lab spec sheet

A living spec sheet for **atlas**, the detection engineering lab behind project 3. Reached from the
`Homelab` nav link and from the project card on the home page.

- **Host** — Dell Precision T5810 running Proxmox VE: Xeon E5-2680 v4 (14C/28T), 24 GB ECC across
  6 of 8 slots, a 256 GB SSD for guest disks plus a 2 × 2 TB ZFS mirror, a 490 W UPS with NUT, and
  the `lab.local` domain.
- **Systems** — seven collapsible panels covering compute, memory, storage, power and protection,
  the virtualisation stack, network segmentation, and detection engineering. Each row is marked
  operational, needs attention, or planned, so the sheet doubles as a to-do list.
- **Expansion headroom** — what is still free in the chassis, and the priority order for spending
  on it: NVMe, then RAM to 128 GB, then a second NIC and managed switch, then a GPU.

The lab is isolated: no inbound exposure and no production data.

---

## Building it

A static site with no build step, no dependencies and no framework — open `index.html` and it
runs. Hosted on GitHub Pages.

```
index.html      Portfolio — about, education, experience, skills, projects, contact
homelab.html    Detection engineering lab spec sheet
style.css       All styling for both pages
script.js       Navigation behaviour and the spec sheet accordions
assets/         Résumé PDF and portrait
```

Both pages share `style.css` and `script.js`, so the spec sheet is built from the same cards,
chips, status pills and buttons as the portfolio rather than its own set of styles.

**Design and behaviour**

- Manrope from Google Fonts, Font Awesome for icons, and a single set of CSS custom properties for
  colour, spacing and shadows.
- Light and dark themes, chosen automatically from `prefers-color-scheme`.
- A sticky nav bar that hides as you scroll down and returns on the way up, with an underline that
  marks the section you are currently reading.
- The spec sheet panels expand and collapse individually or all at once, and print fully expanded.

**Accessibility**

- Skip link, visible focus outlines meeting WCAG 2.2 focus appearance, and `aria-expanded` kept in
  step with every disclosure.
- Reflows to a single column on small screens, with the nav collapsing to a menu button before the
  rest of the layout stacks.
- Honours `prefers-reduced-motion` by dropping animation and hover movement.