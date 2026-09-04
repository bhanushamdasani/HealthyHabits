import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ScheduleTask } from '../../types';
import { CURATED_MEAL_DATABASE } from '../../data/mealCatalog';
import { CURATED_WORKOUT_DATABASE } from '../../data/workoutCatalog';

interface TaskSupportSheetProps {
  task: ScheduleTask | null;
  onClose: () => void;
}

export const TaskSupportSheet: React.FC<TaskSupportSheetProps> = ({ task, onClose }) => {
  useEffect(() => {
    if (task) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [task, onClose]);

  if (!task) return null;

  // 1. Try to find matching meal
  const matchingMeal = CURATED_MEAL_DATABASE.find(
    (m) =>
      task.instr.toLowerCase().includes(m.name.toLowerCase()) ||
      m.name.toLowerCase().includes(task.instr.toLowerCase()) ||
      task.act.toLowerCase().includes(m.mealType)
  );

  // 2. Try to find matching workout
  const allExercises = Object.values(CURATED_WORKOUT_DATABASE).flatMap((w) => w.exercises);
  const matchingExercise = allExercises.find(
    (ex) =>
      task.instr.toLowerCase().includes(ex.name.toLowerCase()) ||
      ex.name.toLowerCase().includes(task.instr.toLowerCase()) ||
      task.act.toLowerCase().includes(ex.targetMuscle.toLowerCase())
  );

  const query = encodeURIComponent(`${task.instr} ${task.act}`);
  const youtubeUrl = `https://www.youtube.com/results?search_query=${query}`;
  const googleUrl = `https://www.google.com/search?q=${query}`;

  return createPortal(
    <>
      <div className="sheet-backdrop active" onClick={onClose} style={{ zIndex: 3200 }} />
      <div
        className="bottom-sheet active"
        style={{
          zIndex: 3300,
          maxHeight: '85dvh',
          overflowY: 'auto',
          paddingBottom: '30px'
        }}
      >
        <div className="sheet-drag-handle" />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 800,
                color: 'var(--primary)',
                textTransform: 'uppercase',
                background: 'var(--primary-dim)',
                padding: '3px 8px',
                borderRadius: '6px'
              }}
            >
              Task Support Guidance
            </span>
            <h3 style={{ margin: '4px 0 0 0', fontWeight: 900, fontSize: '1.2rem' }}>{task.act}</h3>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'var(--border)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            ✕
          </button>
        </div>

        <div style={{ fontSize: '0.9rem', color: 'var(--text-2)', marginTop: '2px' }}>
          Scheduled at: <strong>{task.t}</strong> • {task.rule || 'Daily Ritual'}
        </div>

        {/* Meal Recipe & Nutrition Support */}
        {task.type === 'meal' && matchingMeal && (
          <div className="glass-card" style={{ padding: '16px', marginTop: '10px' }}>
            <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-1)', marginBottom: '6px' }}>
              🍲 {matchingMeal.name}
            </div>

            <div style={{ display: 'flex', gap: '10px', fontSize: '0.8rem', color: 'var(--text-2)', marginBottom: '10px' }}>
              <span>🔥 <strong>{matchingMeal.estimatedNutrition.calories}</strong> kcal</span>
              <span>🍗 <strong>{matchingMeal.estimatedNutrition.proteinGrams}g</strong> Protein</span>
              <span>🌾 <strong>{matchingMeal.estimatedNutrition.carbsGrams}g</strong> Carbs</span>
            </div>

            <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--primary)', marginBottom: '4px' }}>
              Ingredients:
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-2)', marginBottom: '12px', lineHeight: 1.4 }}>
              {matchingMeal.ingredients.map((i) => `${i.name} (${i.quantity})`).join(' • ')}
            </div>

            <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--primary)', marginBottom: '4px' }}>
              Preparation Instructions:
            </div>
            <ol style={{ paddingLeft: '18px', margin: '0 0 10px 0', fontSize: '0.82rem', color: 'var(--text-1)', lineHeight: 1.4 }}>
              {matchingMeal.recipeInstructions.map((step, idx) => (
                <li key={idx} style={{ marginBottom: '4px' }}>
                  {step}
                </li>
              ))}
            </ol>

            <div style={{ fontWeight: 700, fontSize: '0.82rem', color: '#34C759', marginBottom: '2px' }}>
              ✨ Metabolic Benefits:
            </div>
            <ul style={{ paddingLeft: '18px', margin: '0 0 12px 0', fontSize: '0.8rem', color: 'var(--text-2)', lineHeight: 1.35 }}>
              {matchingMeal.wellnessBenefits.map((b, idx) => (
                <li key={idx}>{b}</li>
              ))}
            </ul>

            <a
              href={`https://www.google.com/search?q=${encodeURIComponent(`healthy authentic Indian vegetarian recipe with exact step by step cooking instructions, health benefits and detailed nutrition breakdown for ${matchingMeal.name}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                background: 'linear-gradient(135deg, #4285F4 0%, #9B72CB 50%, #D96570 100%)',
                color: '#ffffff',
                padding: '9px 14px',
                borderRadius: '14px',
                textDecoration: 'none',
                fontWeight: 800,
                fontSize: '0.78rem',
                boxShadow: '0 4px 14px rgba(66, 133, 244, 0.28)'
              }}
            >
              <span>✨</span>
              <span>Google AI Recipe Deep-Dive & Cooking Guide ↗</span>
            </a>
          </div>
        )}

        {/* Workout Technique Support */}
        {task.type === 'workout' && matchingExercise && (
          <div className="glass-card" style={{ padding: '16px', marginTop: '10px' }}>
            <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-1)', marginBottom: '4px' }}>
              🏋️ {matchingExercise.name}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 700, marginBottom: '10px' }}>
              Target: {matchingExercise.targetMuscle} • {matchingExercise.sets} Sets × {matchingExercise.reps}
            </div>

            <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--primary)', marginBottom: '4px' }}>
              Execution Technique:
            </div>
            <ol style={{ paddingLeft: '18px', margin: '0 0 10px 0', fontSize: '0.82rem', color: 'var(--text-1)', lineHeight: 1.4 }}>
              {matchingExercise.instructions.map((step, idx) => (
                <li key={idx} style={{ marginBottom: '4px' }}>
                  {step}
                </li>
              ))}
            </ol>

            <div style={{ fontWeight: 700, fontSize: '0.82rem', color: '#34C759', marginBottom: '2px' }}>
              💡 Pro Tips:
            </div>
            <ul style={{ paddingLeft: '18px', margin: '0 0 10px 0', fontSize: '0.8rem', color: 'var(--text-2)' }}>
              {matchingExercise.techniqueTips.map((t, idx) => (
                <li key={idx}>{t}</li>
              ))}
            </ul>

            {matchingExercise.easierAlternative && (
              <div style={{ fontSize: '0.78rem', color: 'var(--text-2)' }}>
                🟢 <strong>Easier Alternative:</strong> {matchingExercise.easierAlternative}
              </div>
            )}
          </div>
        )}

        {/* Bio-Hack / General Guidance */}
        {task.type === 'hack' && (
          <div className="glass-card" style={{ padding: '16px', marginTop: '10px' }}>
            <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-1)', marginBottom: '6px' }}>
              🧬 Ritual Protocol: {task.instr}
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-2)', lineHeight: 1.45, margin: 0 }}>
              Small daily metabolic micro-habits compound into massive long-term energy and focus gains. Keep screens away during focus and recovery blocks.
            </p>
          </div>
        )}

        {/* External Video / Search Action Buttons */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
          <a
            href={youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            style={{ flex: 1, textDecoration: 'none' }}
          >
            ▶ Watch Video Demonstration
          </a>
          <a
            href={googleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            style={{ flex: 1, textDecoration: 'none' }}
          >
            🔍 Search Details
          </a>
        </div>
      </div>
    </>,
    document.body
  );
};
