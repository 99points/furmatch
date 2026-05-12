import { useState } from 'react';

const ACTIVITY_LEVELS = ['Low', 'Moderate', 'High', 'Very High'];

const COMMON_BREEDS = [
  'Mixed Breed', 'Labrador Retriever', 'German Shepherd', 'Golden Retriever',
  'French Bulldog', 'Poodle', 'Husky', 'Beagle', 'Rottweiler', 'Dachshund',
  'Shih Tzu', 'Yorkshire Terrier', 'Persian Cat', 'Maine Coon', 'Siamese',
  'Other',
];

export default function PetProfileForm({ onSubmit, loading }) {
  const [form, setForm] = useState({
    petName: '',
    breed: '',
    age: '',
    weight: '',
    activityLevel: 'Moderate',
    allergies: '',
  });

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  const isValid = form.petName && form.breed && form.age && form.weight;

  return (
    <div className="w-full min-h-screen bg-[#f7f3ee] flex flex-col">
      {/* Header */}
      <div className="bg-[#2d4a3e] px-6 pt-12 pb-8 text-center">
        <div className="flex justify-center mb-3">
          <div className="w-14 h-14 bg-[#e8c547] rounded-full flex items-center justify-center text-2xl shadow-lg">
            🐾
          </div>
        </div>
        <h1 className="text-white text-2xl font-bold tracking-tight">FurMatch</h1>
        <p className="text-[#a8c4b8] text-sm mt-1">AI Pet Nutrition · by Furchild</p>
      </div>

      {/* Card */}
      <div className="flex-1 px-5 -mt-4">
        <div className="bg-white rounded-2xl shadow-sm border border-[#e8e0d5] overflow-hidden">
          <div className="px-5 pt-6 pb-2">
            <h2 className="text-[#2d4a3e] text-lg font-semibold">Tell us about your pet</h2>
            <p className="text-[#8a7e72] text-sm mt-1">We'll create a personalised Furchild meal plan just for them.</p>
          </div>

          <form onSubmit={handleSubmit} className="px-5 pb-6 space-y-4 mt-2">
            {/* Pet Name */}
            <div>
              <label className="block text-xs font-semibold text-[#5c4f3a] uppercase tracking-wider mb-1.5">
                Pet's Name
              </label>
              <input
                type="text"
                placeholder="e.g. Bella"
                value={form.petName}
                onChange={set('petName')}
                className="w-full px-4 py-3 rounded-xl border border-[#ddd6cc] bg-[#faf8f5] text-[#2d2419] placeholder-[#bbb0a4] focus:outline-none focus:border-[#2d4a3e] focus:ring-2 focus:ring-[#2d4a3e]/10 text-sm transition-all"
                required
              />
            </div>

            {/* Breed */}
            <div>
              <label className="block text-xs font-semibold text-[#5c4f3a] uppercase tracking-wider mb-1.5">
                Breed
              </label>
              <select
                value={form.breed}
                onChange={set('breed')}
                className="w-full px-4 py-3 rounded-xl border border-[#ddd6cc] bg-[#faf8f5] text-[#2d2419] focus:outline-none focus:border-[#2d4a3e] focus:ring-2 focus:ring-[#2d4a3e]/10 text-sm transition-all appearance-none"
                required
              >
                <option value="">Select breed...</option>
                {COMMON_BREEDS.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            {/* Age + Weight row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#5c4f3a] uppercase tracking-wider mb-1.5">
                  Age
                </label>
                <input
                  type="text"
                  placeholder="e.g. 3 years"
                  value={form.age}
                  onChange={set('age')}
                  className="w-full px-4 py-3 rounded-xl border border-[#ddd6cc] bg-[#faf8f5] text-[#2d2419] placeholder-[#bbb0a4] focus:outline-none focus:border-[#2d4a3e] focus:ring-2 focus:ring-[#2d4a3e]/10 text-sm transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#5c4f3a] uppercase tracking-wider mb-1.5">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 25"
                  value={form.weight}
                  onChange={set('weight')}
                  min="0.5"
                  max="100"
                  step="any"
                  className="w-full px-4 py-3 rounded-xl border border-[#ddd6cc] bg-[#faf8f5] text-[#2d2419] placeholder-[#bbb0a4] focus:outline-none focus:border-[#2d4a3e] focus:ring-2 focus:ring-[#2d4a3e]/10 text-sm transition-all"
                  required
                />
              </div>
            </div>

            {/* Activity Level */}
            <div>
              <label className="block text-xs font-semibold text-[#5c4f3a] uppercase tracking-wider mb-2">
                Activity Level
              </label>
              <div className="grid grid-cols-4 gap-2">
                {ACTIVITY_LEVELS.map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, activityLevel: level }))}
                    className={`py-2.5 rounded-xl text-xs font-semibold transition-all border ${
                      form.activityLevel === level
                        ? 'bg-[#2d4a3e] text-white border-[#2d4a3e] shadow-sm'
                        : 'bg-[#faf8f5] text-[#5c4f3a] border-[#ddd6cc] hover:border-[#2d4a3e]/40'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Allergies */}
            <div>
              <label className="block text-xs font-semibold text-[#5c4f3a] uppercase tracking-wider mb-1.5">
                Allergies / Health Notes
                <span className="font-normal text-[#bbb0a4] ml-1">(optional)</span>
              </label>
              <textarea
                placeholder="e.g. No chicken, sensitive stomach..."
                value={form.allergies}
                onChange={set('allergies')}
                rows={2}
                className="w-full px-4 py-3 rounded-xl border border-[#ddd6cc] bg-[#faf8f5] text-[#2d2419] placeholder-[#bbb0a4] focus:outline-none focus:border-[#2d4a3e] focus:ring-2 focus:ring-[#2d4a3e]/10 text-sm transition-all resize-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!isValid || loading}
              className={`w-full py-4 rounded-xl font-semibold text-sm transition-all mt-2 ${
                isValid && !loading
                  ? 'bg-[#2d4a3e] text-white shadow-md hover:bg-[#234038] active:scale-[0.98]'
                  : 'bg-[#c8c0b4] text-white cursor-not-allowed'
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Creating meal plan...
                </span>
              ) : (
                '✨ Generate My Meal Plan'
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-[#b0a496] text-xs mt-5 mb-8">
          Powered by Furchild · Premium Raw Pet Food · Dubai UAE
        </p>
      </div>
    </div>
  );
}
