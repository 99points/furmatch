import { useState } from 'react';
import './index.css';
import PetProfileForm from './components/PetProfileForm';
import MealPlanView from './components/MealPlanView';
import HealthCard from './components/HealthCard';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const SCREENS = { FORM: 'form', PLAN: 'plan', CARD: 'card' };

export default function App() {
  const [screen, setScreen] = useState(SCREENS.FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mealPlan, setMealPlan] = useState(null);
  const [pet, setPet] = useState(null);

  const handleSubmit = async (petData) => {
    setLoading(true);
    setError(null);
    setPet(petData);
    try {
      const res = await fetch(`${API_BASE}/meal-plan/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(petData),
      });
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.json();
      setMealPlan(data);
      setScreen(SCREENS.PLAN);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[390px] mx-auto min-h-screen relative">
      {error && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl shadow-lg max-w-[350px] w-full">
          <div className="flex items-start gap-2">
            <span className="text-red-500 mt-0.5">⚠️</span>
            <div>
              <p className="font-semibold">Oops!</p>
              <p>{error}</p>
            </div>
            <button onClick={() => setError(null)} className="ml-auto text-red-400 hover:text-red-600">✕</button>
          </div>
        </div>
      )}

      {screen === SCREENS.FORM && (
        <PetProfileForm onSubmit={handleSubmit} loading={loading} />
      )}

      {screen === SCREENS.PLAN && mealPlan && (
        <MealPlanView
          mealPlan={mealPlan}
          pet={pet}
          onViewCard={() => setScreen(SCREENS.CARD)}
          onReset={() => { setScreen(SCREENS.FORM); setMealPlan(null); }}
        />
      )}

      {screen === SCREENS.CARD && mealPlan && (
        <HealthCard
          mealPlan={mealPlan}
          pet={pet}
          onBack={() => setScreen(SCREENS.PLAN)}
        />
      )}
    </div>
  );
}
