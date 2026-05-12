import { useState } from 'react';

const DAY_ICONS = ['🌱', '🥩', '🦴', '🌿', '🐟', '🥕', '🍗'];

export default function MealPlanView({ mealPlan, pet, onViewCard, onReset }) {
  const [activeDay, setActiveDay] = useState(0);

  if (!mealPlan || !mealPlan.days) return null;

  const day = mealPlan.days[activeDay];

  return (
    <div className="w-full min-h-screen bg-[#f7f3ee] flex flex-col">
      {/* Header */}
      <div className="bg-[#2d4a3e] px-6 pt-12 pb-6">
        <button
          onClick={onReset}
          className="text-[#a8c4b8] text-sm flex items-center gap-1 mb-4 hover:text-white transition-colors"
        >
          ← Back
        </button>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#e8c547] rounded-full flex items-center justify-center text-xl shadow-md">
            🐾
          </div>
          <div>
            <h1 className="text-white text-xl font-bold">{mealPlan.petName}'s Plan</h1>
            <p className="text-[#a8c4b8] text-xs">7-Day Furchild Meal Plan</p>
          </div>
        </div>

        {/* Summary */}
        {mealPlan.summary && (
          <div className="mt-4 bg-[#234038] rounded-xl px-4 py-3">
            <p className="text-[#c8dfd8] text-xs leading-relaxed">{mealPlan.summary}</p>
          </div>
        )}
      </div>

      {/* Day Tabs */}
      <div className="px-5 -mt-3">
        <div className="bg-white rounded-2xl shadow-sm border border-[#e8e0d5] overflow-hidden">
          <div className="flex overflow-x-auto scrollbar-hide border-b border-[#f0ebe4] px-2 pt-2 gap-1">
            {mealPlan.days.map((d, i) => (
              <button
                key={i}
                onClick={() => setActiveDay(i)}
                className={`flex-shrink-0 flex flex-col items-center px-3 py-2 rounded-t-xl text-xs font-semibold transition-all min-w-[52px] ${
                  activeDay === i
                    ? 'bg-[#2d4a3e] text-white'
                    : 'text-[#8a7e72] hover:bg-[#f7f3ee]'
                }`}
              >
                <span className="text-base">{DAY_ICONS[i]}</span>
                <span className="mt-0.5">{d.day.slice(0, 3)}</span>
              </button>
            ))}
          </div>

          {/* Day Detail */}
          <div className="px-5 py-5 space-y-4">
            {/* Morning */}
            <MealBlock
              time="Morning"
              emoji="🌅"
              meal={day.morning?.meal}
              portion={day.morning?.portion}
              color="amber"
            />

            {/* Evening */}
            <MealBlock
              time="Evening"
              emoji="🌙"
              meal={day.evening?.meal}
              portion={day.evening?.portion}
              color="green"
            />

            {/* Treats */}
            {day.treats && (
              <div className="bg-[#fdf6e3] rounded-xl px-4 py-3 border border-[#f0e4b8]">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-base">🦴</span>
                  <span className="text-xs font-semibold text-[#8a6a1f] uppercase tracking-wider">Treats & Chews</span>
                </div>
                <p className="text-[#5c4a1e] text-sm">{day.treats}</p>
              </div>
            )}

            {/* Why this meal */}
            {day.whyThisMeal && (
              <div className="bg-[#f0f7f4] rounded-xl px-4 py-3 border border-[#c8dfd8]">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-base">💡</span>
                  <span className="text-xs font-semibold text-[#2d4a3e] uppercase tracking-wider">Why this meal?</span>
                </div>
                <p className="text-[#3d5a50] text-sm leading-relaxed">{day.whyThisMeal}</p>
              </div>
            )}
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={onViewCard}
          className="w-full mt-4 py-4 bg-[#e8c547] text-[#2d2419] rounded-xl font-bold text-sm shadow-md hover:bg-[#d4b33a] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <span>✨</span> View Health Card
        </button>

        <p className="text-center text-[#b0a496] text-xs mt-4 mb-8">
          Powered by Furchild · Premium Raw Pet Food · Dubai UAE
        </p>
      </div>
    </div>
  );
}

function MealBlock({ time, emoji, meal, portion, color }) {
  const colors = {
    amber: {
      bg: 'bg-[#fff8ec]',
      border: 'border-[#f0d898]',
      label: 'text-[#8a6a1f]',
      text: 'text-[#5c4a1e]',
      portion: 'bg-[#e8c547] text-[#2d2419]',
    },
    green: {
      bg: 'bg-[#f0f7f4]',
      border: 'border-[#c8dfd8]',
      label: 'text-[#2d4a3e]',
      text: 'text-[#3d5a50]',
      portion: 'bg-[#2d4a3e] text-white',
    },
  }[color];

  return (
    <div className={`${colors.bg} rounded-xl px-4 py-3 border ${colors.border}`}>
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <span className="text-base">{emoji}</span>
          <span className={`text-xs font-semibold ${colors.label} uppercase tracking-wider`}>{time}</span>
        </div>
        {portion && (
          <span className={`${colors.portion} text-xs font-semibold px-2.5 py-1 rounded-full`}>
            {portion}
          </span>
        )}
      </div>
      <p className={`${colors.text} text-sm font-medium`}>{meal}</p>
    </div>
  );
}
