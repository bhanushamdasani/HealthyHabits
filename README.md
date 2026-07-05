# 🔥 HealthyHabits

> **Your personal biohacking operating system.** A premium offline-first Progressive Web App (PWA) that helps you build, track, and stick to daily health rituals — from meals and workouts to sleep and hydration.

---

## 📱 Live Demo

**[bhanushamdasani.github.io/HealthyHabits](https://bhanushamdasani.github.io/HealthyHabits)**

> Works fully offline after first load. Add to your home screen for the native app experience.

---

## ✨ Features

### 🧬 Daily Ritual Engine
- 7-day fully customizable habit schedule (Mon–Sun)
- Per-day task slots: Meals, Workouts, Bio-Hacks, Custom
- **Active / Light / Silent** day modes with one-tap switching
- Live task glow — highlights the next upcoming ritual in real-time
- One-off task injection for spontaneous additions
- Bulk mute/unmute task categories

### 📊 Insights & Biometrics
- **Interactive BMI Gauge** — sliding color-coded indicator (Underweight → Obese)
- **7-Day Weight Trend Chart** — visual bar chart of AM/PM weight logs
- **Sleep Consistency Index** — circadian rhythm score based on bedtime variance
- **Hydration Efficiency Score** — tracks volume + spacing quality, updates live

### 🗓️ Smart Calendar
- **Month view** with circular date cells (green = perfect day, blue = partial)
- **Monthly Stats Strip**: Perfect days / Partial days / 🔥 Current streak / Completion %
- **Day Detail Panel** — tap any date to see every ritual + water intake for that day
- Blue hydration dot on days you hit ≥2L of water
- Current streak calculated live, day by day

### 🔔 Intelligent Notifications
- **30-minute early alerts** before each scheduled ritual
- **Context-aware, day-specific motivational copy** — uses your actual scheduled food name / activity
- Meal alerts styled like Swiggy/Zomato (e.g. *"Besan Chilla loading in 30 mins ⭐⭐⭐⭐⭐"*)
- Workout alerts use pump-up psychology referencing your exact exercise
- **Test Alert** fires a preview of your NEXT upcoming real task — never a hardcoded placeholder
- Offline push via Service Worker

### 💧 Hydration Engine
- Track daily water intake in 250ml increments
- Progress bar toward 3L daily goal
- Live hydration efficiency score with advice on spacing

### 🌙 Circadian Sleep Logger
- Log bedtime + wake time per day
- Sleep duration calculated automatically
- Multi-day variance tracked for consistency scoring

### 🎨 Premium UI
- **Glassmorphism design** — Apple iOS-inspired translucent surfaces
- Dark / Light mode toggle (persisted)
- Dynamic Island notification pill
- Confetti burst on daily completion
- Breathing / mindfulness ring animation
- Smooth slide transitions between views (no page reloads)
- Responsive for all devices: iPhone SE → iPhone 16 Pro Max, Android, and laptop

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Core | Vanilla HTML5 + CSS3 + JavaScript (ES2022) |
| Fonts | Plus Jakarta Sans (Google Fonts) |
| Offline | Service Worker (Cache API) |
| Install | Web App Manifest (PWA) |
| Storage | `localStorage` (fully offline) |
| Styling | Custom CSS Variables + Glassmorphism |
| Animations | CSS Keyframes + `cubic-bezier` transitions |
| Notifications | Web Notifications API + Service Worker postMessage |

> **Zero dependencies. Zero frameworks. Zero build step.** Open `index.html` and it works.

---

## 🚀 Getting Started

### Option 1 — Use it instantly
Visit **[bhanushamdasani.github.io/HealthyHabits](https://bhanushamdasani.github.io/HealthyHabits)** on any device and tap **"Add to Home Screen"**.

### Option 2 — Run locally
```bash
git clone https://github.com/bhanushamdasani/HealthyHabits.git
cd HealthyHabits

# Serve with any static file server, e.g.:
npx serve .
# or
python -m http.server 8080
```
Then open `http://localhost:8080` in your browser.

> ⚠️ Service Workers require HTTPS or `localhost` — opening `index.html` directly as a file:// URL will disable offline features and notifications.

---

## 📂 Project Structure

```
HealthyHabits/
├── index.html      # Entire app — UI, CSS, JS, all in one optimized file
├── sw.js           # Service Worker — offline caching + push notifications
├── manifest.json   # PWA manifest — install config, icons, theme
└── icon.png        # App icon (used for home screen + notifications)
```

---

## 🏗️ Architecture

```
┌────────────────────────────────────────┐
│           App Shell (index.html)       │
│  ┌──────────┐  ┌──────────┐  ┌──────┐ │
│  │ Rituals  │  │ Insights │  │ Sett │ │  ← Slider views (translateX)
│  │ (Dashboard)│ (Analytics)│ │ ings │ │
│  └──────────┘  └──────────┘  └──────┘ │
│                                        │
│  localStorage ←→ appData object        │  ← All state
│  Service Worker ←→ Notification API    │  ← Background alerts
└────────────────────────────────────────┘
```

All state is stored as a single `appData` JSON object in `localStorage`. No backend, no accounts, no tracking — your data never leaves your device.

---

## 🔧 Customization

All schedules are edited directly in the app via the **Settings → Schedule Editor** accordion. Each task has:

| Field | Description |
|---|---|
| `act` | Activity name (e.g. "Breakfast", "Gym") |
| `t` | Time (e.g. "07:30 AM") |
| `instr` | Instructions / food item / exercise detail |
| `rule` | Personal rule or target |
| `type` | `meal` / `workout` / `hack` |
| `reminder` | `true` / `false` — whether to send alert |

---

## 📤 Data Backup

Go to **Insights → Export Backup File** to download your full data as a `.json` file. Restore it anytime with **Import Backup File**.

---

## 🔔 Notification Setup

1. Open the app → go to **Settings → Alerts & Notifications**
2. Tap **Enable Alerts** and grant browser permission
3. Use **Test Alert (5s)** to verify — it fires a preview of your next scheduled task
4. All alerts fire **30 minutes before** each ritual start time

> On iOS, you must add the app to your Home Screen (PWA install) for notifications to work.

---

## 📸 Screenshots

| Rituals | Insights | Calendar |
|---|---|---|
| Live ritual view with glowing active task | BMI gauge + sleep index + hydration score | Month view with streak stats + day detail |

---

## 🤝 Contributing

PRs are welcome! For major changes, open an issue first.

```bash
# Fork and clone
git clone https://github.com/YOUR_USERNAME/HealthyHabits.git

# Create a branch
git checkout -b feature/my-feature

# Make changes, then push
git push origin feature/my-feature
```

---

## 📄 License

MIT License — free to use, modify, and distribute.

---

<div align="center">

Built with 🔥 by [@bhanushamdasani](https://github.com/bhanushamdasani)

*Consistency beats intensity. Every. Single. Time.*

</div>
