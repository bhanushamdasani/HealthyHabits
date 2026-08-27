import React from 'react';
import { CuratedMeal, DayName } from '../../types';
import { getMealAlternatives } from '../../services/dietPlannerEngine';

interface MealAlternativeModalProps {
  currentMeal: CuratedMeal;
  day: DayName;
  slot: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  snackIdx?: number;
  onSelectAlternative: (replacement: CuratedMeal) => void;
  onClose: () => void;
}

export const MealAlternativeModal: React.FC<MealAlternativeModalProps> = ({
  currentMeal,
  onSelectAlternative,
  onClose
}) => {
  const alternatives = getMealAlternatives(currentMeal);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(8px)',
        zIndex: 3500,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center'
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '480px',
          background: 'var(--surface-solid)',
          borderTopLeftRadius: '28px',
          borderTopRightRadius: '28px',
          padding: '24px 20px 35px',
          maxHeight: '85dvh',
          overflowY: 'auto',
          boxShadow: '0 -10px 40px rgba(0,0,0,0.3)',
          borderTop: '1px solid var(--border-glass)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sheet-drag-handle" style={{ marginBottom: '15px' }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800 }}>Swap Meal</h3>
          <button
            onClick={onClose}
            style={{
              background: 'var(--border)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              cursor: 'pointer',
              fontWeight: 800
            }}
          >
            ✕
          </button>
        </div>

        <p style={{ fontSize: '0.85rem', color: 'var(--text-2)', marginBottom: '16px' }}>
          Current: <strong>{currentMeal.name}</strong> (~{currentMeal.estimatedNutrition.calories} kcal, {currentMeal.estimatedNutrition.proteinGrams}g P)
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {alternatives.map((alt) => (
            <div
              key={alt.id}
              onClick={() => onSelectAlternative(alt)}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border-glass)',
                borderRadius: '16px',
                padding: '14px 16px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                <div style={{ fontWeight: 700, fontSize: '0.98rem', color: 'var(--text-1)' }}>
                  {alt.name}
                </div>
                <span
                  style={{
                    background: 'var(--primary-dim)',
                    color: 'var(--primary)',
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    padding: '3px 8px',
                    borderRadius: '8px'
                  }}
                >
                  {alt.estimatedNutrition.calories} kcal
                </span>
              </div>

              <div style={{ display: 'flex', gap: '12px', fontSize: '0.78rem', color: 'var(--text-2)', marginBottom: '6px' }}>
                <span>🍗 <strong>{alt.estimatedNutrition.proteinGrams}g</strong> Protein</span>
                <span>🌾 <strong>{alt.estimatedNutrition.carbsGrams}g</strong> Carbs</span>
                <span>🥑 <strong>{alt.estimatedNutrition.fatGrams}g</strong> Fat</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-2)', lineHeight: 1.3, flex: 1 }}>
                  {alt.ingredients.map((i) => `${i.name} (${i.quantity})`).join(' • ')}
                </div>

                <a
                  href={`https://www.google.com/search?q=${encodeURIComponent(`healthy authentic Indian vegetarian recipe with exact step by step cooking instructions, health benefits and detailed nutrition breakdown for ${alt.name}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    background: 'rgba(66, 133, 244, 0.12)',
                    border: '1px solid rgba(66, 133, 244, 0.25)',
                    color: '#4285F4',
                    padding: '4px 8px',
                    borderRadius: '8px',
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    textDecoration: 'none',
                    marginLeft: '8px',
                    flexShrink: 0
                  }}
                >
                  ✨ AI Deep-Dive ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
