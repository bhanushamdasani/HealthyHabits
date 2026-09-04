import React, { useState } from 'react';
import { CuratedMeal } from '../../types';
import { haptics } from '../../utils/haptics';

interface MealCardProps {
  slotTitle: string;
  scheduledTime?: string;
  meal: CuratedMeal;
  isCompleted?: boolean;
  onToggleCompleted?: () => void;
  windowStatus?: {
    isCurrent: boolean;
    isPast: boolean;
    isUpcoming: boolean;
    badgeText: string;
  };
  onOpenSwapModal: () => void;
}

export const MealCard: React.FC<MealCardProps> = ({
  slotTitle,
  scheduledTime,
  meal,
  isCompleted = false,
  onToggleCompleted,
  windowStatus,
  onOpenSwapModal
}) => {
  const [showRecipe, setShowRecipe] = useState(false);

  // Google AI Overview / Gemini Deep-Dive query
  const googleAiUrl = `https://www.google.com/search?q=${encodeURIComponent(
    `healthy authentic Indian vegetarian recipe with exact step by step cooking instructions, health benefits and detailed nutrition breakdown for ${meal.name}`
  )}`;

  return (
    <div
      style={{
        background: 'var(--surface)',
        border: windowStatus?.isCurrent
          ? '1.5px solid var(--primary)'
          : isCompleted
          ? '1px solid rgba(52, 199, 89, 0.4)'
          : '1px solid var(--border-glass)',
        borderRadius: '18px',
        padding: '12px 15px',
        marginBottom: '10px',
        boxShadow: windowStatus?.isCurrent ? '0 6px 18px var(--primary-dim)' : 'var(--shadow-sm)',
        position: 'relative',
        transition: 'all 0.2s ease'
      }}
    >
      {/* Top Header: Slot Title + Time + Window Badge + Calories */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '6px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              fontSize: '0.72rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              color: 'var(--primary)',
              background: 'var(--primary-dim)',
              padding: '3px 8px',
              borderRadius: '6px'
            }}
          >
            {slotTitle}
          </span>

          {scheduledTime && (
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 800,
                color: 'var(--text-2)',
                background: 'var(--surface-2)',
                padding: '3px 8px',
                borderRadius: '6px'
              }}
            >
              ⏰ {scheduledTime}
            </span>
          )}

          {windowStatus?.badgeText && (
            <span
              style={{
                fontSize: '0.68rem',
                fontWeight: 800,
                background: windowStatus.isCurrent ? 'var(--primary)' : 'var(--surface-2)',
                color: windowStatus.isCurrent ? '#ffffff' : 'var(--text-2)',
                padding: '2px 7px',
                borderRadius: '6px'
              }}
            >
              {windowStatus.badgeText}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-1)' }}>
            {meal.estimatedNutrition.calories} kcal
          </span>
          <span
            style={{
              fontSize: '0.7rem',
              fontWeight: 800,
              background: 'rgba(52, 199, 89, 0.15)',
              color: '#34C759',
              padding: '2px 6px',
              borderRadius: '6px'
            }}
          >
            {meal.estimatedNutrition.proteinGrams}g P
          </span>
        </div>
      </div>

      {/* Meal Title & Done Checkbox */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px', marginBottom: '6px' }}>
        <div style={{ fontWeight: 800, fontSize: '1.08rem', color: isCompleted ? 'var(--text-2)' : 'var(--text-1)', textDecoration: isCompleted ? 'line-through' : 'none' }}>
          {meal.name}
        </div>

        {onToggleCompleted && (
          <button
            onClick={() => {
              haptics.medium();
              onToggleCompleted();
            }}
            style={{
              background: isCompleted ? '#34C759' : 'var(--surface-2)',
              border: isCompleted ? 'none' : '1px solid var(--border-glass)',
              color: isCompleted ? '#ffffff' : 'var(--text-2)',
              borderRadius: '10px',
              padding: '4px 10px',
              fontSize: '0.72rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              flexShrink: 0
            }}
          >
            {isCompleted ? '✓ Eaten' : 'Log Meal'}
          </button>
        )}
      </div>

      {/* Macro Pills Bar */}
      <div style={{ display: 'flex', gap: '10px', fontSize: '0.72rem', color: 'var(--text-2)', fontWeight: 700, marginBottom: '8px' }}>
        <span>🍗 {meal.estimatedNutrition.proteinGrams}g Protein</span>
        <span>🌾 {meal.estimatedNutrition.carbsGrams}g Carbs</span>
        <span>🥑 {meal.estimatedNutrition.fatGrams}g Fat</span>
        {meal.estimatedNutrition.fiberGrams ? <span>🥗 {meal.estimatedNutrition.fiberGrams}g Fiber</span> : null}
      </div>

      {/* Ingredients List */}
      <div style={{ fontSize: '0.82rem', color: 'var(--text-2)', marginBottom: '12px', lineHeight: 1.4 }}>
        {meal.ingredients.map((i) => `${i.name} (${i.quantity})`).join(', ')}
      </div>

      {/* Recipe Drawer */}
      {showRecipe && (
        <div
          className="fade-in"
          style={{
            background: 'var(--border)',
            borderRadius: '16px',
            padding: '14px',
            fontSize: '0.8rem',
            color: 'var(--text-1)',
            marginBottom: '12px',
            lineHeight: 1.45
          }}
        >
          <div style={{ fontWeight: 800, marginBottom: '6px', color: 'var(--primary)' }}>
            👨‍🍳 Step-by-Step Preparation (~{meal.preparationTimeMins || 15} mins):
          </div>
          <ol style={{ paddingLeft: '18px', margin: '0 0 10px 0' }}>
            {meal.recipeInstructions.map((step, idx) => (
              <li key={idx} style={{ marginBottom: '4px' }}>
                {step}
              </li>
            ))}
          </ol>

          {/* Direct Google AI Mode Link */}
          <a
            href={googleAiUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              background: 'linear-gradient(135deg, #4285F4 0%, #9B72CB 50%, #D96570 100%)',
              color: '#ffffff',
              padding: '8px 12px',
              borderRadius: '12px',
              textDecoration: 'none',
              fontWeight: 800,
              fontSize: '0.75rem',
              boxShadow: '0 4px 12px rgba(66, 133, 244, 0.25)',
              marginTop: '8px'
            }}
          >
            <span>✨</span>
            <span>Google AI Recipe Deep-Dive & Pro Tips ↗</span>
          </a>
        </div>
      )}

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', alignItems: 'center' }}>
        <button
          onClick={() => setShowRecipe((prev) => !prev)}
          style={{
            background: 'transparent',
            border: '1px solid var(--border-glass)',
            color: 'var(--text-2)',
            padding: '6px 12px',
            borderRadius: '10px',
            fontSize: '0.75rem',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          {showRecipe ? 'Hide Recipe' : '📖 Recipe'}
        </button>

        <a
          href={googleAiUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: 'rgba(66, 133, 244, 0.12)',
            border: '1px solid rgba(66, 133, 244, 0.3)',
            color: '#4285F4',
            padding: '6px 10px',
            borderRadius: '10px',
            fontSize: '0.75rem',
            fontWeight: 800,
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <span>✨</span>
          <span>Google AI</span>
        </a>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            haptics.tap();
            onOpenSwapModal();
          }}
          style={{
            background: 'var(--primary-dim)',
            border: '1px solid rgba(0, 113, 227, 0.2)',
            color: 'var(--primary)',
            padding: '7px 14px',
            borderRadius: '10px',
            fontSize: '0.78rem',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <span>🔄</span>
          <span>Swap</span>
        </button>
      </div>
    </div>
  );
};

