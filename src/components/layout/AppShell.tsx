import React, { useState } from 'react';
import { usePlanner } from '../../context/PlannerContext';
import { Header } from './Header';
import { BottomNavigation } from './BottomNavigation';
import { ConfettiCanvas } from '../ui/ConfettiCanvas';
import { HeroCard } from '../dashboard/HeroCard';
import { DateNavigator } from '../dashboard/DateNavigator';
import { BentoMetricsGrid } from '../dashboard/BentoMetricsGrid';
import { DayTaskList } from '../dashboard/DayTaskList';
import { DietPlanView } from '../diet/DietPlanView';
import { WorkoutPlanView } from '../workout/WorkoutPlanView';
import { AnalyticsView } from '../analytics/AnalyticsView';
import { SettingsView } from '../settings/SettingsView';
import { SleepLogSheet } from '../modals/SleepLogSheet';
import { OneOffTaskSheet } from '../modals/OneOffTaskSheet';
import { BreathingModal } from '../modals/BreathingModal';
import { MilestoneModal } from '../modals/MilestoneModal';
import { TaskSupportSheet } from '../taskSupport/TaskSupportSheet';
import { GroceryListModal } from '../diet/GroceryListModal';
import { OnboardingWizard } from '../onboarding/OnboardingWizard';
import { ScheduleTask } from '../../types';

export const AppShell: React.FC = () => {
  const { loading, currentView, islandMessage, confettiTrigger } = usePlanner();

  const [isSleepSheetOpen, setIsSleepSheetOpen] = useState(false);
  const [isOneOffSheetOpen, setIsOneOffSheetOpen] = useState(false);
  const [isBreathingModalOpen, setIsBreathingModalOpen] = useState(false);
  const [isGroceryModalOpen, setIsGroceryModalOpen] = useState(false);
  const [activeTaskSupport, setActiveTaskSupport] = useState<ScheduleTask | null>(null);
  const [showOnboarding, setShowOnboarding] = useState<boolean>(() => {
    return typeof window !== 'undefined' && !localStorage.getItem('metabolic_os_v13');
  });

  if (loading) {
    return (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'var(--app-bg)',
          color: 'var(--text-1)'
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>🧬</div>
          <div className="brand-gradient" style={{ fontWeight: 800 }}>
            Initializing Protocol...
          </div>
        </div>
      </div>
    );
  }

  // Calculate sliding translateX transform
  const getTransform = () => {
    switch (currentView) {
      case 'dashboard':
        return 'translateX(0%)';
      case 'diet':
        return 'translateX(-20%)';
      case 'workout':
        return 'translateX(-40%)';
      case 'analytics':
        return 'translateX(-60%)';
      case 'settings':
        return 'translateX(-80%)';
      default:
        return 'translateX(0%)';
    }
  };

  return (
    <>
      {/* Ambient Backdrop Glow Circles */}
      <div className="ambient-glow" id="ambient-glow-1" />
      <div className="ambient-glow" id="ambient-glow-2" />
      <div className="ambient-glow" id="ambient-glow-3" />

      <div className="app-container">
        {/* Dynamic Island Alert Bar (Only shown when active toast/notification is triggered) */}
        {islandMessage && (
          <div
            id="dynamic-island"
            className="active fade-in"
            style={{
              position: 'absolute',
              top: '12px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 3500,
              background: 'rgba(0, 0, 0, 0.92)',
              color: '#ffffff',
              padding: '8px 18px',
              borderRadius: '24px',
              fontSize: '0.8rem',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.25)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(25px)',
              WebkitBackdropFilter: 'blur(25px)',
              pointerEvents: 'none',
              animation: 'slideDown 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            <span className="di-icon">🔔</span>
            <span id="di-msg">{islandMessage}</span>
          </div>
        )}

        {/* Onboarding Wizard (for fresh installs) */}
        {showOnboarding && <OnboardingWizard onComplete={() => setShowOnboarding(false)} />}

        {/* Header */}
        <Header />

        {/* 5-View Slider Container */}
        <div className="view-slider-outer">
          <div
            className="view-slider-inner"
            style={{
              width: '500%',
              transform: getTransform(),
              transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {/* 1. Dashboard View (Bento Grid Modular Layout) */}
            <main className="slider-page" style={{ width: '20%' }}>
              <DateNavigator />
              <HeroCard />
              <BentoMetricsGrid
                onOpenSleepSheet={() => setIsSleepSheetOpen(true)}
                onOpenBreathingModal={() => setIsBreathingModalOpen(true)}
                onOpenOneOffSheet={() => setIsOneOffSheetOpen(true)}
              />
              <DayTaskList
                onOpenOneOffSheet={() => setIsOneOffSheetOpen(true)}
                onOpenTaskSupport={(task) => setActiveTaskSupport(task)}
              />
            </main>

            {/* 2. 15-Day Diet Protocol View */}
            <main className="slider-page" style={{ width: '20%' }}>
              <DietPlanView onOpenGroceryModal={() => setIsGroceryModalOpen(true)} />
            </main>

            {/* 3. Workout Routine View */}
            <main className="slider-page" style={{ width: '20%' }}>
              <WorkoutPlanView />
            </main>

            {/* 4. Analytics & Insights View */}
            <main className="slider-page" style={{ width: '20%' }}>
              <AnalyticsView />
            </main>

            {/* 5. Settings View */}
            <main className="slider-page" style={{ width: '20%' }}>
              <SettingsView />
            </main>
          </div>
        </div>

        {/* Bottom Navigation */}
        <BottomNavigation />

        {/* Celebration Canvas */}
        <ConfettiCanvas trigger={confettiTrigger} />

        {/* Modals and Bottom Sheets */}
        <SleepLogSheet isOpen={isSleepSheetOpen} onClose={() => setIsSleepSheetOpen(false)} />
        <OneOffTaskSheet isOpen={isOneOffSheetOpen} onClose={() => setIsOneOffSheetOpen(false)} />
        <BreathingModal isOpen={isBreathingModalOpen} onClose={() => setIsBreathingModalOpen(false)} />
        <GroceryListModal isOpen={isGroceryModalOpen} onClose={() => setIsGroceryModalOpen(false)} />
        <MilestoneModal />
        <TaskSupportSheet task={activeTaskSupport} onClose={() => setActiveTaskSupport(null)} />
      </div>
    </>
  );
};
