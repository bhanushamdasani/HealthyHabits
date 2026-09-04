import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CuratedMeal } from '../../types';
import { getMealAlternatives } from '../../services/dietPlannerEngine';
import { haptics } from '../../utils/haptics';

interface MealAlternativeModalProps {
  currentMeal: CuratedMeal;
  day?: string;
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

  // Lock background scroll and listen for Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [onClose]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        animation: 'fadeIn 0.2s ease-out'
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '520px',
          background: 'var(--surface-solid)',
          borderTopLeftRadius: '28px',
          borderTopRightRadius: '28px',
          padding: '20px 20px calc(28px + env(safe-area-inset-bottom, 14px))',
          maxHeight: '82vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 -16px 50px rgba(0, 0, 0, 0.4)',
          borderTop: '1px solid var(--border-glass)',
          animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag Indicator */}
        <div className="sheet-drag-handle" style={{ width: '40px', height: '4px', margin: '0 auto 12px' }} />

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
          <div>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Purpose-Preserving Alternative
            </span>
            <h3 style={{ margin: '2px 0 0 0', fontSize: '1.2rem', fontWeight: 900, color: 'var(--text-1)' }}>
              Swap Meal Option
            </h3>
          </div>

          <button
            onClick={() => {
              haptics.tap();
              onClose();
            }}
            aria-label="Close"
            style={{
              background: 'var(--surface-2)',
              border: '1px solid var(--border-glass)',
              borderRadius: '50%',
              width: '34px',
              height: '34px',
              cursor: 'pointer',
              fontWeight: 800,
              color: 'var(--text-1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.9rem'
            }}
          >
            ✕
          </button>
        </div>

        {/* Current Selection Info */}
        <div
          style={{
            background: 'var(--surface-2)',
            border: '1px solid var(--border-glass)',
            borderRadius: '14px',
            padding: '10px 14px',
            margin: '8px 0 14px',
            fontSize: '0.8rem',
            color: 'var(--text-2)'
          }}
        >
          <span>Currently Scheduled: </span>
          <strong style={{ color: 'var(--text-1)' }}>{currentMeal?.name}</strong>
          <span> (~{currentMeal?.estimatedNutrition?.calories} kcal • {currentMeal?.estimatedNutrition?.proteinGrams}g Protein)</span>
        </div>

        {/* Alternatives Scrollable List */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch',
            paddingRight: '2px',
            flex: 1
          }}
        >
          {alternatives.map((alt) => (
            <div
              key={alt.id}
              onClick={() => {
                haptics.success();
                onSelectAlternative(alt);
              }}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border-glass)',
                borderRadius: '18px',
                padding: '14px 16px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: 'var(--shadow-sm)'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--primary)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-glass)')}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                <div style={{ fontWeight: 800, fontSize: '0.98rem', color: 'var(--text-1)' }}>
                  {alt.name}
                </div>
                <span
                  style={{
                    background: 'var(--primary-dim)',
                    color: 'var(--primary)',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    padding: '3px 8px',
                    borderRadius: '8px',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {alt.estimatedNutrition.calories} kcal
                </span>
              </div>

              {/* Macro breakdown */}
              <div style={{ display: 'flex', gap: '10px', fontSize: '0.75rem', color: 'var(--text-2)', fontWeight: 700, marginBottom: '6px' }}>
                <span>🍗 <strong style={{ color: '#34C759' }}>{alt.estimatedNutrition.proteinGrams}g</strong> Protein</span>
                <span>🌾 <strong>{alt.estimatedNutrition.carbsGrams}g</strong> Carbs</span>
                <span>🥑 <strong>{alt.estimatedNutrition.fatGrams}g</strong> Fat</span>
              </div>

              {/* Ingredients & AI Link */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px', gap: '8px' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-2)', lineHeight: 1.35, flex: 1 }}>
                  {alt.ingredients.map((i) => `${i.name} (${i.quantity})`).join(' • ')}
                </div>

                <button
                  style={{
                    background: 'var(--primary)',
                    color: '#ffffff',
                    border: 'none',
                    padding: '6px 14px',
                    borderRadius: '10px',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    flexShrink: 0
                  }}
                >
                  ✓ Select
                </button>
              </div>
            </div>
          ))}

          {alternatives.length === 0 && (
            <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-2)', fontSize: '0.85rem' }}>
              No alternative meals found matching current diet filters.
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

