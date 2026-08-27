# 🔥 HealthyHabits

> **A modern offline-first Progressive Web App (PWA) for building healthy habits, managing daily routines, and staying consistent with your wellness goals.**

HealthyHabits is a feature-rich wellness companion designed to help users organize their daily schedule, track healthy habits, receive intelligent reminders, monitor health metrics, and maintain long-term consistency—all from a beautiful, installable web application.

---

## 🌐 Live Demo

### 🚀 Try HealthyHabits

**https://healthy-habits-phi.vercel.app/**

Experience HealthyHabits directly from your browser—no account or installation required.

---

## 🌟 Highlights

- 📱 Installable Progressive Web App (PWA)
- 🔔 Smart Reminder Notifications
- 📶 Offline-First Experience
- 🤖 Built-in Task Support Assistant
- 📊 BMI, Hydration & Sleep Analytics
- 📅 Weekly Habit Planner
- 📈 Progress & Streak Tracking
- 💾 Local Backup & Restore
- 🌙 Dark & Light Theme
- ⚡ Fast, Lightweight & Privacy-Friendly

---

# ✨ Features

---

## 🧬 Daily Habit Planner

Organize your entire weekly routine with complete flexibility.

Features include:

- Fully customizable 7-day schedule
- Separate routines for Monday–Sunday
- Dedicated task types:
  - Meals
  - Workouts
  - Bio Hacks
  - Custom Activities
- Active / Light / Silent day modes
- Live highlighting of the next upcoming task
- One-time task creation
- Bulk enable/disable reminders

---

## 🤖 Smart Task Support Assistant

Every activity includes a built-in **Support** button that provides contextual guidance based on the selected task.

Depending on the activity, the assistant can help users:

- 📖 Learn the correct way to perform an exercise
- 🍳 View complete step-by-step recipes
- 🥗 Understand nutritional benefits of meals
- 💪 Learn why a workout or activity is important
- ⚠️ Read safety tips and precautions
- 💡 Receive practical health recommendations
- 📚 Discover useful wellness information without leaving the app

Instead of simply reminding users what to do, HealthyHabits also explains **how to do it and why it matters**, making it a complete wellness companion.

---

## 🔔 Intelligent Notifications

HealthyHabits delivers personalized reminder notifications rather than generic alerts.

Features include:

- 30-minute early reminders
- Context-aware notification messages
- Uses the exact task name
- Meal notifications inspired by food delivery apps
- Workout reminders with motivational messages
- Test Notification previews the actual next scheduled task
- Works even when the app is closed (Service Worker)

---

## 📊 Health Insights

Track your health with interactive visual analytics.

Included metrics:

### 📏 BMI Gauge

- Interactive BMI indicator
- Color-coded health zones
- Real-time calculation

### ⚖️ Weight Tracker

- Morning & Evening weight logging
- Weekly trend visualization
- Progress monitoring

### 😴 Sleep Consistency

- Bedtime logging
- Wake-up tracking
- Automatic sleep duration calculation
- Circadian rhythm consistency score

### 💧 Hydration Analytics

- Water intake tracker
- 250ml quick-add buttons
- Daily progress indicator
- Hydration efficiency score
- Personalized hydration advice

---

## 📅 Smart Calendar

Visualize your consistency over time.

Calendar Features:

- Monthly calendar
- Perfect day indicators
- Partial completion indicators
- Water intake markers
- Current streak calculation
- Completion percentage
- Daily activity history
- Tap any date to view detailed logs

---

## 🎨 Premium User Experience

Designed with a clean and modern aesthetic.

UI Features:

- Apple-inspired Glassmorphism
- Dynamic Island notification bar
- Dark & Light themes
- Smooth animations
- Confetti celebration on completion
- Breathing & mindfulness animation
- Fully responsive layout
- Optimized for:
  - Android
  - iPhone
  - Tablets
  - Desktop

---

# 📱 Progressive Web App (PWA)

HealthyHabits can be installed directly from your browser.

Benefits include:

- Install like a native app
- Launch from Home Screen
- Full-screen experience
- Offline functionality
- Background notifications
- Fast loading using Service Workers
- No App Store required

---

# 🛠 Tech Stack

| Layer | Technology |
|---------|------------|
| Frontend | HTML5, CSS3, JavaScript (ES2022) |
| PWA | Service Worker, Web App Manifest |
| Storage | localStorage |
| Notifications | Web Notifications API |
| Charts | HTML5 Canvas |
| Fonts | Plus Jakarta Sans |
| Styling | CSS Variables + Glassmorphism |
| Deployment | Vercel |

---

# 🚀 Getting Started

## 📱 Option 1 — Use on Mobile (Recommended)

Open:

**https://healthy-habits-phi.vercel.app/**

For the best experience:

### Android (Chrome)

1. Open the website
2. Tap **⋮**
3. Select **Add to Home Screen** or **Install App**
4. Allow notifications when prompted

### iPhone (Safari)

1. Open the website
2. Tap **Share**
3. Select **Add to Home Screen**
4. Open the installed app
5. Allow notifications when requested

Once installed, HealthyHabits behaves like a native application with:

- Home Screen access
- Full-screen mode
- Offline support
- Faster loading
- Smart reminder notifications

---

## 💻 Option 2 — Run Locally

```bash
git clone https://github.com/bhanushamdasani/HealthyHabits.git

cd HealthyHabits

npm install

npm run dev
```

Then open:

```
http://localhost:5173
```

> Installation, offline caching, and notifications require HTTPS or localhost.

---

# 📂 Project Structure

```
HealthyHabits/
│
├── index.html
├── sw.js
├── manifest.json
├── icon.png
└── README.md
```

---

# 🏗 Architecture

```
                 HealthyHabits

             ┌─────────────────┐
             │     index.html  │
             └────────┬────────┘
                      │
        ┌─────────────┼─────────────┐
        │             │             │
 Dashboard      Insights      Settings
        │             │             │
        └─────────────┼─────────────┘
                      │
              localStorage
                      │
        ┌─────────────┴─────────────┐
        │                           │
 Service Worker          Notification API
        │                           │
        └─────────────┬─────────────┘
                      │
             Offline Support
```

HealthyHabits is entirely client-side.

- No backend
- No user accounts
- No tracking
- No external database

Your data never leaves your device.

---

# 🔧 Customization

Navigate to:

**Settings → Schedule Editor**

Every task can be customized.

| Field | Description |
|--------|-------------|
| act | Activity name |
| t | Scheduled time |
| instr | Exercise details, meal description, or preparation instructions |
| rule | Personal goal or reminder |
| type | meal / workout / hack / custom |
| reminder | Enable or disable notifications |

---

# 🤖 Task Support

Every activity includes a **Support** button.

Support provides contextual information based on the task, including:

- Exercise guidance
- Proper workout techniques
- Meal recipes
- Nutritional information
- Health benefits
- Preparation instructions
- Practical wellness tips
- Safety precautions

HealthyHabits doesn't just remind you—it teaches you.

---

# 💾 Data Backup

Backup your entire application data as a JSON file.

Navigate to:

```
Insights
    ↓
Export Backup
```

Restore anytime using:

```
Import Backup
```

No cloud account required.

---

# 🔔 Notification Setup

1. Open Settings
2. Navigate to Alerts & Notifications
3. Enable Notifications
4. Grant browser permission
5. Test using **Test Alert**

Notifications automatically trigger **30 minutes before every scheduled activity**.

---

# 🌐 Browser Support

| Browser | Supported |
|----------|-----------|
| Chrome | ✅ |
| Edge | ✅ |
| Brave | ✅ |
| Firefox | ✅ |
| Safari (iOS 16.4+) | ✅ |

---

# 📸 Screenshots

> Coming Soon

Suggested screenshots:

- Dashboard
- Insights
- Calendar
- Schedule Editor
- Notifications
- Dark Mode
- Task Support

---

# 🤝 Contributing

Contributions are always welcome.

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/new-feature
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push to GitHub

```bash
git push origin feature/new-feature
```

5. Open a Pull Request

---

# 📄 License

Licensed under the MIT License.

Feel free to use, modify, and distribute.

---

<div align="center">

## ❤️ Built by Bhanu Shamdasani

**Healthy habits create a healthier life.**

⭐ If you found this project helpful, consider giving it a **Star** on GitHub!

</div>
