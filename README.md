# حوالاتي · My Transfers

A **multi-tenant, bilingual (Arabic RTL / English LTR)** point-of-sale and money-transfer
platform built with **Angular 20**, **Angular Material (M3)**, **Tailwind CSS**, and
**ngx-translate**. Each business (tenant) gets its own isolated workspace — orders, banks,
menu, expenses, team, and audit trail — while a separate **Super Admin** portal oversees every
tenant on the platform. Arabic is the default language, with instant runtime language switching
(no reload). Designed **mobile-first**, since day-to-day use happens at the counter on a phone.

> Application name: **حوالاتي** (Arabic) / **My Transfers** (English) — switches automatically with the language.

---

## ✨ Features

### Tenant workspace
- 📊 **Dashboard** — revenue/order stats, recent orders, quick "New Order" action, weekly activity chart.
- 🧾 **New order / Send money** — build an order from the menu, then record how it was paid (cash + change, or bank/wallet transfer) — usable from a dialog or its own full page.
- 🕘 **History** — full order log with search, payment-method & status filters, pagination.
- 🏦 **Banks & wallets** — searchable CRUD list of receiving accounts, with WhatsApp order notifications.
- 🍔 **Menu** — items grouped by category, with dynamic categories managed from Constants.
- 💵 **Expenses** — track outgoing spend by category.
- 📄 **Reports** — date-range revenue report, exported to **PDF** in the active language (RTL/LTR), rendered at a simulated desktop width so it exports correctly even from a phone.
- ⚙️ **Constants** — tenant-managed lookup lists (menu categories, expense categories, …).
- 👥 **Team & Roles** — invite staff, assign **Owner / Manager / Staff** roles or fully custom roles from a permission checkbox-matrix.
- 📱 **Registered devices** — see and sign out active sessions for the account.
- 📜 **Activity log** — searchable, filterable audit trail of every meaningful action taken in the tenant.
- 🆘 **Help center** — searchable feature guide + FAQ.
- 🙋 **Account settings** — profile, security, notifications, plus entry points to Devices and Activity Log.

### Platform (Super Admin)
- 🏢 **Tenant directory** — search/filter every business on the platform, suspend/activate, change plan, add a new tenant.
- 🔎 **Tenant detail** — a single tenant's info, team roster, and activity, with plan/status controls.
- 🌐 **Platform dashboard** — cross-tenant stats, platform health, recent signups, recent activity, PDF export.
- 🗒️ **Platform logs** — every audited action across every tenant, filterable by tenant/category.
- 💾 **Backup management** — simulated on-demand/scheduled backups with storage usage, restore, and a real downloadable JSON snapshot.
- 🔔 **Notifications** — a bell menu surfacing suspended tenants and recent signups.

### Platform-wide
- 🔐 **Auth & onboarding** — Login, self-serve business **Signup** (mints a new tenant + Owner account), Forgot Password.
- 🛡️ **Role-based access control** — every mutating action is gated by a `PermissionKey`; UI hides what a role can't do.
- 🌍 **Full i18n from day one** — Arabic (RTL, default) + English (LTR), instant switch, persisted in `localStorage`.
- 🌗 **Light / dark mode** — persisted, applied through Angular Material and Tailwind's `dark:` variants.
- 🎨 **Material 3 design system** — a navy/amber palette applied through Tailwind **and** Angular Material tokens.
- 📱 **Mobile-first, page by page** — every data table renders as a card list below `md`, with a desktop table above it.
- 🔢 **Localized numbers, dates & currency** via the `Intl` API (re-formats on language change; always Latin digits).

---

## 🧰 Tech stack

| Concern | Choice |
| --- | --- |
| Framework | Angular 20 (standalone components, signals) |
| UI components | Angular Material 20 (M3) |
| Styling | Tailwind CSS 3 (Preflight enabled) |
| i18n | `@ngx-translate/core` v16 (runtime switching) |
| PDF export | `jspdf` + `html2canvas` (dynamically imported, only loaded when a PDF is actually exported) |
| Icons | Material Symbols Outlined |

---

## 🚀 Getting started

```bash
# install
npm install

# run the dev server (http://localhost:4200)
npm start

# production build → dist/hawalaty
npm run build

# unit tests
npm test
```

### Demo accounts

Everything is mock/in-memory (see [Notes](#-notes)), seeded across **two tenants** plus one
platform Super Admin. Password for every account below is **`123456`**.

| Role | Tenant | Email |
| --- | --- | --- |
| Owner | بيت التميس | `admin@hawalaty.com` |
| Manager | بيت التميس | `manager@hawalaty.com` |
| Staff | بيت التميس | `staff@hawalaty.com` |
| Owner | مطعم الأصالة | `owner@alasala.com` |
| Staff | مطعم الأصالة | `staff@alasala.com` |
| **Super Admin** (platform) | — | `superadmin@hawalaty.com` |

You can also try the **Signup** page to spin up a brand-new third tenant end-to-end.

---

## 🌐 Internationalization

Translations live in `src/assets/i18n/{ar,en}.json`. **Never hardcode UI strings** — always use keys:

```html
<!-- GOOD -->
{{ 'dashboard.title' | translate }}
<!-- BAD -->
Dashboard
```

Everything is driven by [`LanguageService`](src/app/core/language.service.ts) — the single source of truth
for the active language, direction (`dir`), font (`--app-font`), page `<title>`, and persistence.
Numbers/dates/currency use the `Intl`-based [`FormatService`](src/app/core/format.service.ts) and the
`localNumber` / `localCurrency` / `localDate` pipes, so they re-format instantly on language change.

See **[I18N.md](I18N.md)** for the full guide (adding keys, adding a third language, PDF behavior).

---

## 🔐 Multi-tenancy & permissions

- **Tenants** ([`TenantsService`](src/app/core/tenants.service.ts)) are independent businesses; each one gets its own isolated set of banks, menu, expenses, team, and audit log. Creating a tenant (via Signup or the Super Admin "Add Business" dialog) clones the three system roles for it.
- **Roles** ([`RolesService`](src/app/core/roles.service.ts)) — every tenant starts with **Owner** (full access), **Manager** (everything except managing the team), and **Staff** (create orders only), and can add fully custom roles from the same `PermissionKey` catalog.
- **Permissions** ([`PermissionsService`](src/app/core/permissions.service.ts)) — `can(key)` gates every Add/Edit/Delete affordance in the UI; a Super Admin always passes.
- **Audit log** ([`AuditLogService`](src/app/core/audit-log.service.ts)) — every mutation across every domain writes an entry, scoped to the acting tenant (or an explicit target tenant, for Super Admin actions), surfaced in both the tenant's own Activity Log and the platform-wide Admin Logs.
- **Guards** ([`auth.guard.ts`](src/app/core/auth.guard.ts)) — `authGuard`/`guestGuard` route based on session state, `superAdminGuard` protects the entire `/admin` section.

---

## 🎨 Design system

The Material 3 **navy/amber** palette is defined once and shared:

- **Tailwind** — full token set (`primary`, `secondary`, `surface-container-*`, `outline`, …) plus custom
  spacing, typography, and font families in [`tailwind.config.js`](tailwind.config.js).
- **Angular Material** — the same colors mapped onto `--mat-sys-*` tokens in
  [`src/styles.scss`](src/styles.scss), so dialogs, menus, and snackbars match in both light and dark mode.

Reusable utilities: `.glass-card`, `.tonal-elevation`, and the responsive `.app-sidebar` drawer.
Every data table follows the same mobile pattern: a `hidden md:block` table for desktop/tablet,
paired with a `md:hidden` card list rendering the identical data below the `md` breakpoint.

---

## 🗺️ Routes

### Tenant workspace (auth guard)

| Path | Page |
| --- | --- |
| `/dashboard` | Dashboard |
| `/transfers` | New order / send money |
| `/history` | Order history |
| `/banks` | Banks & wallets (CRUD) |
| `/menu` | Menu items |
| `/expenses` | Expenses |
| `/reports` | Reports (PDF export) |
| `/constants` | Tenant-managed lookup lists |
| `/team` | Team & Roles |
| `/devices` | Registered devices |
| `/activity-log` | Tenant activity log |
| `/settings` | Profile & settings |
| `/help` | Help center |

### Platform (super-admin guard)

| Path | Page |
| --- | --- |
| `/admin/dashboard` | Platform dashboard |
| `/admin/tenants` | Tenant directory |
| `/admin/tenants/:id` | Tenant detail |
| `/admin/logs` | Platform-wide audit log |
| `/admin/backups` | Backup management |

### Public (guest guard)

| Path | Page |
| --- | --- |
| `/login` | Login |
| `/signup` | Business signup (creates a tenant) |
| `/forgot-password` | Forgot password |

Authenticated tenant routes render inside the [`Layout`](src/app/layout/layout.ts) shell
(sidebar + header); Super Admin routes render inside [`AdminLayout`](src/app/features/admin/admin-layout.ts),
a separate, lighter shell. Auth state is handled by [`AuthService`](src/app/core/auth.service.ts).

---

## 📁 Project structure

```
src/
├─ app/
│  ├─ core/            # LanguageService, FormatService, AuthService, guards, RBAC, audit log, PDF, pipes
│  ├─ layout/           # tenant app shell (sidebar + header)
│  ├─ shared/           # language switcher, theme toggle, field-error, confirm dialog
│  ├─ features/
│  │  ├─ auth/          # login, signup, forgot password
│  │  ├─ dashboard/     # dashboard + new-order dialog
│  │  ├─ transfers/     # new order / send money (full page)
│  │  ├─ history/       # order history
│  │  ├─ banks/         # banks & wallets CRUD + dialog
│  │  ├─ menu/          # menu items
│  │  ├─ expenses/      # expenses
│  │  ├─ reports/       # PDF report
│  │  ├─ constants/     # tenant lookup lists
│  │  ├─ team/          # team members + roles & permissions
│  │  ├─ devices/       # registered devices
│  │  ├─ activity-log/  # tenant audit log viewer
│  │  ├─ settings/      # profile & settings
│  │  ├─ help/          # help center
│  │  ├─ admin/         # Super Admin portal (dashboard, tenants, logs, backups)
│  │  └─ errors/        # 404
│  └─ data/             # mock data (tenants, roles, team members, banks, menu, transfers, audit log, backups, …)
└─ assets/i18n/         # ar.json, en.json
```

---

## 📝 Notes

- **Everything is mock/demo, simulated entirely in the frontend.** `AuthService.login()` validates
  against seeded accounts and every feature uses signal-based in-memory stores (`core/*.service.ts` +
  `data/*.ts`) — there is no backend or database. Swap `login()` for a real HTTP call and replace the
  mock arrays with API calls when a backend is available.
- **Tenant isolation is UI-level, not service-enforced.** Permission checks hide actions a role
  can't perform, matching this app's "surface impossible actions before the click" philosophy, but
  there's no server to enforce it — a real backend must re-validate everything.
- **Arabic PDFs** are produced by rasterizing the live (already shaped) DOM via `html2canvas`, so
  RTL and Arabic ligatures render correctly without embedding Arabic fonts into jsPDF (trade-off:
  PDF text is an image). Capture uses a simulated desktop viewport width so the full desktop table
  layout exports correctly even when triggered from a phone.
- **Backups are simulated.** "Restore" and scheduled backups don't touch real data; "Download"
  produces a real JSON file of the mock backup metadata.

---

<sub>Built with Angular 20 · Bilingual by design · Mobile-first.</sub>
