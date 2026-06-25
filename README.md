# Recruitment Employer Frontend Documentation

---

## 📖 Project Overview

This repository contains the **Employer** side of the *Recruitment* platform – a modern, premium‑styled web application built with **React**, **TypeScript**, **Vite**, and **Tailwind‑CSS** (custom vanilla CSS).  The UI follows the brand color `#800020` with a clean, shadow‑free design, profile photos for every candidate, and consistent terminology (Applicant ↔ Candidate).

---

## 🛠️ Tech Stack

- **Framework**: React (functional components, hooks)
- **Build Tool**: Vite (`npm run dev`, `npm run build`)
- **Language**: TypeScript (strict typing, interfaces in `src/app/types.ts`)
- **Styling**: Tailwind‑CSS utility classes (no external UI libraries) – custom theme colors defined in `tailwind.config.js`.
- **State Management**: Local component state + top‑level `App.tsx` router state (no external store).
- **Routing**: Manual routing via `useLocation`/`useNavigate` (React Router).
- **Modals**: Controlled via boolean state variables.
- **Notifications**: `sonner` toast library.

---

## 📂 Repository Structure

```
Recruitment-Employer/
├─ src/
│  ├─ app/
│  │  ├─ components/               # Re‑usable UI components
│  │  │  ├─ admin/                  # Admin‑only components
│  │  │  ├─ modals/                 # All modal dialogs
│  │  │  ├─ pages/                  # Page‑level components
│  │  │  │  ├─ admin/               # Admin pages (SuperAdminDashboard, etc.)
│  │  │  │  └─ *.tsx                # Regular employer pages
│  │  │  ├─ ui/                     # Small UI primitives (buttons, inputs)
│  │  │  └─ *.tsx                   # Layout components (Sidebar, Header, etc.)
│  │  ├─ types.ts                  # Centralised TypeScript interfaces
│  │  ├─ App.tsx                    # Root component – router & global state
│  │  └─ index.css                  # Global CSS (Tailwind import + custom theme)
│  ├─ assets/                      # Static assets (icons, images)
│  └─ main.tsx                     # Vite entry point
├─ public/                          # Public static files (favicon, etc.)
├─ vite.config.ts                   # Vite configuration
├─ tailwind.config.js               # Tailwind theme configuration
├─ package.json                     # Scripts & dependencies
└─ README.md                        # <-- This documentation file
```

---

## 🔑 Key Files & Their Responsibilities

| File | Description | Link |
|------|-------------|------|
| `src/app/App.tsx` | Root component handling navigation, admin mode toggling, global modals, and typed state (`Job`, `Applicant`, `Candidate`). | [App.tsx](file:///C:/Users/Great%20Joe%20Computers/Desktop/Recruitment/Employer/src/app/App.tsx) |
| `src/app/types.ts` | Centralised type definitions used throughout the app for strong typing. | [types.ts](file:///C:/Users/Great%20Joe%20Computers/Desktop/Recruitment/Employer/src/app/types.ts) |
| `src/app/components/Sidebar.tsx` | Primary navigation drawer for employer users. | [Sidebar.tsx](file:///C:/Users/Great%20Joe%20Computers/Desktop/Recruitment/Employer/src/app/components/Sidebar.tsx) |
| `src/app/components/AdminSidebar.tsx` | Navigation drawer displayed when admin mode is active. | [AdminSidebar.tsx](file:///C:/Users/Great%20Joe%20Computers/Desktop/Recruitment/Employer/src/app/components/AdminSidebar.tsx) |
| `src/app/components/Header.tsx` | Top bar with menu button, brand logo, and optional actions. | [Header.tsx](file:///C:/Users/Great%20Joe%20Computers/Desktop/Recruitment/Employer/src/app/components/Header.tsx) |
| `src/app/components/pages/DashboardPage.tsx` | Main employer dashboard – shows KPIs and quick navigation tiles. | [DashboardPage.tsx](file:///C:/Users/Great%20Joe%20Computers/Desktop/Recruitment/Employer/src/app/components/pages/DashboardPage.tsx) |
| `src/app/components/pages/JobsPage.tsx` | Job listing, add‑job flow, and pipeline navigation. | [JobsPage.tsx](file:///C:/Users/Great%20Joe%20Computers/Desktop/Recruitment/Employer/src/app/components/pages/JobsPage.tsx) |
| `src/app/components/pages/CandidatesPage.tsx` | Candidate directory with profile preview. | [CandidatesPage.tsx](file:///C:/Users/Great%20Joe%20Computers/Desktop/Recruitment/Employer/src/app/components/pages/CandidatesPage.tsx) |
| `src/app/components/modals/AddJobModal.tsx` | Modal for creating a new job posting. | [AddJobModal.tsx](file:///C:/Users/Great%20Joe%20Computers/Desktop/Recruitment/Employer/src/app/components/modals/AddJobModal.tsx) |
| `src/app/components/modals/CandidateDetailsModal.tsx` | Displays full candidate profile (photo, contact info). | [CandidateDetailsModal.tsx](file:///C:/Users/Great%20Joe%20Computers/Desktop/Recruitment/Employer/src/app/components/modals/CandidateDetailsModal.tsx) |
| `src/app/components/pages/admin/SuperAdminDashboard.tsx` | Admin landing page – high‑level platform analytics. | [SuperAdminDashboard.tsx](file:///C:/Users/Great%20Joe%20Computers/Desktop/Recruitment/Employer/src/app/components/pages/admin/SuperAdminDashboard.tsx) |
| `src/app/components/pages/admin/CompaniesManagement.tsx` | CRUD UI for managing client companies. | [CompaniesManagement.tsx](file:///C:/Users/Great%20Joe%20Computers/Desktop/Recruitment/Employer/src/app/components/pages/admin/CompaniesManagement.tsx) |
| `src/app/components/pages/admin/PlatformAnalytics.tsx` | Platform‑wide analytics view. | [PlatformAnalytics.tsx](file:///C:/Users/Great%20Joe%20Computers/Desktop/Recruitment/Employer/src/app/components/pages/admin/PlatformAnalytics.tsx) |
| `src/app/components/pages/admin/SystemSettings.tsx` | Global settings (branding, feature toggles). | [SystemSettings.tsx](file:///C:/Users/Great%20Joe%20Computers/Desktop/Recruitment/Employer/src/app/components/pages/admin/SystemSettings.tsx) |

---

## 🧭 Navigation Flow

1. **Router Initialization** – `App.tsx` reads `location.pathname` and maps it to an internal `activePage` (e.g., `dashboard`, `jobs`, `admin‑dashboard`).
2. **Page Switching** – Clicking a sidebar item calls `setActivePage(page)`, which uses `navigate` from React Router to push the new URL.
3. **Admin Mode** – Determined by the URL prefix `/admin-`. Toggling admin mode updates `isAdminMode` and automatically redirects to the appropriate admin landing page.
4. **Modals** – Boolean state flags (`isAddJobModalOpen`, `isCandidateModalOpen`, …) control modal visibility. Interaction callbacks set the selected entity (`selectedCandidate`, `selectedApplicant`, `selectedPipelineJob`) and open the relevant modal.
5. **Profile View** – When a candidate is clicked, `handleViewCandidate` enriches the data with placeholder contact info, stores it in `selectedApplicant`, and switches `viewingApplicantProfile` to render the `ApplicantProfile` component.

---

## 🎨 UI / Design System

- **Primary Brand Color**: `#800020` – used for headers, active sidebar items, and button accents.
- **No Shadows / Outlines**: All `box‑shadow` utilities have been stripped. Elements rely on subtle borders and color contrast.
- **Typography**: Google Font **Inter** (imported in `index.css`).
- **Responsive Layout**: Flexbox grid with a mobile drawer (`isMobileMenuOpen`) that slides in from the left.
- **Micro‑animations**: Page transitions via `motion` (`framer‑motion`) with fade‑in/out for a smooth feel.

---

## ⚙️ Development & Build

```bash
# Install dependencies
npm install

# Run dev server (default: http://localhost:5174)
npm run dev

# Run production build
npm run build

# Preview the built app locally
npm run preview
```

**Environment variables** – None required for the front‑end. All API endpoints are mocked for now; replace `src/app/api.ts` (if present) with real URLs when the backend is ready.

---

## ✅ Production‑Readiness Checklist (already completed)

- [x] All `any` types replaced with explicit interfaces (`Job`, `Applicant`, `Candidate`).
- [x] All `console.log` statements removed.
- [x] Shadow and gradient CSS removed; brand‑color applied consistently.
- [x] Backup `.bak` files deleted.
- [x] Types exported from a single `types.ts` for easy consumption.
- [x] UI components use the `Inter` font and responsive design.
- [x] Modals and navigation fully wired; every button/link leads to the correct page.
- [x] Linting (ESLint) passes without warnings.
- [x] Build succeeds (`npm run build` produces a `dist/` folder).

---

## 📦 How to Contribute

1. **Branching** – Create a feature branch from `main`.
2. **Code Style** – Follow the existing component pattern (function components, Tailwind classes, TypeScript typings).
3. **Testing** – Run `npm run lint` and `npm run typecheck` before opening a PR.
4. **Documentation** – Keep this `README.md` up‑to‑date when adding new pages or major features.

---

## 📞 Support & Further Help

- **Issue Tracker** – Open a GitHub issue for bugs or feature requests.
- **Contact** – For design decisions, reach out to the UI/UX lead (email placeholder@example.com).

---

*End of documentation.*
