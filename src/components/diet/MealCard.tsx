import React, { useState } from 'react';
import { CuratedMeal } from '../../types';

interface MealCardProps {
  slotTitle: string;
  meal: CuratedMeal;
  onOpenSwapModal: () => void;
}

export const MealCard: React.FC<MealCardProps> = ({ slotTitle, meal, onOpenSwapModal }) => {
  const [showRecipe, setShowRecipe] = useState(false);

  // Google AI Overview / Gemini Deep-Dive query
  const googleAiUrl = `https://www.google.com/search?q=${encodeURIComponent(
    `healthy authentic Indian vegetarian recipe with exact step by step cooking instructions, health benefits and detailed nutrition breakdown for ${meal.name}`
  )}`;

  return (
    <div
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border-glass)',
        borderRadius: '22px',
        padding: '16px 18px',
        marginBottom: '12px',
        boxShadow: 'var(--shadow)',
        position: 'relative'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
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

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-1)' }}>
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

      <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-1)', marginBottom: '4px' }}>
        {meal.name}
      </div>

      <div style={{ fontSize: '0.82rem', color: 'var(--text-2)', marginBottom: '10px', lineHeight: 1.35 }}>
        {meal.ingredients.map((i) => `${i.name} (${i.quantity})`).join(', ')}
      </div>

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
            👨‍🍳 Step-by-Step Preparation:
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

      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
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
          onClick={onOpenSwapModal}
          style={{
            background: 'var(--primary-dim)',
            border: 'none',
            color: 'var(--primary)',
            padding: '6px 12px',
            borderRadius: '10px',
            fontSize: '0.75rem',
            fontWeight: 800,
            cursor: 'pointer'
          }}
        >
          🔄 Swap
        </button>
      </div>
    </div>
  );
};
