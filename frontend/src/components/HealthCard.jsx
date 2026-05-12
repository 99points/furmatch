import { useRef } from 'react';

const ACTIVITY_EMOJI = {
  Low: '🛋️',
  Moderate: '🚶',
  High: '🏃',
  'Very High': '⚡',
};

export default function HealthCard({ mealPlan, pet, onBack }) {
  const cardRef = useRef(null);

  const topMeals = mealPlan?.days?.slice(0, 3).map((d) => d.morning?.meal).filter(Boolean) || [];

  return (
    <div className="w-full min-h-screen bg-[#f7f3ee] flex flex-col">
      {/* Back nav */}
      <div className="bg-[#2d4a3e] px-6 pt-12 pb-5">
        <button
          onClick={onBack}
          className="text-[#a8c4b8] text-sm flex items-center gap-1 mb-4 hover:text-white transition-colors"
        >
          ← Meal Plan
        </button>
        <h1 className="text-white text-xl font-bold">Health Card</h1>
        <p className="text-[#a8c4b8] text-xs mt-0.5">Share on Instagram or WhatsApp</p>
      </div>

      <div className="px-5 -mt-3 flex flex-col gap-4">
        {/* The Card itself */}
        <div
          ref={cardRef}
          className="bg-gradient-to-br from-[#2d4a3e] via-[#3a5f50] to-[#234038] rounded-3xl overflow-hidden shadow-xl border border-[#1e3530]"
        >
          {/* Card Header */}
          <div className="px-6 pt-7 pb-5 relative">
            {/* Background paw watermark */}
            <div className="absolute top-3 right-4 text-6xl opacity-10 select-none">🐾</div>

            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-[#e8c547] rounded-2xl flex items-center justify-center text-2xl shadow-lg flex-shrink-0">
                🐾
              </div>
              <div>
                <h2 className="text-white text-2xl font-bold leading-tight">
                  {mealPlan?.petName || pet?.petName}
                </h2>
                <p className="text-[#a8c4b8] text-sm mt-0.5">
                  {pet?.breed} · {pet?.age}
                </p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <span className="bg-[#e8c547] text-[#2d2419] text-xs font-bold px-2.5 py-1 rounded-full">
                    Nutrition Profile
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/10 mx-6" />

          {/* Stats Row */}
          <div className="grid grid-cols-3 px-6 py-4 gap-2">
            <Stat icon="⚖️" label="Weight" value={`${pet?.weight}kg`} />
            <Stat icon={ACTIVITY_EMOJI[pet?.activityLevel] || '🚶'} label="Activity" value={pet?.activityLevel} />
            <Stat icon="📅" label="Plan" value="7-Day" />
          </div>

          {/* Divider */}
          <div className="h-px bg-white/10 mx-6" />

          {/* Nutrition Summary */}
          {mealPlan?.summary && (
            <div className="px-6 py-4">
              <p className="text-[#a8c4b8] text-xs uppercase tracking-wider font-semibold mb-2">Nutrition Summary</p>
              <p className="text-white text-sm leading-relaxed">{mealPlan.summary}</p>
            </div>
          )}

          {/* Divider */}
          {topMeals.length > 0 && <div className="h-px bg-white/10 mx-6" />}

          {/* Featured Meals */}
          {topMeals.length > 0 && (
            <div className="px-6 py-4">
              <p className="text-[#a8c4b8] text-xs uppercase tracking-wider font-semibold mb-3">Featured Meals</p>
              <div className="space-y-2">
                {topMeals.map((meal, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#e8c547] flex-shrink-0" />
                    <p className="text-white text-sm">{meal}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Divider */}
          <div className="h-px bg-white/10 mx-6" />

          {/* Footer branding */}
          <div className="px-6 py-5 flex items-center justify-between">
          <div>
              <p className="text-[#e8c547] text-sm font-bold">Furchild</p>
              <p className="text-[#a8c4b8] text-xs">Premium Raw Pet Food · Dubai UAE</p>
            </div>
            <div className="text-right">
              <p className="text-[#a8c4b8] text-xs">Powered by</p>
              <p className="text-white text-xs font-semibold">FurMatch AI ✨</p>
            </div>
          </div>
        </div>

        {/* Share hint */}
        <div className="bg-white rounded-2xl border border-[#e8e0d5] shadow-sm px-5 py-4">
          <h3 className="text-[#2d4a3e] text-sm font-semibold mb-1">Share {mealPlan?.petName}'s Card</h3>
          <p className="text-[#8a7e72] text-xs leading-relaxed">
            Take a screenshot and share on Instagram or WhatsApp to show off {mealPlan?.petName}'s personalised Furchild nutrition plan.
          </p>
          <div className="flex gap-2 mt-3">
            <ShareBadge emoji="📸" label="Screenshot" />
            <ShareBadge emoji="📱" label="WhatsApp" />
            <ShareBadge emoji="📷" label="Instagram" />
          </div>
        </div>

        {/* Upsell CTA */}
        <div className="bg-[#2d4a3e] rounded-2xl px-5 py-5 text-center shadow-md">
          <p className="text-[#e8c547] text-xs font-semibold uppercase tracking-wider mb-1">Ready to start?</p>
          <h3 className="text-white text-base font-bold mb-1">Get {mealPlan?.petName}'s first box</h3>
          <p className="text-[#a8c4b8] text-xs mb-3">Free delivery on your first Furchild subscription order.</p>
          <a
            href="https://furchild.com"
            target="_blank"
            rel="noreferrer"
            className="inline-block bg-[#e8c547] text-[#2d2419] font-bold text-sm px-6 py-2.5 rounded-xl hover:bg-[#d4b33a] transition-colors"
          >
            Shop Furchild →
          </a>
        </div>

        <p className="text-center text-[#b0a496] text-xs mb-8">
          Powered by Furchild · Premium Raw Pet Food · Dubai UAE
        </p>
      </div>
    </div>
  );
}

function Stat({ icon, label, value }) {
  return (
    <div className="flex flex-col items-center text-center">
      <span className="text-xl mb-1">{icon}</span>
      <span className="text-[#a8c4b8] text-xs">{label}</span>
      <span className="text-white text-xs font-semibold mt-0.5 leading-tight">{value}</span>
    </div>
  );
}

function ShareBadge({ emoji, label }) {
  return (
    <div className="flex items-center gap-1.5 bg-[#f7f3ee] border border-[#e8e0d5] rounded-lg px-3 py-1.5">
      <span className="text-sm">{emoji}</span>
      <span className="text-[#5c4f3a] text-xs font-medium">{label}</span>
    </div>
  );
}
