if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => { navigator.serviceWorker.register('./sw.js').catch(()=>{}); });
}

// --- NEW: MICRO-INTERACTION HELPERS ---
const vibrate = (ms) => { if(navigator.vibrate) navigator.vibrate(ms); };

const defaultSchedule = {
    mon: [
        { id: "t_mon_0", t:"03:30 AM", act:"Wake Up 1", instr:"500ml Warm Water + ½ Lemon + 1 tsp ACV", rule:"Prime Metabolism", type:"hack", reminder:true },
        { id: "t_mon_1", t:"04:00 AM", act:"Cardio 1", instr:"Mandir Visit (Fast Brisk Walk)", rule:"Fasted Fat Burn", type:"workout", reminder:true },
        { id: "t_mon_2", t:"07:00 AM", act:"Pre-Nap", instr:"5 Soaked Almonds + 1 Walnut", rule:"Brain Repair", type:"meal", reminder:true },
        { id: "t_mon_3", t:"07:15 AM", act:"Sleep 2", instr:"Sleep in Pitch Black Room", rule:"Hormone Reset", type:"hack", reminder:true },
        { id: "t_mon_4", t:"10:00 AM", act:"Wake Up 2", instr:"Black Coffee / Green Tea", rule:"Cortisol Spike", type:"meal", reminder:true },
        { id: "t_mon_5", t:"10:30 AM", act:"Breakfast", instr:"Veg Poha (60g) + Peas + Peanuts", rule:"+ 1 Multivitamin", type:"meal", reminder:true },
        { id: "t_mon_6", t:"11:00 AM", act:"Work", instr:"Deep Focus Block (No Phone)", rule:"Drink 1L Water", type:"hack", reminder:true },
        { id: "t_mon_7", t:"01:30 PM", act:"Lunch", instr:"2 Roti + Rajma (150g) + Cucumber Salad", rule:"Eat Salad First", type:"meal", reminder:true },
        { id: "t_mon_8", t:"01:50 PM", act:"Movement", instr:"'Shatapavali' Walk (10 Mins)", rule:"DO NOT SIT", type:"workout", reminder:true },
        { id: "t_mon_9", t:"03:45 PM", act:"Pre-Gym", instr:"1 Banana + Black Coffee + Flaxseeds", rule:"Energy Load", type:"meal", reminder:true },
        { id: "t_mon_10", t:"04:00 PM", act:"GYM", instr:"Full Body: Squat, Pushup, Lat Pull, Press", rule:"Last Set = DROP SET", type:"workout", reminder:true },
        { id: "t_mon_11", t:"05:30 PM", act:"Post-Gym", instr:"1 Scoop Whey Protein + Water", rule:"Drink at Gym", type:"meal", reminder:true },
        { id: "t_mon_12", t:"06:00 PM", act:"Work", instr:"Course Completion / Study", rule:"Active Brain", type:"hack", reminder:true },
        { id: "t_mon_13", t:"08:00 PM", act:"Dinner", instr:"Paneer Bhurji (100g) + Spinach", rule:"NO ROTI", type:"meal", reminder:true },
        { id: "t_mon_14", t:"08:20 PM", act:"Movement", instr:"'Shatapavali' Walk (10 Mins)", rule:"DO NOT SIT", type:"workout", reminder:true },
        { id: "t_mon_15", t:"10:00 PM", act:"Sleep", instr:"Lights Out", rule:"8 Hours Target", type:"hack", reminder:true }
    ],
    tue: [
        { id: "t_tue_0", t:"03:30 AM", act:"Wake Up 1", instr:"500ml Warm Water + ½ Lemon + 1 tsp ACV", rule:"Prime Metabolism", type:"hack", reminder:true },
        { id: "t_tue_1", t:"04:00 AM", act:"Cardio 1", instr:"Mandir Visit (Fast Brisk Walk)", rule:"Fasted Fat Burn", type:"workout", reminder:true },
        { id: "t_tue_2", t:"10:30 AM", act:"Breakfast", instr:"Oats Chilla (2) + Mint Chutney", rule:"+ 1 Multivitamin", type:"meal", reminder:true },
        { id: "t_tue_3", t:"01:30 PM", act:"Lunch", instr:"1 Roti + Chole + 1 Bowl Curd", rule:"Probiotics", type:"meal", reminder:true },
        { id: "t_tue_4", t:"04:00 PM", act:"GYM", instr:"Cardio: Cycle (20m) + Planks + Leg Raise", rule:"Sweat Mandatory", type:"workout", reminder:true },
        { id: "t_tue_5", t:"08:00 PM", act:"Dinner", instr:"Bhindi Fry + Yellow Dal", rule:"Easy Digestion", type:"meal", reminder:true },
        { id: "t_tue_6", t:"10:00 PM", act:"Sleep", instr:"Lights Out", rule:"8 Hours Target", type:"hack", reminder:true }
    ],
    wed: [
        { id: "t_wed_0", t:"03:30 AM", act:"Wake Up 1", instr:"500ml Warm Water + ½ Lemon + 1 tsp ACV", rule:"Prime Metabolism", type:"hack", reminder:true },
        { id: "t_wed_1", t:"04:00 AM", act:"Cardio 1", instr:"Mandir Visit (Fast Brisk Walk)", rule:"Fasted Fat Burn", type:"workout", reminder:true },
        { id: "t_wed_2", t:"10:30 AM", act:"Breakfast", instr:"2 Idli + Sambhar (Less Potato)", rule:"+ 1 Multivitamin", type:"meal", reminder:true },
        { id: "t_wed_3", t:"01:30 PM", act:"Lunch", instr:"1 Cup Rice + Dal Tadka + Salad", rule:"Carb Load for Gym", type:"meal", reminder:true },
        { id: "t_wed_4", t:"04:00 PM", act:"GYM", instr:"Push-Pull-Legs: Deadlift, Bench, Rows", rule:"Last Set = DROP SET", type:"workout", reminder:true },
        { id: "t_wed_5", t:"08:00 PM", act:"Dinner", instr:"Grilled Paneer (100g) + Soup", rule:"High Protein", type:"meal", reminder:true },
        { id: "t_wed_6", t:"10:00 PM", act:"Sleep", instr:"Lights Out", rule:"8 Hours Target", type:"hack", reminder:true }
    ],
    thu: [
        { id: "t_thu_0", t:"03:30 AM", act:"Wake Up 1", instr:"500ml Warm Water + ½ Lemon + 1 tsp ACV", rule:"Prime Metabolism", type:"hack", reminder:true },
        { id: "t_thu_1", t:"04:00 AM", act:"Cardio 1", instr:"Mandir Visit (Fast Brisk Walk)", rule:"Fasted Fat Burn", type:"workout", reminder:true },
        { id: "t_thu_2", t:"10:30 AM", act:"Breakfast", instr:"Paneer Sandwich (Brown Bread)", rule:"+ 1 Multivitamin", type:"meal", reminder:true },
        { id: "t_thu_3", t:"01:30 PM", act:"Lunch", instr:"2 Roti + Soya Chunks Sabzi", rule:"High Protein", type:"meal", reminder:true },
        { id: "t_thu_4", t:"04:00 PM", act:"GYM", instr:"LEGS: Squats, Leg Press, Lunges", rule:"DO NOT SKIP", type:"workout", reminder:true },
        { id: "t_thu_5", t:"08:00 PM", act:"Dinner", instr:"Besan Chilla (2) + Salad", rule:"Light Digestion", type:"meal", reminder:true },
        { id: "t_thu_6", t:"10:00 PM", act:"Sleep", instr:"Lights Out", rule:"8 Hours Target", type:"hack", reminder:true }
    ],
    fri: [
        { id: "t_fri_0", t:"03:30 AM", act:"Wake Up 1", instr:"500ml Warm Water + ½ Lemon + 1 tsp ACV", rule:"Prime Metabolism", type:"hack", reminder:true },
        { id: "t_fri_1", t:"04:00 AM", act:"Cardio 1", instr:"Mandir Visit (Fast Brisk Walk)", rule:"Fasted Fat Burn", type:"workout", reminder:true },
        { id: "t_fri_2", t:"10:30 AM", act:"Breakfast", instr:"Moong Dal Chilla", rule:"+ 1 Multivitamin", type:"meal", reminder:true },
        { id: "t_fri_3", t:"01:30 PM", act:"Lunch", instr:"1 Roti + Mix Veg Sabzi + Dal", rule:"Fiber Load", type:"meal", reminder:true },
        { id: "t_fri_4", t:"04:00 PM", act:"GYM", instr:"Arms/Shoulders: Curls, Extensions", rule:"Last Set = DROP SET", type:"workout", reminder:true },
        { id: "t_fri_5", t:"08:00 PM", act:"Dinner", instr:"Stir Fry Veggies + Paneer (80g)", rule:"High Heat Cooking", type:"meal", reminder:true },
        { id: "t_fri_6", t:"10:00 PM", act:"Sleep", instr:"Lights Out", rule:"8 Hours Target", type:"hack", reminder:true }
    ],
    sat: [
        { id: "t_sat_0", t:"03:30 AM", act:"Wake Up 1", instr:"500ml Warm Water + ½ Lemon", rule:"Prime Metabolism", type:"hack", reminder:true },
        { id: "t_sat_1", t:"04:00 AM", act:"Cardio 1", instr:"Mandir Visit (Fast Brisk Walk)", rule:"Fasted Fat Burn", type:"workout", reminder:true },
        { id: "t_sat_2", t:"10:30 AM", act:"Breakfast", instr:"Veg Dalia (Porridge)", rule:"Gut Reset", type:"meal", reminder:true },
        { id: "t_sat_3", t:"01:30 PM", act:"Lunch", instr:"Khichdi + 1 tsp Ghee", rule:"Joint Lubrication", type:"meal", reminder:true },
        { id: "t_sat_4", t:"01:50 PM", act:"Movement", instr:"'Shatapavali' Walk (10 Mins)", rule:"DO NOT SIT", type:"workout", reminder:true },
        { id: "t_sat_5", t:"03:45 PM", act:"Snack", instr:"Coconut Water", rule:"Electrolytes", type:"meal", reminder:true },
        { id: "t_sat_6", t:"04:00 PM", act:"ACTIVITY", instr:"45 Min Outdoor Nature Walk", rule:"NO GYM", type:"workout", reminder:true },
        { id: "t_sat_7", t:"08:00 PM", act:"Dinner", instr:"Papaya Bowl + Soup", rule:"Digestion Enzyme", type:"meal", reminder:true },
        { id: "t_sat_8", t:"10:00 PM", act:"Sleep", instr:"Lights Out", rule:"8 Hours Target", type:"hack", reminder:true }
    ],
    sun: [
        { id: "t_sun_0", t:"03:30 AM", act:"Wake Up 1", instr:"500ml Warm Water + ½ Lemon", rule:"No ACV today", type:"hack", reminder:true },
        { id: "t_sun_1", t:"04:00 AM", act:"Cardio 1", instr:"Mandir Visit (Gentle Walk)", rule:"Mental Peace", type:"workout", reminder:true },
        { id: "t_sun_2", t:"10:30 AM", act:"Breakfast", instr:"Besan Chilla", rule:"Light Protein", type:"meal", reminder:true },
        { id: "t_sun_3", t:"01:30 PM", act:"Lunch", instr:"Lauki Dal + 1 Roti", rule:"Stomach Rest", type:"meal", reminder:true },
        { id: "t_sun_4", t:"04:00 PM", act:"ACTIVITY", instr:"Yoga / Stretching (20 mins)", rule:"Muscle Release", type:"workout", reminder:true },
        { id: "t_sun_5", t:"08:00 PM", act:"Dinner", instr:"Salad + 1 Bowl Curd", rule:"Probiotics", type:"meal", reminder:true },
        { id: "t_sun_6", t:"10:00 PM", act:"Sleep", instr:"Lights Out", rule:"Ready for Monday", type:"hack", reminder:true }
    ]
};

let appData = { 
    schedule: {}, history: {}, dayModes: {}, dayReasons: {}, lightDayTypes: ['workout'], weights: {}, 
    user: "Warrior", height: 170, startW: 0, age: 25, gender: "male", activity: 1.2, 
    sleepLogs: {}, dateTasks: {}, accentTheme: "classic" 
};
let viewedDateObj = new Date();
let calDate = new Date();
let currentTabDay = 'mon';
let activeTimers = [];
let isBreathing = false;
let originalOffset = 0;
let lastPct = 0; 

window.onload = () => {
    initTheme();
    const stored = localStorage.getItem('metabolic_os_v13');
    if(!stored) {
        document.getElementById('onboarding').classList.remove('hidden');
    } else {
        appData = JSON.parse(stored);
        if(!appData.schedule) appData.schedule = JSON.parse(JSON.stringify(defaultSchedule));
        
        // Add stable IDs and migrate legacy history keys
        let migrated = false;
        Object.keys(appData.schedule).forEach(day => {
            appData.schedule[day].forEach((task, idx) => {
                if (!task.id) {
                    task.id = `t_${day}_${idx}`;
                    migrated = true;
                }
            });
        });
        if(!appData.history) appData.history = {};
        Object.keys(appData.history).forEach(oldKey => {
            const match = oldKey.match(/^(\d{4}-\d{2}-\d{2})-(\d+)$/);
            if (match) {
                const dateStr = match[1];
                const idx = parseInt(match[2]);
                const dateObj = new Date(dateStr + 'T12:00:00'); // local time
                const days = ['sun','mon','tue','wed','thu','fri','sat'];
                const dayName = days[dateObj.getDay()];
                const newKey = `${dateStr}-t_${dayName}_${idx}`;
                
                appData.history[newKey] = appData.history[oldKey];
                delete appData.history[oldKey];
                migrated = true;
            }
        });
        if (migrated) saveData();

        if(!appData.dayModes) appData.dayModes = {};
        if(!appData.dayReasons) appData.dayReasons = {};
        if(!appData.lightDayTypes) appData.lightDayTypes = ['workout'];
        if(!appData.weights) appData.weights = {};
        if(!appData.sleepLogs) appData.sleepLogs = {};
        if(!appData.dateTasks) appData.dateTasks = {};
        if(!appData.accentTheme) appData.accentTheme = 'classic';
        if(!appData.age) appData.age = 25;
        if(!appData.gender) appData.gender = 'male';
        if(!appData.activity) appData.activity = 1.2;
        if(appData.chimeEnabled === undefined) appData.chimeEnabled = true;
        
        document.getElementById('app').classList.remove('hidden');
        initApp();
    }
};

function saveData() { localStorage.setItem('metabolic_os_v13', JSON.stringify(appData)); }
function getKey(d) { return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }

function timeToMins(timeStr) {
    const [time, period] = timeStr.split(' ');
    let [h, m] = time.split(':').map(Number);
    if(period === 'PM' && h !== 12) h += 12;
    if(period === 'AM' && h === 12) h = 0;
    return h * 60 + m;
}

function initApp() {
    setAccentTheme(appData.accentTheme || 'classic');
    
    const quotes = [
        "Discipline equals freedom.",
        "Small disciplines repeated with consistency every day lead to great achievements.",
        "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
        "Don't wait for inspiration. You have to go after it with a club.",
        "Success is the sum of small efforts, repeated day in and day out.",
        "The successful warrior is the average man, with laser-like focus.",
        "First we make our habits, then our habits make us.",
        "What you do every day matters more than what you do once in a while.",
        "The magic you are looking for is in the work you're avoiding.",
        "Win the morning, win the day.",
        "Your future is found in your daily routine."
    ];
    const quoteEl = document.getElementById('hero-quote');
    if (quoteEl) quoteEl.innerText = `"${quotes[Math.floor(Math.random() * quotes.length)]}"`;
    
    document.getElementById('up-name').value = appData.user || '';
    document.getElementById('up-height').value = appData.height || '';
    document.getElementById('up-sw').value = appData.startW || '';
    document.getElementById('up-age').value = appData.age || 25;
    document.getElementById('up-gender').value = appData.gender || 'male';
    document.getElementById('up-activity').value = appData.activity || 1.2;

    viewedDateObj = new Date();
    calDate = new Date();
    
    updateDateDisplay();
    const days = ['sun','mon','tue','wed','thu','fri','sat'];
    setTab(days[viewedDateObj.getDay()]);
    
    updateDashboardInputs();
    updateSettingsUI();
    renderEditor(); 
    rebuildNotificationQueue();
    updateWeeklySummary();
    initScrollTracker();
    
    // Dynamic countdown interval updates every minute
    setInterval(() => {
        updateHero();
    }, 60000);
}

let navBarCompact = false;
function setNavBarCompact(compact) {
    const nav = document.querySelector('.nav-bar');
    if (!nav) return;
    if (compact) {
        nav.classList.add('compact-nav');
        navBarCompact = true;
    } else {
        nav.classList.remove('compact-nav');
        navBarCompact = false;
    }
}

let lastScrollTops = { 'view-dashboard': 0, 'view-analytics': 0, 'view-settings': 0 };
function initScrollTracker() {
    const nav = document.querySelector('.nav-bar');
    if (!nav) return;
    
    nav.addEventListener('click', (e) => {
        if (navBarCompact) {
            e.preventDefault();
            e.stopPropagation();
            setNavBarCompact(false);
        }
    });

    document.querySelectorAll('.slider-page').forEach(page => {
        const id = page.id;
        page.addEventListener('scroll', () => {
            const st = page.scrollTop;
            const lastSt = lastScrollTops[id] || 0;
            
            if (Math.abs(st - lastSt) > 15) {
                if (st > lastSt && st > 80) {
                    setNavBarCompact(true);
                } else {
                    setNavBarCompact(false);
                }
                lastScrollTops[id] = st;
            }
        }, { passive: true });
    });
}

function changeDateToDay(dayName) {
    vibrate(15); // Haptic
    const days = ['sun','mon','tue','wed','thu','fri','sat'];
    const targetIdx = days.indexOf(dayName);
    const currentIdx = viewedDateObj.getDay();
    const offset = targetIdx - currentIdx;
    
    if(offset !== 0) {
        changeDate(offset);
    }
}

function changeDate(offset) {
    vibrate(15); // Haptic
    viewedDateObj.setDate(viewedDateObj.getDate() + offset);
    updateDateDisplay();
    updateDashboardInputs();
    const days = ['sun','mon','tue','wed','thu','fri','sat'];
    setTab(days[viewedDateObj.getDay()]);
}

function updateDateDisplay() {
    const dateKey = getKey(viewedDateObj);
    const mode = appData.dayModes[dateKey] || 'active';
    const icons = { 'active': '🔔', 'light': '🔅', 'silent': '🌙' };
    
    const today = new Date(); today.setHours(0,0,0,0);
    const check = new Date(viewedDateObj); check.setHours(0,0,0,0);
    const diffDays = Math.round((check - today) / (1000 * 60 * 60 * 24));
    
    let dateLabel = viewedDateObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
    let statusLabel = "";
    
    if (diffDays === 0) {
        statusLabel = "Today";
    } else if (diffDays === -1) {
        statusLabel = "Yesterday";
    } else if (diffDays === 1) {
        statusLabel = "Tomorrow";
    } else {
        statusLabel = viewedDateObj.toLocaleDateString('en-GB', { weekday: 'short' });
    }
    
    const fullLabel = `${statusLabel}, ${dateLabel}`;
    
    const display = document.getElementById('date-display');
    document.getElementById('date-text').innerText = fullLabel;
    document.getElementById('date-icon').innerText = icons[mode];
    
    display.style.color = (diffDays === 0) ? "var(--primary)" : "var(--text-1)";
    
    updateDayModeUI();
    updateSleepUI();
}

function setTab(day) {
    if(day) currentTabDay = day;
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(`btn-${currentTabDay}`).classList.add('active');
    
    const list = document.getElementById('task-container');
    list.innerHTML = '';
    const dateKey = getKey(viewedDateObj);
    const mode = appData.dayModes[dateKey] || 'active';

    // Merge weekly templates with date-specific tasks
    const recurringTasks = appData.schedule[currentTabDay] || [];
    const dateSpecificTasks = appData.dateTasks[dateKey] || [];
    
    const combinedTasks = [
        ...recurringTasks.map(t => ({ ...t, isRecurring: true })),
        ...dateSpecificTasks.map(t => ({ ...t, isRecurring: false }))
    ];
    
    combinedTasks.sort((a,b) => timeToMins(a.t) - timeToMins(b.t));

    combinedTasks.forEach((item, i) => {
        const uid = `${dateKey}-${item.id}`;
        const isDone = appData.history[uid] === true;
        
        let muted = false;
        if (mode === 'silent' || !item.reminder) muted = true;
        if (mode === 'light' && !appData.lightDayTypes.includes(item.type)) muted = true;

        let icon = item.type === 'workout' ? '▶' : (item.type === 'meal' ? '📖' : '🔍');
        const query = encodeURIComponent(item.instr + " " + item.act);
        let link = `https://www.google.com/search?q=${query}`;
        if(item.type === 'workout') link = `https://www.youtube.com/results?search_query=${query}`;

        const div = document.createElement('div');
        div.className = `task-card task-${item.type} ${isDone ? 'done' : ''} ${muted ? 'muted' : ''}`;
        div.setAttribute('data-index', i);
        
        // Show trash icon for date-specific tasks
        let actionContent = `<a href="${link}" target="_blank" class="action-btn">${icon}</a>`;
        if (!item.isRecurring) {
            actionContent = `<button onclick="deleteOneOffTask('${item.id}'); event.stopPropagation();" class="action-btn" style="border-color:var(--danger); color:var(--danger); background:transparent;">🗑️</button>`;
        }

        div.innerHTML = `
            <div class="check-circle" onclick="toggleTask('${uid}', this.parentElement)"></div>
            <div class="task-body" onclick="toggleTask('${uid}', this.parentElement)">
                <span class="time-badge">${item.t} ${muted ? '🔕' : ''} ${!item.isRecurring ? '✨ Today' : ''}</span>
                <div style="font-weight:700; margin-bottom:3px; font-size:1.05rem;">${item.act}</div>
                <div style="font-size:0.9rem; color:var(--text-2); margin-bottom:6px;">${item.instr}</div>
                <span style="display:inline-block; background:var(--primary-dim); color:var(--primary); font-size:0.7rem; font-weight:700; padding:4px 10px; border-radius:8px;">${item.rule}</span>
            </div>
            ${actionContent}
        `;
        list.appendChild(div);
    });
    
    if (combinedTasks.length === 0) {
        list.innerHTML = `<div style="text-align:center; padding: 40px 20px; color: var(--text-2); font-style: italic; font-weight: 600; opacity: 0.7;" class="app-fade-in">
            <div style="font-size: 2.5rem; margin-bottom: 12px; filter: grayscale(100%); opacity: 0.5;">✨</div>
            No tasks scheduled for today.<br><span style="font-size:0.85rem; font-weight: 500;">Enjoy your rest, or add a one-off task above.</span>
        </div>`;
    }
    updateHero();
}

function toggleTask(uid, el) {
    const isDone = el.classList.toggle('done');
    appData.history[uid] = isDone;
    saveData();
    
    // Haptic Feedback based on state
    if(isDone) {
        vibrate([30, 50, 30]); // Satisfying success pulse
        if (appData.chimeEnabled !== false) playSuccessChime();
    } else {
        vibrate(30);                 // Short cancel pulse
    }
    
    updateHero();
    calculateStreak();
    rebuildNotificationQueue();
}

function playSuccessChime() {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const now = ctx.currentTime;
        
        // Osc 1: Crystal high chime (C6 note)
        const osc1 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(1046.50, now);
        osc1.frequency.exponentialRampToValueAtTime(1567.98, now + 0.12);
        gain1.gain.setValueAtTime(0.12, now);
        gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        osc1.connect(gain1);
        gain1.connect(ctx.destination);
        
        // Osc 2: Warm fundamental (C5 note)
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(523.25, now);
        gain2.gain.setValueAtTime(0.06, now);
        gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        
        osc1.start(now);
        osc1.stop(now + 0.5);
        osc2.start(now);
        osc2.stop(now + 0.3);
    } catch(e) {
        console.log("AudioContext blocked or unsupported", e);
    }
}

function setDayMode(mode) {
    vibrate(15);
    const key = getKey(viewedDateObj);
    appData.dayModes[key] = mode;
    if (mode === 'active') delete appData.dayReasons[key]; 
    saveData();
    updateDateDisplay();
    setTab(currentTabDay);
    rebuildNotificationQueue();
    updateWeeklySummary();
}

function updateDayModeUI() {
    const key = getKey(viewedDateObj);
    const mode = appData.dayModes[key] || 'active';
    const reason = appData.dayReasons[key];

    document.querySelectorAll('.dm-opt').forEach(el => el.classList.remove('active', 'mode-active', 'mode-light', 'mode-silent'));
    const activeOpt = document.getElementById(`dm-opt-${mode}`);
    activeOpt.classList.add('active');
    if(mode === 'active') activeOpt.classList.add('mode-active');
    if(mode === 'light') activeOpt.classList.add('mode-light');
    if(mode === 'silent') activeOpt.classList.add('mode-silent');

    const reasonContainer = document.getElementById('reason-container');
    reasonContainer.style.opacity = mode === 'active' ? '0.3' : '1';
    reasonContainer.style.pointerEvents = mode === 'active' ? 'none' : 'auto';

    document.querySelectorAll('.reason-chip').forEach(el => {
        el.classList.toggle('active', el.innerText === reason);
    });
}

function setReason(reason) {
    vibrate(15);
    const key = getKey(viewedDateObj);
    if(appData.dayModes[key] === 'active') return;
    appData.dayReasons[key] = reason;
    saveData();
    updateDayModeUI();
}

function applyModeToWeek() {
    vibrate([20, 30, 20]);
    const key = getKey(viewedDateObj);
    const modeToApply = appData.dayModes[key] || 'active';
    const reasonToApply = appData.dayReasons[key];

    let iterDate = new Date(viewedDateObj);
    for(let i=1; i<=6; i++) {
        iterDate.setDate(iterDate.getDate() + 1);
        const iterKey = getKey(iterDate);
        appData.dayModes[iterKey] = modeToApply;
        if(reasonToApply) appData.dayReasons[iterKey] = reasonToApply;
        else delete appData.dayReasons[iterKey];
    }
    saveData();
    showIsland(`Applied ${modeToApply} to next 6 days`);
    updateWeeklySummary();
}

function calculateStreak() {
    let streak = 0;
    let checkTime = new Date().setHours(12, 0, 0, 0); 
    const oneDayMs = 24 * 60 * 60 * 1000;
    
    let bestStreak = localStorage.getItem('meta_best_streak') || 0;
    bestStreak = parseInt(bestStreak);
    let perfectDays = 0;
    
    for (let i = 0; i < 365; i++) {
        const checkDate = new Date(checkTime);
        const k = getKey(checkDate);
        const mode = appData.dayModes[k] || 'active';
        
        if (mode === 'silent') {
            checkTime -= oneDayMs;
            continue; 
        }

        const dayName = ['sun','mon','tue','wed','thu','fri','sat'][checkDate.getDay()];
        const recurringTasks = appData.schedule[dayName] || [];
        const dateSpecificTasks = appData.dateTasks[k] || [];
        const combined = [...recurringTasks, ...dateSpecificTasks];
        
        let done = 0;
        combined.forEach(task => { if(appData.history[`${k}-${task.id}`]) done++; });
        const score = combined.length ? (done / combined.length) * 100 : 0;

        if (score >= 80) { 
            streak++;
            perfectDays++;
            checkTime -= oneDayMs; 
        } else {
            if (k === getKey(new Date()) && score < 80) checkTime -= oneDayMs;
            else break;
        }
    }
    
    if (streak > bestStreak) {
        bestStreak = streak;
        localStorage.setItem('meta_best_streak', bestStreak);
    }
    
    const display = document.getElementById('streak-display');
    document.getElementById('streak-count').innerText = streak;
    display.classList.toggle('streak-active', streak > 0);
    // Trigger check for milestone unlocks
    if (typeof checkMilestoneUnlock === 'function') {
        checkMilestoneUnlock(streak);
    }
    
    return { streak, bestStreak, perfectDays };
}

function toggleBreathing() {
    vibrate(15);
    const ring = document.querySelector('.progress-ring');
    const circle = document.getElementById('prog-circle');
    const text = document.getElementById('prog-text');
    
    isBreathing = !isBreathing;
    
    if (isBreathing) {
        originalOffset = circle.style.strokeDashoffset;
        ring.classList.add('breathe-active');
        text.innerText = "Breathe";
        text.style.fontSize = "0.55rem";
        showIsland("Mindful Minute Started");
    } else {
        ring.classList.remove('breathe-active');
        circle.style.strokeDashoffset = originalOffset;
        text.style.fontSize = "0.75rem";
        updateHero(); 
        showIsland("Focus Resumed");
    }
}

function updateHero() {
    if(isBreathing) return;
    const now = new Date();
    
    const greetingEl = document.getElementById('hero-greeting');
    if (greetingEl) {
        const hour = now.getHours();
        if (hour < 12) greetingEl.innerText = 'Good Morning';
        else if (hour < 17) greetingEl.innerText = 'Good Afternoon';
        else greetingEl.innerText = 'Good Evening';
    }
    
    const viewingNow = getKey(viewedDateObj) === getKey(now);
    const card = document.getElementById('hero-card');
    const statusEl = document.getElementById('hero-status');
    const dot = document.getElementById('hero-status-dot');
    const timeEl = document.getElementById('hero-time');
    const titleEl = document.getElementById('hero-title');
    const descEl = document.getElementById('hero-desc');
    const progCircle = document.getElementById('prog-circle');
    const progText = document.getElementById('prog-text');

    const k = getKey(viewedDateObj);
    
    const recurringTasks = appData.schedule[currentTabDay] || [];
    const dateSpecificTasks = appData.dateTasks[k] || [];
    const combinedTasks = [
        ...recurringTasks.map(t => ({ ...t, isRecurring: true })),
        ...dateSpecificTasks.map(t => ({ ...t, isRecurring: false }))
    ];
    combinedTasks.sort((a,b) => timeToMins(a.t) - timeToMins(b.t));

    let doneCount = 0;
    combinedTasks.forEach(task => { if(appData.history[`${k}-${task.id}`]) doneCount++; });
    const pct = combinedTasks.length > 0 ? Math.round((doneCount / combinedTasks.length) * 100) : 0;
    const offset = 125.6 - (125.6 * pct) / 100;
    progCircle.style.strokeDashoffset = offset;
    progText.innerText = pct + "%";
    
    // NEW: 100% Celebration with Confetti Canvas
    if(pct === 100 && lastPct !== 100) {
        showIsland("🎉 Protocol Complete!");
        vibrate([50, 100, 50, 100, 50]); 
        triggerConfetti();
    }
    lastPct = pct;

    calculateStreak();

    const mode = appData.dayModes[k] || 'active'; 

    // RESET LIVE TASK HIGHLIGHTS
    document.querySelectorAll('.task-card').forEach(t => t.classList.remove('live-task-glow'));

    if(!viewingNow) {
        card.style.background = mode === 'silent' ? 'var(--hero-silent)' : 'var(--hero-grad)';
        dot.style.background = mode === 'silent' ? '#8E8E93' : '#34C759';
        statusEl.innerText = "VIEWING LOG"; timeEl.innerText = "HIST"; titleEl.innerText = "Past/Future"; descEl.innerText = "Reviewing Data"; 
        const cdEl = document.getElementById('hero-countdown');
        if (cdEl) cdEl.style.display = 'none';
        return;
    }

    if(mode === 'silent') {
        card.style.background = 'var(--hero-silent)'; dot.style.background = '#8E8E93'; dot.style.boxShadow = 'none';
        statusEl.innerText = "SILENT DAY"; timeEl.innerText = "REST"; titleEl.innerText = "Reminders Paused"; descEl.innerText = "Tasks are still visible — check them off when ready."; 
        const cdEl = document.getElementById('hero-countdown');
        if (cdEl) cdEl.style.display = 'none';
        return;
    }

    card.style.background = mode === 'light' ? 'var(--hero-warn)' : 'var(--hero-grad)';
    dot.style.background = '#34C759'; dot.style.boxShadow = '0 0 10px #34C759';
    statusEl.innerText = mode === 'light' ? "LIGHT DAY" : "LIVE RITUAL";

    const nowMins = now.getHours() * 60 + now.getMinutes();
    let activeTask = null;
    let activeIdx = -1;
    
    for(let i=0; i<combinedTasks.length; i++) {
        const [timeStr, period] = combinedTasks[i].t.split(' '); let [h, m] = timeStr.split(':');
        h = parseInt(h); m = parseInt(m); if(period === 'PM' && h !== 12) h += 12; if(period === 'AM' && h === 12) h = 0;
        if((h * 60 + m) > nowMins) { activeTask = combinedTasks[i]; activeIdx = i; break; }
    }

    const countdownEl = document.getElementById('hero-countdown');
    if(activeTask) { 
        timeEl.innerText = activeTask.t; 
        titleEl.innerText = activeTask.act; 
        descEl.innerText = activeTask.instr; 
        
        // Calculate time difference
        const targetMins = timeToMins(activeTask.t);
        const diff = targetMins - nowMins;
        if (diff > 0 && countdownEl) {
            countdownEl.style.display = 'inline-block';
            const h = Math.floor(diff / 60);
            const m = diff % 60;
            countdownEl.innerText = h > 0 ? `In ${h}h ${m}m` : `In ${m}m`;
        } else if (countdownEl) {
            countdownEl.style.display = 'none';
        }

        // HIGHLIGHT LIVE TASK
        const targetCard = document.querySelector(`.task-card[data-index="${activeIdx}"]`);
        if(targetCard && !targetCard.classList.contains('done')) {
            targetCard.classList.add('live-task-glow');
        }
    } 
    else { 
        timeEl.innerText = "REST"; 
        titleEl.innerText = "Day Complete"; 
        descEl.innerText = "All rituals done. Sleep well."; 
        if (countdownEl) countdownEl.style.display = 'none';
    }
}

function triggerConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
    
    let particles = [];
    const colors = ['#007AFF', '#34C759', '#FF9500', '#FF3B30', '#5AC8FA', '#8B5CF6'];
    
    for(let i=0; i<120; i++) {
        particles.push({
            x: canvas.width / 2,
            y: canvas.height * 0.8,
            vx: (Math.random() - 0.5) * 15,
            vy: (Math.random() * -15) - 5,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * 6 + 4,
            gravity: 0.35,
            opacity: 1,
            rotation: Math.random() * Math.PI,
            rotationSpeed: (Math.random() - 0.5) * 0.2
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let alive = false;
        particles.forEach(p => {
            if (p.opacity > 0) {
                alive = true;
                p.vy += p.gravity;
                p.x += p.vx;
                p.y += p.vy;
                p.rotation += p.rotationSpeed;
                p.opacity -= 0.015;
                
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rotation);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = Math.max(p.opacity, 0);
                ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size);
                ctx.restore();
            }
        });
        
        if (alive) requestAnimationFrame(animate);
        else ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    animate();
}

function updateDashboardInputs() {
    const k = getKey(viewedDateObj);
    if(!appData.weights[k]) appData.weights[k] = { am: '', pm: '', water: 0 };
    const data = appData.weights[k];
    document.getElementById('w-am').value = data.am || '';
    document.getElementById('w-pm').value = data.pm || '';
    updateWaterUI(data.water);
}

function updateWater(amount) {
    vibrate(20);
    const k = getKey(viewedDateObj); let current = appData.weights[k]?.water || 0;
    current += amount; if(current < 0) current = 0;
    if(!appData.weights[k]) appData.weights[k] = {};
    appData.weights[k].water = current;
    
    if(!appData.weights[k].waterLogs) appData.weights[k].waterLogs = [];
    if(amount > 0) {
        const now = new Date();
        const logTime = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
        appData.weights[k].waterLogs.push({ time: logTime, amount: amount });
    } else if(amount < 0 && appData.weights[k].waterLogs.length > 0) {
        appData.weights[k].waterLogs.pop();
    }
    
    saveData(); updateWaterUI(current); updateAnalytics();
    if(amount > 0) showIsland(`Water Added (+${amount}ml)`);
}

function updateWaterUI(ml) {
    const liters = (ml / 1000).toFixed(1);
    document.getElementById('water-val').innerText = liters + "L";
    const statusEl = document.getElementById('water-status');
    statusEl.innerText = (ml >= 3000) ? "Goal Reached! 💧" : "Target: 3.0 Liters";
    statusEl.style.color = (ml >= 3000) ? "#34C759" : "var(--text-2)";
    
    const pct = Math.min(Math.round((ml / 3000) * 100), 100);
    const liquid = document.getElementById('water-wave-liquid');
    if (liquid) {
        liquid.style.transform = `translateY(${100 - pct}%)`;
    }
    const bubblePct = document.getElementById('water-bubble-pct');
    if (bubblePct) {
        bubblePct.innerText = pct + "%";
        bubblePct.style.color = pct > 50 ? "#fff" : "var(--text-1)";
    }
}

function logWeight(type) {
    const val = document.getElementById(`w-${type}`).value;
    const k = getKey(viewedDateObj);
    if(!appData.weights[k]) appData.weights[k] = {};
    appData.weights[k][type] = val;
    saveData(); 
    updateAnalytics(); 
    if(val) showIsland("Weight Logged");
}

function updateAnalytics() {
    const currentW = parseFloat(appData.weights[getKey(viewedDateObj)]?.am) || parseFloat(appData.startW) || 0;
    const hM = appData.height / 100;
    const bmi = (currentW / (hM * hM)).toFixed(1);
    
    document.getElementById('bmi-num').innerText = isFinite(bmi) && bmi > 0 ? bmi : "--";
    
    let bmiStatus = "CALC";
    let bmiColor = "var(--text-2)";
    let bmiAdvice = "Please log your height and weight to receive personalized biometric feedback.";

    if(bmi > 0 && isFinite(bmi)) {
        let percent = 0;
        if (bmi < 18.5) {
            percent = (bmi / 18.5) * 25;
        } else if (bmi < 25) {
            percent = 25 + ((bmi - 18.5) / 6.5) * 25;
        } else if (bmi < 30) {
            percent = 50 + ((bmi - 25) / 5) * 25;
        } else {
            percent = 75 + Math.min(((bmi - 30) / 10) * 25, 25);
        }
        const ind = document.getElementById('bmi-indicator');
        if(ind) ind.style.left = percent + '%';

        if(bmi < 18.5) {
            bmiStatus = "UNDERWEIGHT";
            bmiColor = "#5AC8FA"; 
            bmiAdvice = "You are currently underweight. Focus on nutrient-dense meals, complex carbs (like Oats or Sweet Potatoes), and steady strength training to build lean muscle mass safely.";
        } else if(bmi >= 18.5 && bmi <= 24.9) {
            bmiStatus = "NORMAL";
            bmiColor = "#34C759"; 
            bmiAdvice = "Great job! You are in an optimal, healthy weight range. Maintain your current protocol of balanced nutrition and consistent cardiovascular activity.";
        } else if(bmi >= 25 && bmi <= 29.9) {
            bmiStatus = "OVERWEIGHT";
            bmiColor = "#FF9500"; 
            bmiAdvice = "You are in the overweight range. Consider adopting a slight caloric deficit and increasing your daily steps (Zone 2 cardio) to sustainably lower body fat while protecting joints.";
        } else {
            bmiStatus = "OBESE";
            bmiColor = "#FF3B30"; 
            bmiAdvice = "Your BMI indicates obesity, which can increase long-term health risks. Prioritize a doctor-approved caloric deficit, highly joint-friendly movement (like walking or cycling), and strict sleep hygiene for recovery.";
        }
    } else {
        const ind = document.getElementById('bmi-indicator');
        if(ind) ind.style.left = '0%';
    }
    
    document.getElementById('bmi-text').innerText = bmiStatus;
    document.getElementById('bmi-text').style.background = bmiColor;
    document.getElementById('bmi-advice').innerText = bmiAdvice;


    // Sleep Consistency Index calculations
    const circadian = calculateCircadianConsistency();
    document.getElementById('sleep-consistency-num').innerText = circadian.score === '--' ? '--' : circadian.score + '%';
    const labelEl = document.getElementById('sleep-consistency-label');
    labelEl.innerText = circadian.label;
    labelEl.style.background = circadian.color;
    document.getElementById('sleep-advice').innerText = circadian.advice;

    // Hydration Efficiency calculations — always use TODAY's water data
    const todayHydroKey = getKey(viewedDateObj);
    const waterLogs = appData.weights[todayHydroKey]?.waterLogs || [];
    const waterTotal = appData.weights[todayHydroKey]?.water || 0;
    const hydro = calculateHydrationEfficiency(waterLogs, waterTotal);
    document.getElementById('hydro-efficiency-num').innerText = hydro.score;
    const hydroLabelEl = document.getElementById('hydro-efficiency-label');
    hydroLabelEl.innerText = hydro.label;
    hydroLabelEl.style.background = hydro.color;
    const hydroAdviceEl = document.getElementById('hydro-advice');
    if (hydroAdviceEl) hydroAdviceEl.innerText = hydro.advice;

    document.getElementById('s-start').innerText = (parseFloat(appData.startW) || 0) + " kg";
    document.getElementById('s-curr').innerText = currentW + " kg";
    const diff = (currentW - (parseFloat(appData.startW) || 0)).toFixed(1);
    document.getElementById('s-diff').innerText = (diff > 0 ? "+" : "") + diff + " kg";

    const chart = document.getElementById('chart-area');
    chart.innerHTML = '';
    const dates = [];
    for(let i=6; i>=0; i--) { 
        const d = new Date(); 
        d.setHours(12, 0, 0, 0);
        d.setDate(d.getDate() - i); 
        dates.push(getKey(d)); 
    }
    let vals = dates.map(d => appData.weights[d]?.am ? parseFloat(appData.weights[d].am) : 0).filter(v => v > 0);
    if(vals.length === 0) vals = [parseFloat(appData.startW) || 0];
    const min = Math.min(...vals) - 1; const max = Math.max(...vals) + 1;
    dates.forEach(d => {
        const w = appData.weights[d]?.am || 0;
        const col = document.createElement('div');
        col.className = 'chart-col';
        
        const parts = d.split('-');
        const dateObj = new Date(parts[0], parts[1]-1, parts[2]);
        const dayLabel = dateObj.toLocaleDateString('en-US', {weekday:'narrow'});
        if(w > 0) {
            const heightPct = ((w - min) / (max - min)) * 80 + 20;
            col.innerHTML = `<div class="chart-bar filled" style="height:${heightPct}%; background: linear-gradient(180deg, var(--primary), var(--primary-dim)); border-radius: 4px 4px 0 0; filter: drop-shadow(0 2px 5px var(--primary-dim));"></div><div class="chart-label">${dayLabel}</div>`;
        } else {
            col.innerHTML = `<div class="chart-bar" style="height:6px; background: var(--border); border-radius: 3px;"></div><div class="chart-label">${dayLabel}</div>`;
        }
        chart.appendChild(col);
    });
}

function renderCalendar() {
    const grid = document.getElementById('cal-days-container');
    if(!grid) return;
    grid.innerHTML = '';
    
    document.getElementById('cal-month-label').innerText = calDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    const year = calDate.getFullYear(); const month = calDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const todayKey = getKey(new Date());
    const today = new Date();

    let perfectDays = 0, partialDays = 0, totalCompleted = 0, totalTasks = 0;

    ['Su','Mo','Tu','We','Th','Fr','Sa'].forEach(d => grid.innerHTML += `<div class="cal-day-name">${d}</div>`);
    for(let i=0; i<firstDay; i++) grid.innerHTML += `<div class="cal-cell cal-empty"></div>`;

    for(let i=1; i<=daysInMonth; i++) {
        const iterDate = new Date(year, month, i);
        const k = getKey(iterDate);
        const dayName = ['sun','mon','tue','wed','thu','fri','sat'][iterDate.getDay()];
        const tasks = appData.schedule[dayName] || [];
        const isPast = iterDate <= today;
        
        let doneCount = 0;
        tasks.forEach(task => { if(appData.history[`${k}-${task.id}`]) doneCount++; });

        if(isPast && tasks.length > 0) {
            totalTasks += tasks.length;
            totalCompleted += doneCount;
        }

        let statusClass = 'cal-level-0';
        if (tasks.length > 0 && doneCount > 0) {
            const pct = doneCount / tasks.length;
            if (pct === 1) { statusClass = 'cal-level-3'; perfectDays++; }
            else if (pct >= 0.5) { statusClass = 'cal-level-2'; partialDays++; }
            else { statusClass = 'cal-level-1'; partialDays++; }
        }
        const isToday = (k === todayKey) ? 'cal-today' : '';

        grid.innerHTML += `<div class="cal-cell ${statusClass} ${isToday}" onclick="showCalDayDetail('${k}', '${dayName}', ${i})" title="${dayName}, ${i}"></div>`;
    }

    // Month stats
    const rate = totalTasks > 0 ? Math.round((totalCompleted / totalTasks) * 100) : 0;
    const elP = document.getElementById('cal-stat-perfect');
    const elPa = document.getElementById('cal-stat-partial');
    const elR = document.getElementById('cal-stat-rate');
    if(elP) elP.innerText = perfectDays;
    if(elPa) elPa.innerText = partialDays;
    if(elR) elR.innerText = rate + '%';

    // Unified Streak Calculation (Syncs with Hero Dashboard)
    const { streak } = calculateStreak();
    const elS = document.getElementById('cal-stat-streak');
    if(elS) elS.innerText = streak;
}

function showCalDayDetail(k, dayName, dayNum) {
    vibrate(10);
    const tasks = appData.schedule[dayName] || [];
    const panel = document.getElementById('cal-detail-panel');
    const titleEl = document.getElementById('cal-detail-title');
    const tasksEl = document.getElementById('cal-detail-tasks');
    if(!panel || !titleEl || !tasksEl) return;

    const dateLabel = calDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    titleEl.innerText = `${dayName.charAt(0).toUpperCase()+dayName.slice(1)}, ${dateLabel.split(' ')[0]} ${dayNum} — ${dateLabel.split(' ')[1]}`;

    if(tasks.length === 0) {
        tasksEl.innerHTML = `<span style="color:var(--text-2);">No rituals scheduled.</span>`;
    } else {
        const waterLogged = appData.weights[k]?.water || 0;
        let html = tasks.map(t => {
            const done = appData.history[`${k}-${t.id}`];
            const icon = done ? '✅' : '⬜';
            const typeEmoji = t.type === 'workout' ? '🏋️' : t.type === 'meal' ? '🍽️' : '⚡';
            return `<div style="display:flex;align-items:flex-start;gap:6px;padding:4px 0;border-bottom:1px solid var(--border);">${icon} ${typeEmoji} <span style="color:var(--text-1);font-weight:700;">${t.t} — ${t.act}</span></div>`;
        }).join('');
        html += `<div style="margin-top:8px;font-size:0.75rem;color:var(--text-2);font-weight:700;">💧 Water: ${(waterLogged/1000).toFixed(1)}L</div>`;
        tasksEl.innerHTML = html;
    }

    panel.style.display = 'block';
    panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
function changeCalMonth(offset) { calDate.setMonth(calDate.getMonth() + offset); renderCalendar(); }

function jumpToDate(dateStr) {
    vibrate(15);
    const parts = dateStr.split('-'); viewedDateObj = new Date(parts[0], parts[1]-1, parts[2]);
    switchView('dashboard'); 
    updateDateDisplay(); 
    updateDashboardInputs(); 
    const days = ['sun','mon','tue','wed','thu','fri','sat'];
    setTab(days[viewedDateObj.getDay()]);
}

function updateWeeklySummary() {
    let counts = { active: 0, light: 0, silent: 0 };
    let d = new Date();
    for(let i=0; i<7; i++) {
        const m = appData.dayModes[getKey(d)] || 'active';
        counts[m]++; d.setDate(d.getDate() - 1);
    }
    document.getElementById('weekly-summary').innerHTML = `<span style="color:var(--primary)">🔔 ${counts.active} Active</span><span style="color:#FF9500">🔅 ${counts.light} Light</span><span style="color:#8E8E93">🌙 ${counts.silent} Silent</span>`;
}

function bulkToggleType(type, state) {
    vibrate(20);
    let changed = 0;
    Object.keys(appData.schedule).forEach(day => {
        appData.schedule[day].forEach(task => { if (task.type === type && task.reminder !== state) { task.reminder = state; changed++; } });
    });
    saveData(); setTab(); rebuildNotificationQueue(); showIsland(`${state ? 'Unmuted' : 'Muted'} ${changed} ${type}s`);
}

function updateLightDayConfig() {
    vibrate(10);
    const types = [];
    if(document.getElementById('ld-workout').checked) types.push('workout');
    if(document.getElementById('ld-meal').checked) types.push('meal');
    if(document.getElementById('ld-hack').checked) types.push('hack');
    appData.lightDayTypes = types;
    saveData(); setTab(); rebuildNotificationQueue();
}

function updateSettingsUI() {
    document.getElementById('ld-workout').checked = appData.lightDayTypes.includes('workout');
    document.getElementById('ld-meal').checked = appData.lightDayTypes.includes('meal');
    document.getElementById('ld-hack').checked = appData.lightDayTypes.includes('hack');

    const notiBtn = document.getElementById('btn-noti-status');
    if (notiBtn) {
        if (Notification.permission === 'granted') {
            notiBtn.innerText = "✅ Notifications Active";
            notiBtn.style.background = "rgba(52, 199, 89, 0.1)";
            notiBtn.style.border = "2px solid var(--success)";
            notiBtn.style.color = "var(--success)";
        } else if (Notification.permission === 'denied') {
            notiBtn.innerText = "❌ Permissions Blocked";
            notiBtn.style.background = "rgba(255, 59, 48, 0.1)";
            notiBtn.style.border = "2px solid var(--danger)";
            notiBtn.style.color = "var(--danger)";
        } else {
            notiBtn.innerText = "🔔 Enable Notifications";
            notiBtn.style.background = "var(--text-1)";
            notiBtn.style.color = "var(--bg)";
            notiBtn.style.border = "none";
        }
    }

    // Sync Sound Toggle State
    if (appData.chimeEnabled === undefined) appData.chimeEnabled = true;
    const chimeOn = document.getElementById('chime-on-btn');
    const chimeOff = document.getElementById('chime-off-btn');
    if (chimeOn && chimeOff) {
        if (appData.chimeEnabled) {
            chimeOn.classList.add('active', 'on');
            chimeOff.classList.remove('active', 'off');
        } else {
            chimeOff.classList.add('active', 'off');
            chimeOn.classList.remove('active', 'on');
        }
    }
}

function toggleChimeSetting(val) {
    vibrate(15);
    appData.chimeEnabled = val;
    saveData();
    updateSettingsUI();
}

function msUntil(timeStr) {
    const [time, period] = timeStr.split(' ');
    let [h, m] = time.split(':').map(Number);
    if(period === 'PM' && h !== 12) h += 12; if(period === 'AM' && h === 12) h = 0;
    const target = new Date(); target.setHours(h, m, 0, 0); return target.getTime() - Date.now();
}

function getListId(activityName) {
    const n = activityName.toLowerCase();
    if(n.includes('breakfast')) return 'list-breakfast';
    if(n.includes('lunch')) return 'list-lunch';
    if(n.includes('dinner')) return 'list-dinner';
    if(n.includes('snack') || n.includes('pre') || n.includes('post')) return 'list-snack';
    if(n.includes('gym') || n.includes('cardio') || n.includes('workout')) return 'list-workout';
    return 'list-general';
}

function updateSuggestionList(index) {
    const actVal = document.getElementById(`ed-${index}-act`).value;
    const instrInput = document.getElementById(`ed-${index}-instr`);
    instrInput.setAttribute('list', getListId(actVal));
}

function renderEditor() {
    const day = document.getElementById('edit-day-select').value;
    const container = document.getElementById('editor-list');
    container.innerHTML = '';
    
    appData.schedule[day].forEach((item, index) => {
        const reminderOn = item.reminder !== false;
        const el = document.createElement('div');
        el.className = 'accordion-item';
        
        const initialListId = getListId(item.act);
        
        el.innerHTML = `
            <div class="accordion-header" onclick="this.parentElement.classList.toggle('open'); vibrate(15);">
                <div><span style="color:var(--primary); margin-right:10px;">${item.t}</span> ${item.act}</div>
                <div>▼</div>
            </div>
            <div class="accordion-body">
                <span class="sm-label">TIME (e.g. 08:00 AM)</span>
                <input class="sm-input" id="ed-${index}-t" value="${item.t}">
                
                <span class="sm-label">ACTIVITY NAME</span>
                <input class="sm-input" id="ed-${index}-act" value="${item.act}" onkeyup="updateSuggestionList(${index})">
                
                <span class="sm-label">INSTRUCTION / MEAL</span>
                <input class="sm-input" id="ed-${index}-instr" value="${item.instr}" list="${initialListId}" placeholder="What to do or eat?">
                
                <span class="sm-label">RULE / MOTIVATION</span>
                <input class="sm-input" id="ed-${index}-rule" value="${item.rule || ''}">
                
                <span class="sm-label">TYPE</span>
                <select class="sm-input" id="ed-${index}-type" style="padding:10px;">
                    <option value="hack" ${item.type === 'hack' ? 'selected' : ''}>Bio-Hack</option>
                    <option value="meal" ${item.type === 'meal' ? 'selected' : ''}>Meal</option>
                    <option value="workout" ${item.type === 'workout' ? 'selected' : ''}>Workout</option>
                </select>
                
                <span class="sm-label">REMINDER</span>
                <div class="mini-switch">
                    <div class="mini-opt ${reminderOn ? 'active on' : ''}" id="ed-${index}-rem-on" onclick="setReminderToggle(${index}, true)">ON</div>
                    <div class="mini-opt ${!reminderOn ? 'active off' : ''}" id="ed-${index}-rem-off" onclick="setReminderToggle(${index}, false)">OFF</div>
                </div>
                <input type="hidden" id="ed-${index}-reminder" value="${reminderOn}">
                
                <button class="btn-danger" style="margin-top: 10px;" onclick="deleteTask(${index})">Delete Task</button>
            </div>
        `;
        container.appendChild(el);
    });
}

function setReminderToggle(index, val) {
    vibrate(15);
    document.getElementById(`ed-${index}-reminder`).value = val;
    const onBtn = document.getElementById(`ed-${index}-rem-on`);
    const offBtn = document.getElementById(`ed-${index}-rem-off`);
    if(val) {
        onBtn.classList.add('active', 'on'); offBtn.classList.remove('active', 'off');
    } else {
        offBtn.classList.add('active', 'off'); onBtn.classList.remove('active', 'on');
    }
}

function addNewTask() {
    vibrate(20);
    const day = document.getElementById('edit-day-select').value;
    appData.schedule[day].push({
        id: 't_' + day + '_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
        t: "12:00 PM",
        act: "New Activity",
        instr: "Details here",
        rule: "Why do this?",
        type: "hack",
        reminder: true
    });
    saveData();
    renderEditor();
    showIsland("New Slot Added at Bottom!");
}

function deleteTask(index) {
    vibrate([30, 30]);
    if(confirm("Permanently delete this task slot?")) {
        const day = document.getElementById('edit-day-select').value;
        appData.schedule[day].splice(index, 1);
        saveData();
        renderEditor();
        showIsland("Task Deleted");
    }
}

function saveSchedule() {
    vibrate(30);
    const day = document.getElementById('edit-day-select').value;
    appData.schedule[day].forEach((_, index) => {
        appData.schedule[day][index].t = document.getElementById(`ed-${index}-t`).value;
        appData.schedule[day][index].act = document.getElementById(`ed-${index}-act`).value;
        appData.schedule[day][index].instr = document.getElementById(`ed-${index}-instr`).value;
        appData.schedule[day][index].rule = document.getElementById(`ed-${index}-rule`).value; 
        appData.schedule[day][index].type = document.getElementById(`ed-${index}-type`).value;
        
        const remVal = document.getElementById(`ed-${index}-reminder`).value;
        appData.schedule[day][index].reminder = (remVal === 'true' || remVal === true);
    });
    
    appData.schedule[day].sort((a,b) => timeToMins(a.t) - timeToMins(b.t));
    
    saveData();
    setTab(currentTabDay);
    renderEditor(); 
    rebuildNotificationQueue(); 
    showIsland("Schedule Saved & Sorted!");
}

// Track which notification UIDs have already been fired this session
const firedNotifications = new Set();

function rebuildNotificationQueue() {
    // Clear old timers
    activeTimers.forEach(t => clearTimeout(t.id));
    activeTimers = [];

    if (Notification.permission !== 'granted') return renderQueuePreview();

    const now = new Date();
    const nowMins = now.getHours() * 60 + now.getMinutes();
    const key = getKey(now);
    const dayName = ['sun','mon','tue','wed','thu','fri','sat'][now.getDay()];
    const mode = appData.dayModes[key] || 'active';

    if (mode === 'silent') return renderQueuePreview();

    const tasks = [...(appData.schedule[dayName] || [])];
    // Include one-off tasks
    (appData.oneOffTasks?.[key] || []).forEach(t => tasks.push(t));

    tasks.forEach((task) => {
        const uid = `${key}-${task.id}`;
        
        // Skip already completed tasks
        if (appData.history[uid] === true) return;
        // Skip if reminder is off
        if (!task.reminder) return;
        // Skip if light day and task type not included
        if (mode === 'light' && !appData.lightDayTypes.includes(task.type)) return;
        // Skip if already fired this session
        if (firedNotifications.has(uid)) return;

        const taskMins = timeToMins(task.t);
        const alertMins = taskMins - 30; // alert 30 minutes before

        // Only schedule if alert time is still in the future (strictly > nowMins)
        if (alertMins > nowMins) {
            const exactTimeMs = msUntil(task.t);
            const notifyTimeMs = exactTimeMs - (30 * 60 * 1000);

            if (notifyTimeMs > 0) {
                const id = setTimeout(() => fireNotification(task, uid), notifyTimeMs);
                activeTimers.push({ id, task, time: task.t });
            }
        }
        // If task starts within the next 30 mins and alert hasn't fired yet — fire once immediately
        else if (alertMins <= nowMins && taskMins > nowMins && !firedNotifications.has(uid)) {
            firedNotifications.add(uid);
            setTimeout(() => fireNotification(task, uid), 500);
        }
    });

    activeTimers.sort((a,b) => timeToMins(a.time) - timeToMins(b.time));
    renderQueuePreview();
}

function renderQueuePreview() {
    const box = document.getElementById('upcoming-queue');
    box.innerHTML = '';
    if (activeTimers.length === 0) {
        box.innerHTML = `<div class="queue-item" style="color: var(--text-2); justify-content: center;">No reminders left for today.</div>`; return;
    }
    activeTimers.slice(0, 3).forEach(t => {
        box.innerHTML += `<div class="queue-item"><span>${t.task.act} (Alerts 30m early)</span> <span style="color:#007AFF">${t.time}</span></div>`;
    });
}

function getMotivationalAlert(task) {
    const act = (task.act || '').toLowerCase();
    const food = task.instr || '';
    const rule = task.rule || '';
    const type = task.type || '';
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const todayDay = days[new Date().getDay()];
    const hour = new Date().getHours();
    const timeGreet = hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening';

    let title, body;

    if (act.includes('wake') || act.includes('alarm')) {
        title = `🌅 Rise up, it's ${todayDay}!`;
        const opts = [
            `Your body just spent 8 hours repairing. Now move it. Start with: ${food}.`,
            `Morning cortisol peak = maximum fat burn. Get up and seize it! ${food} awaits.`,
            `Every champion wakes before their excuses do. Your ${todayDay} starts NOW.`
        ];
        body = opts[Math.floor(Math.random() * opts.length)];

    } else if (act.includes('sleep') || act.includes('bed') || act.includes('lights')) {
        title = `🌙 ${todayDay} Wind-Down`;
        const opts = [
            `Growth hormone releases when you sleep — don't skip recovery. Lights out: ${food}.`,
            `Your ${todayDay} was earned. Now let your muscles repair. Sleep tight.`,
            `Tomorrow's performance is built tonight. Follow: ${food}. Sleep is the real gain.`
        ];
        body = opts[Math.floor(Math.random() * opts.length)];

    } else if (type === 'meal' || act.includes('breakfast') || act.includes('lunch') || act.includes('dinner') || act.includes('snack') || act.includes('meal')) {
        title = `🍽️ ${todayDay}'s Fuel Block`;
        const opts = [
            `Your kitchen > Zomato 🔥 Chef you is plating "${food}" right now. No delivery fee. No junk oils. Pure gains.`,
            `"${food}" loading in 30 mins. Rated ⭐⭐⭐⭐⭐ by your metabolism. Swiggy can't touch this.`,
            `Skip the delivery app today. "${food}" is the real high-performance meal for this ${timeGreet}. Fuel up! 🥗`
        ];
        body = opts[Math.floor(Math.random() * opts.length)];

    } else if (type === 'workout' || act.includes('gym') || act.includes('cardio') || act.includes('run') || act.includes('walk') || act.includes('yoga')) {
        title = `💪 ${todayDay} Sweat Block`;
        const opts = [
            `"${food}" — the only ${todayDay} rep that counts. No shortcuts. No excuses. Just results.`,
            `Your future self is watching you right now. Will you show up for "${food}"? 30 mins. Go.`,
            `Dopamine, serotonin, endorphins — all unlocked by "${food}". Your ${todayDay} reward starts after this.`
        ];
        body = opts[Math.floor(Math.random() * opts.length)];

    } else if (act.includes('water') || act.includes('lemon') || act.includes('acv') || act.includes('hydrat')) {
        title = `💧 Hydration Check`;
        const opts = [
            `Your cells are 70% water. Don't let them shrivel on a ${todayDay}. Drink: ${food}.`,
            `Dehydrated brain = foggy thinking. 30 second fix: "${food}". Do it now.`,
            `Optimal blood flow, clear skin, fast metabolism — all from sipping "${food}" consistently.`
        ];
        body = opts[Math.floor(Math.random() * opts.length)];

    } else {
        title = `⚡ Ritual Unlocked`;
        const opts = [
            `"${task.act}" in 30 mins. Small daily wins compound into massive life results. Ready?`,
            `This ${todayDay} ${timeGreet} block matters: "${task.act} — ${food}". Show up.`,
            `Discipline is choosing your future self over your present comfort. Time: ${task.t}. Task: ${task.act}.`
        ];
        body = opts[Math.floor(Math.random() * opts.length)];
    }

    return { title, body };
}

function getNextUpcomingTask() {
    const now = new Date();
    const nowMins = now.getHours() * 60 + now.getMinutes();
    const dayName = ['sun','mon','tue','wed','thu','fri','sat'][now.getDay()];
    const todayKey = getKey(now);
    const tasks = [...(appData.schedule[dayName] || [])];
    // Also include one-off tasks for today
    (appData.oneOffTasks?.[todayKey] || []).forEach(t => tasks.push(t));
    tasks.sort((a,b) => timeToMins(a.t) - timeToMins(b.t));
    
    for (const task of tasks) {
        const tMins = timeToMins(task.t);
        if (tMins > nowMins) return task;
    }
    return null; // all done for today
}

function fireNotification(task, uid) {
    // Guard: never fire the same notification twice in one session
    if (firedNotifications.has(uid)) return;
    if (appData.history[uid] === true) return;
    
    firedNotifications.add(uid);
    const alertData = getMotivationalAlert(task);
    
    if (navigator.serviceWorker && navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
            type: 'SHOW_NOTIFICATION',
            title: alertData.title,
            body: alertData.body,
            tag: uid,
            icon: './icon.png'
        });
    } else if (Notification.permission === 'granted') {
        new Notification(alertData.title, { 
            body: alertData.body, 
            tag: uid, 
            icon: './icon.png',
            requireInteraction: true 
        });
    }
    showIsland("🔥 " + task.act + " in 30 min");
    vibrate([50, 100, 50]);
    // Remove from active timers (cleanup only — no re-schedule)
    activeTimers = activeTimers.filter(t => t.task.id !== task.id);
    renderQueuePreview();
}

function requestNotificationPermission() {
    vibrate(15);
    if (!('Notification' in window)) {
        showIsland("Notifications not supported in this browser");
        return;
    }
    Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
            showIsland("✅ Alerts Enabled!");
            rebuildNotificationQueue();
        } else {
            showIsland("Permission denied");
        }
        updateSettingsUI();
    });
}

function testNotification() {
    vibrate(30);
    const doTest = () => {
        showIsland("Firing test alert in 5s...");
        scheduleTestAlert();
    };
    if (Notification.permission !== 'granted') {
        Notification.requestPermission().then(p => {
            if (p === 'granted') doTest();
            else showIsland("Permission denied");
        });
    } else {
        doTest();
    }
}

function scheduleTestAlert() {
    setTimeout(() => {
        // Use next upcoming REAL task for the test, otherwise use a motivational fallback
        const nextTask = getNextUpcomingTask();
        let alertData;
        if (nextTask) {
            alertData = getMotivationalAlert(nextTask);
            alertData.title = "🔔 Preview: " + alertData.title;
        } else {
            alertData = {
                title: "🏆 You crushed today!",
                body: "All rituals complete. Rest, recover, and come back stronger tomorrow. You're building a real streak."
            };
        }
        if (navigator.serviceWorker && navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage({
                type: 'SHOW_NOTIFICATION',
                title: alertData.title,
                body: alertData.body,
                tag: 'test-alert',
                icon: './icon.png'
            });
        } else {
            new Notification(alertData.title, { body: alertData.body, icon: './icon.png' });
        }
        vibrate([50, 100, 50]);
    }, 5000);
}

let islandTimeout = null;
function showIsland(msg) {
    const di = document.getElementById('dynamic-island');
    document.getElementById('di-msg').innerText = msg;
    di.classList.add('active');
    if (islandTimeout) clearTimeout(islandTimeout);
    islandTimeout = setTimeout(() => {
        di.classList.remove('active');
        islandTimeout = null;
    }, 3000);
}

function switchView(view) {
    vibrate(10);
    if (typeof setNavBarCompact === 'function') setNavBarCompact(false);
    const inner = document.getElementById('view-slider-inner');
    if (view === 'dashboard') {
        inner.style.transform = 'translateX(0%)';
    } else if (view === 'analytics') {
        inner.style.transform = 'translateX(-33.3333%)';
        updateAnalytics(); 
        renderCalendar();
    } else if (view === 'settings') {
        inner.style.transform = 'translateX(-66.6666%)';
        renderEditor();
    }
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById(`nav-${view.substring(0,3)}`).classList.add('active');
}

function nextOnboardingStep(stepNum) {
    vibrate(15);
    if (stepNum === 2) {
        const name = document.getElementById('ob-name').value.trim();
        const age = document.getElementById('ob-age').value;
        if (!name || !age) {
            showIsland("Please enter your name and age");
            return;
        }
    } else if (stepNum === 3) {
        const w = document.getElementById('ob-weight').value;
        let h = 0;
        if (!document.getElementById('ob-input-cm').classList.contains('hidden')) {
            h = document.getElementById('ob-h-cm').value;
        } else {
            const ft = document.getElementById('ob-h-ft').value;
            const inch = document.getElementById('ob-h-in').value;
            if (ft) h = 1; // dummy validation
        }
        if (!w || !h) {
            showIsland("Please specify height and weight");
            return;
        }
    }
    
    // Hide all steps
    document.querySelectorAll('.ob-step').forEach(step => step.style.display = 'none');
    // Show target step
    document.getElementById(`ob-step-${stepNum}`).style.display = 'flex';
    
    // Update dots
    document.querySelectorAll('.ob-dot').forEach((dot, index) => {
        if (index + 1 === stepNum) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function setObHeightMode(mode) {
    vibrate(10);
    document.querySelectorAll('#onboarding .unit-opt').forEach(e => e.classList.remove('active'));
    document.getElementById(`ob-u-${mode}`).classList.add('active');
    if (mode === 'cm') {
        document.getElementById('ob-input-cm').classList.remove('hidden');
        document.getElementById('ob-input-ft').classList.add('hidden');
    } else {
        document.getElementById('ob-input-cm').classList.add('hidden');
        document.getElementById('ob-input-ft').classList.remove('hidden');
    }
}

function completeOnboarding() {
    vibrate(30);
    const name = document.getElementById('ob-name').value; 
    const w = parseFloat(document.getElementById('ob-weight').value); 
    const age = parseInt(document.getElementById('ob-age').value) || 25;
    const gender = document.getElementById('ob-gender').value;
    const activity = parseFloat(document.getElementById('ob-activity').value) || 1.2;
    let h = 0;
    if(!document.getElementById('ob-input-cm').classList.contains('hidden')) {
        h = parseFloat(document.getElementById('ob-h-cm').value);
    } else {
        const ft = parseFloat(document.getElementById('ob-h-ft').value) || 0;
        const in_ = parseFloat(document.getElementById('ob-h-in').value) || 0;
        h = (ft * 30.48) + (in_ * 2.54);
    }
    
    if(!name || !w || !h) return showIsland("Please fill all fields");
    
    appData.user = name; 
    appData.height = h; 
    appData.startW = w;
    appData.age = age;
    appData.gender = gender;
    appData.activity = activity;
    appData.schedule = JSON.parse(JSON.stringify(defaultSchedule));
    appData.history = {}; 
    appData.dayModes = {}; 
    appData.dayReasons = {}; 
    appData.lightDayTypes = ['workout'];
    appData.sleepLogs = {};
    appData.dateTasks = {};
    appData.accentTheme = 'classic';
    
    const todayKey = getKey(new Date());
    appData.weights = {};
    appData.weights[todayKey] = { am: w, pm: '', water: 0, waterLogs: [] };
    
    saveData(); location.reload();
}

function toggleTDEEExplanation() {
    vibrate(10);
    const panel = document.getElementById('tdee-explanation');
    if (panel.style.maxHeight === '0px' || !panel.style.maxHeight) {
        panel.style.maxHeight = '300px';
    } else {
        panel.style.maxHeight = '0px';
    }
}

function updateProfile() {
    vibrate(20);
    appData.user = document.getElementById('up-name').value || appData.user;
    appData.height = parseFloat(document.getElementById('up-height').value) || appData.height;
    appData.startW = parseFloat(document.getElementById('up-sw').value) || appData.startW;
    appData.age = parseInt(document.getElementById('up-age').value) || appData.age;
    appData.gender = document.getElementById('up-gender').value || appData.gender;
    appData.activity = parseFloat(document.getElementById('up-activity').value) || appData.activity;
    
    saveData(); showIsland("Profile Saved");
    updateAnalytics();
}

// --- NEW CIRCADIAN & DYNAMIC ONE-OFF TASK HELPERS ---
function calculateCircadianConsistency() {
    if(!appData.sleepLogs) return { score: '--', label: 'N/A', color: 'var(--text-2)', advice: 'Log sleep times to analyze consistency.' };
    
    const bedtimes = [];
    const d = new Date();
    for(let i=0; i<7; i++) {
        const k = getKey(d);
        const log = appData.sleepLogs[k];
        if(log && log.bedtime) {
            const [h, m] = log.bedtime.split(':').map(Number);
            const minsFromNoon = ((h + 12) % 24) * 60 + m;
            bedtimes.push(minsFromNoon);
        }
        d.setDate(d.getDate() - 1);
    }
    
    if (bedtimes.length < 3) {
        return {
            score: '--',
            label: 'CALC',
            color: 'var(--text-2)',
            advice: 'Log sleep details for at least 3 days in the Reports tab to calculate sleep consistency.'
        };
    }
    
    const mean = bedtimes.reduce((a,b) => a+b, 0) / bedtimes.length;
    const variance = bedtimes.reduce((a,b) => a + Math.pow(b - mean, 2), 0) / bedtimes.length;
    const stdDevMins = Math.sqrt(variance);
    
    let score = 100 - (stdDevMins / 2);
    score = Math.max(Math.round(score), 0);
    
    let label = 'IRREGULAR';
    let color = '#FF3B30';
    let advice = 'Your sleep schedule has high variance. Shift bedtime to within 30 minutes of your target to avoid circadian desynchronization.';
    
    if (stdDevMins <= 30) {
        label = 'EXCELLENT';
        color = '#34C759';
        advice = 'Superb circadian alignment! Your bedtime varies by less than 30 minutes. This promotes high-quality REM recovery.';
    } else if (stdDevMins <= 60) {
        label = 'GOOD';
        color = 'var(--primary)';
        advice = 'Solid consistency. Bedtime variance is under 1 hour. Fine-tune your wind-down routine to stabilize it further.';
    } else if (stdDevMins <= 90) {
        label = 'MODERATE';
        color = '#FF9500';
        advice = 'Moderate schedule variation. Try keeping screens away 1 hour before sleep to lock in a consistent bedtime.';
    }
    
    return { score, label, color, advice };
}

function calculateHydrationEfficiency(waterLogs, waterTotal) {
    const total = waterTotal || 0;
    if(!waterLogs || waterLogs.length === 0) {
        return { 
            score: '0%', 
            label: 'NO INTAKE', 
            color: 'var(--text-2)',
            advice: 'Log water to begin tracking cellular absorption efficiency. Aim for 3L spread across the day.' 
        };
    }
    
    // 1. Group logs within 15 minutes of each other into "sessions"
    const logsWithMins = waterLogs.map(log => {
        const [h, m] = log.time.split(':').map(Number);
        return { mins: h * 60 + m, amount: log.amount || 250 };
    }).sort((a,b) => a.mins - b.mins);
    
    const sessions = [];
    logsWithMins.forEach(log => {
        if (sessions.length === 0) {
            sessions.push({ mins: log.mins, amount: log.amount });
        } else {
            const last = sessions[sessions.length - 1];
            if (log.mins - last.mins <= 15) {
                last.amount += log.amount;
            } else {
                sessions.push({ mins: log.mins, amount: log.amount });
            }
        }
    });
    
    if(sessions.length === 1) {
        const singleVol = sessions[0].amount;
        let score = Math.min(Math.round((total / 3000) * 100), 100);
        
        let advice = `Good start! You've logged ${(total/1000).toFixed(1)}L. Spread your next drinks 1–2 hours apart for maximum cellular uptake.`;
        let label = 'STARTED';
        let color = '#5AC8FA';
        
        if (singleVol > 1000) {
            score = Math.max(score - 15, 0);
            label = 'CHUGGED';
            color = '#FF9500';
            advice = `Logged ${(total/1000).toFixed(1)}L at once. Your kidneys can only absorb ~1L per hour. Next time, space it out!`;
        } else if (total >= 3000) {
            label = 'OPTIMAL';
            color = '#34C759';
        }
        
        return { score: score + '%', label, color, advice };
    }
    
    let score = 100;
    let deductions = 0;
    
    for(let i=1; i<sessions.length; i++) {
        const gap = sessions[i].mins - sessions[i-1].mins;
        if(gap < 45) { 
            deductions += 5; 
        } else if(gap > 240) { 
            deductions += 10; 
        }
    }
    
    sessions.forEach(s => {
        if (s.amount > 1000) {
            deductions += 15;
        }
    });
    
    if(total >= 3000) {
        score += 10;
    } else if(total < 1500) {
        deductions += 20;
    } else if(total < 2500) {
        deductions += 10;
    }
    
    score = Math.max(Math.min(score - deductions, 100), 0);
    
    let label = 'OPTIMAL';
    let color = '#34C759';
    let advice = `Excellent! ${(total/1000).toFixed(1)}L logged with great spacing. Your cells are well hydrated.`;
    
    if (score < 50) {
        label = 'INEFFICIENT';
        color = '#FF3B30';
        advice = `Cellular absorption is low. Try spacing drinks (250ml every 1.5–2 hours) instead of large intervals.`;
    } else if (score < 80) {
        label = 'MODERATE';
        color = 'var(--primary)';
        advice = `Good spacing, but total volume is ${(total/1000).toFixed(1)}L. Add a few more spaced cups to hit 3L.`;
    }
    
    return { score: score + '%', label, color, advice };
}

function openSleepSheet() {
    const dateKey = getKey(viewedDateObj);
    const data = appData.sleepLogs[dateKey] || { bedtime: '', waketime: '' };
    document.getElementById('sleep-in-bedtime').value = data.bedtime;
    document.getElementById('sleep-in-waketime').value = data.waketime;
    
    document.getElementById('sheet-backdrop').classList.add('active');
    document.getElementById('sleep-sheet').classList.add('active');
}

function openOneOffSheet() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'});
    document.getElementById('oneoff-time').value = timeStr;
    document.getElementById('oneoff-act').value = '';
    document.getElementById('oneoff-instr').value = '';
    document.getElementById('oneoff-rule').value = '';
    
    document.getElementById('sheet-backdrop').classList.add('active');
    document.getElementById('oneoff-sheet').classList.add('active');
}

function closeAllSheets() {
    document.getElementById('sheet-backdrop').classList.remove('active');
    document.getElementById('sleep-sheet').classList.remove('active');
    document.getElementById('oneoff-sheet').classList.remove('active');
    dismissMilestoneModal();
}

function checkMilestoneUnlock(streak) {
    if (!appData.milestonesSeen) appData.milestonesSeen = {};
    const milestones = [
        { days: 3, emoji: '🔥', title: '3-Day Ignition', desc: 'Protocol ignited! You have maintained consistency for 3 days. The momentum has officially started.' },
        { days: 7, emoji: '🛡️', title: '7-Day Foundation', desc: 'One perfect week! You have built a solid foundation. Keep this shield active to protect your habits.' },
        { days: 21, emoji: '🧠', title: '21-Day Habit Lock', desc: 'Neurological Lock-in! 21 days is the scientific threshold for automatic behaviors. The protocol is becoming part of you.' },
        { days: 30, emoji: '👑', title: '30-Day Master', desc: 'Protocol Sovereign! You have mastered 30 full days of extreme discipline. You are now in complete control of your routine.' }
    ];
    
    for (let m of milestones) {
        if (streak >= m.days && !appData.milestonesSeen[m.days]) {
            appData.milestonesSeen[m.days] = true;
            saveData();
            setTimeout(() => {
                showMilestoneModal(m);
            }, 500);
            break;
        }
    }
}

function showMilestoneModal(m) {
    vibrate([50, 100, 50, 100, 50]);
    
    document.getElementById('ms-modal-emoji').innerText = m.emoji;
    document.getElementById('ms-modal-title').innerText = m.title;
    document.getElementById('ms-modal-subtitle').innerText = `${m.days}-Day consistency target achieved!`;
    document.getElementById('ms-modal-desc').innerText = m.desc;
    
    document.getElementById('milestone-backdrop').classList.add('active');
    document.getElementById('milestone-modal').classList.add('active');
    
    if (appData.chimeEnabled !== false) playTriumphChime();
}

function dismissMilestoneModal() {
    const backdrop = document.getElementById('milestone-backdrop');
    const modal = document.getElementById('milestone-modal');
    if (backdrop.classList.contains('active')) {
        vibrate(15);
        backdrop.classList.remove('active');
        modal.classList.remove('active');
        triggerConfetti();
    }
}

function playTriumphChime() {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const now = ctx.currentTime;
        
        const notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, idx) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now + idx * 0.08);
            
            gain.gain.setValueAtTime(0.08, now + idx * 0.08);
            gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.45);
            
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now + idx * 0.08);
            osc.stop(now + idx * 0.08 + 0.45);
        });
    } catch(e) {
        console.log(e);
    }
}

function saveSleepLog() {
    const dateKey = getKey(viewedDateObj);
    const bedtime = document.getElementById('sleep-in-bedtime').value;
    const waketime = document.getElementById('sleep-in-waketime').value;
    
    if(!appData.sleepLogs) appData.sleepLogs = {};
    appData.sleepLogs[dateKey] = { bedtime, waketime };
    saveData();
    closeAllSheets();
    updateSleepUI();
    updateAnalytics();
    showIsland("Sleep Logged");
}

function saveOneOffTask() {
    const dateKey = getKey(viewedDateObj);
    const timeVal = document.getElementById('oneoff-time').value;
    const actVal = document.getElementById('oneoff-act').value;
    const instrVal = document.getElementById('oneoff-instr').value;
    const ruleVal = document.getElementById('oneoff-rule').value;
    const typeVal = document.getElementById('oneoff-type').value;
    
    if(!actVal || !timeVal) return showIsland("Enter Name & Time");
    
    const task = {
        id: 'oneoff_' + Date.now(),
        t: timeVal,
        act: actVal,
        instr: instrVal,
        rule: ruleVal,
        type: typeVal,
        reminder: true
    };
    
    if(!appData.dateTasks) appData.dateTasks = {};
    if(!appData.dateTasks[dateKey]) appData.dateTasks[dateKey] = [];
    appData.dateTasks[dateKey].push(task);
    
    saveData();
    closeAllSheets();
    setTab(currentTabDay);
    rebuildNotificationQueue();
    showIsland("Today's Task Added");
}

function deleteOneOffTask(id) {
    vibrate([30, 30]);
    const dateKey = getKey(viewedDateObj);
    if (appData.dateTasks[dateKey]) {
        appData.dateTasks[dateKey] = appData.dateTasks[dateKey].filter(t => t.id !== id);
        saveData();
        setTab(currentTabDay);
        rebuildNotificationQueue();
        showIsland("Task Deleted");
    }
}

const themeAccents = {
    classic: { primary: '#007AFF', dim: 'rgba(0, 122, 255, 0.15)' },
    violet: { primary: '#8B5CF6', dim: 'rgba(139, 92, 246, 0.15)' },
    cyan: { primary: '#06B6D4', dim: 'rgba(6, 182, 212, 0.15)' },
    emerald: { primary: '#10B981', dim: 'rgba(16, 185, 129, 0.15)' }
};

function setAccentTheme(themeName) {
    vibrate(15);
    const theme = themeAccents[themeName] || themeAccents.classic;
    document.documentElement.style.setProperty('--primary', theme.primary);
    document.documentElement.style.setProperty('--primary-dim', theme.dim);
    appData.accentTheme = themeName;
    saveData();
    showIsland(`Accent set to ${themeName}`);
}

function updateSleepUI() {
    const dateKey = getKey(viewedDateObj);
    const log = appData.sleepLogs[dateKey];
    
    const bedtimeEl = document.getElementById('sleep-bedtime');
    const waketimeEl = document.getElementById('sleep-waketime');
    const durationEl = document.getElementById('sleep-duration');
    
    if (log && log.bedtime && log.waketime) {
        bedtimeEl.innerText = formatTime12h(log.bedtime);
        waketimeEl.innerText = formatTime12h(log.waketime);
        const durationHrs = calculateSleepDuration(log.bedtime, log.waketime);
        durationEl.innerText = durationHrs.toFixed(1) + " hrs";
    } else {
        bedtimeEl.innerText = "--";
        waketimeEl.innerText = "--";
        durationEl.innerText = "--";
    }
}

function formatTime12h(time24) {
    if (!time24) return '--';
    const [h, m] = time24.split(':').map(Number);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const displayH = h % 12 || 12;
    return `${String(displayH).padStart(2, '0')}:${String(m).padStart(2, '0')} ${ampm}`;
}

function calculateSleepDuration(bedtime, waketime) {
    const [bH, bM] = bedtime.split(':').map(Number);
    const [wH, wM] = waketime.split(':').map(Number);
    
    let bedDate = new Date(2000, 0, 1, bH, bM);
    let wakeDate = new Date(2000, 0, 1, wH, wM);
    
    if (wakeDate < bedDate) {
        wakeDate.setDate(wakeDate.getDate() + 1);
    }
    return (wakeDate - bedDate) / (1000 * 60 * 60);
}

function exportData() {
    vibrate(20);
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(appData));
    const dlAnchorElem = document.createElement('a'); dlAnchorElem.setAttribute("href", dataStr); dlAnchorElem.setAttribute("download", `Protocol_Backup_${getKey(new Date())}.json`);
    document.body.appendChild(dlAnchorElem); dlAnchorElem.click(); dlAnchorElem.remove();
}

function importData(input) {
    vibrate(20);
    const file = input.files[0]; if(!file) return; const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const json = JSON.parse(e.target.result); if(!json.user) throw new Error();
            if(confirm("Overwrite current protocol data?")) { appData = json; saveData(); location.reload(); }
        } catch(err) { showIsland("Invalid Backup File"); }
    }; reader.readAsText(file);
}

function resetCheckboxes() {
    vibrate([30, 30]);
    if(confirm("Reset all checkboxes for this week?")) {
        Object.keys(appData.history).forEach(k => appData.history[k] = false);
        saveData(); setTab(); rebuildNotificationQueue(); showIsland("Reset Done");
    }
}
function hardReset() { 
    vibrate([50, 50, 50]);
    if(confirm("Factory Reset? This deletes ALL data permanently.")) { localStorage.clear(); location.reload(); } 
}

function toggleTheme() {
    vibrate(15);
    const current = document.documentElement.getAttribute('data-theme'); const target = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', target); localStorage.setItem('meta_theme_v13', target);
}
function initTheme() {
    const saved = localStorage.getItem('meta_theme_v13');
    if(saved) document.documentElement.setAttribute('data-theme', saved);
    else if(window.matchMedia('(prefers-color-scheme: dark)').matches) document.documentElement.setAttribute('data-theme', 'dark');
}
