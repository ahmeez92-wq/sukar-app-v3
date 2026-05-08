import React, { createContext, useContext, useEffect, useState } from 'react';

export interface BloodSugarReading {
  id: string;
  value: number;
  timestamp: Date;
  notes?: string;
  mealType?: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}

export interface Meal {
  id: string;
  name: string;
  carbs: number;
  protein: number;
  fat: number;
  calories: number;
  timestamp: Date;
}

export interface InsulinCalculation {
  id: string;
  bloodSugar: number;
  carbs: number;
  insulinDose: number;
  timestamp: Date;
  notes?: string;
}

interface DataContextType {
  readings: BloodSugarReading[];
  meals: Meal[];
  calculations: InsulinCalculation[];
  addReading: (reading: Omit<BloodSugarReading, 'id'>) => void;
  addMeal: (meal: Omit<Meal, 'id'>) => void;
  addCalculation: (calculation: Omit<InsulinCalculation, 'id'>) => void;
  deleteReading: (id: string) => void;
  deleteMeal: (id: string) => void;
  getTodayReadings: () => BloodSugarReading[];
  getTodayMeals: () => Meal[];
  getAverageBloodSugar: () => number;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const STORAGE_KEYS = {
  READINGS: 'sukar_readings',
  MEALS: 'sukar_meals',
  CALCULATIONS: 'sukar_calculations'
};

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [readings, setReadings] = useState<BloodSugarReading[]>([]);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [calculations, setCalculations] = useState<InsulinCalculation[]>([]);

  // تحميل البيانات من التخزين المحلي
  useEffect(() => {
    const loadData = () => {
      try {
        const storedReadings = localStorage.getItem(STORAGE_KEYS.READINGS);
        const storedMeals = localStorage.getItem(STORAGE_KEYS.MEALS);
        const storedCalculations = localStorage.getItem(STORAGE_KEYS.CALCULATIONS);

        if (storedReadings) {
          const parsed = JSON.parse(storedReadings);
          setReadings(parsed.map((r: any) => ({
            ...r,
            timestamp: new Date(r.timestamp)
          })));
        }

        if (storedMeals) {
          const parsed = JSON.parse(storedMeals);
          setMeals(parsed.map((m: any) => ({
            ...m,
            timestamp: new Date(m.timestamp)
          })));
        }

        if (storedCalculations) {
          const parsed = JSON.parse(storedCalculations);
          setCalculations(parsed.map((c: any) => ({
            ...c,
            timestamp: new Date(c.timestamp)
          })));
        }
      } catch (err) {
        console.error('Failed to load data from storage:', err);
      }
    };

    loadData();
  }, []);

  // حفظ البيانات عند التغيير
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.READINGS, JSON.stringify(readings));
  }, [readings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MEALS, JSON.stringify(meals));
  }, [meals]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CALCULATIONS, JSON.stringify(calculations));
  }, [calculations]);

  const addReading = (reading: Omit<BloodSugarReading, 'id'>) => {
    const newReading: BloodSugarReading = {
      ...reading,
      id: Date.now().toString()
    };
    setReadings([newReading, ...readings]);
  };

  const addMeal = (meal: Omit<Meal, 'id'>) => {
    const newMeal: Meal = {
      ...meal,
      id: Date.now().toString()
    };
    setMeals([newMeal, ...meals]);
  };

  const addCalculation = (calculation: Omit<InsulinCalculation, 'id'>) => {
    const newCalculation: InsulinCalculation = {
      ...calculation,
      id: Date.now().toString()
    };
    setCalculations([newCalculation, ...calculations]);
  };

  const deleteReading = (id: string) => {
    setReadings(readings.filter(r => r.id !== id));
  };

  const deleteMeal = (id: string) => {
    setMeals(meals.filter(m => m.id !== id));
  };

  const getTodayReadings = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return readings.filter(r => {
      const readingDate = new Date(r.timestamp);
      readingDate.setHours(0, 0, 0, 0);
      return readingDate.getTime() === today.getTime();
    });
  };

  const getTodayMeals = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return meals.filter(m => {
      const mealDate = new Date(m.timestamp);
      mealDate.setHours(0, 0, 0, 0);
      return mealDate.getTime() === today.getTime();
    });
  };

  const getAverageBloodSugar = () => {
    const todayReadings = getTodayReadings();
    if (todayReadings.length === 0) return 0;
    const sum = todayReadings.reduce((acc, r) => acc + r.value, 0);
    return Math.round(sum / todayReadings.length);
  };

  return (
    <DataContext.Provider
      value={{
        readings,
        meals,
        calculations,
        addReading,
        addMeal,
        addCalculation,
        deleteReading,
        deleteMeal,
        getTodayReadings,
        getTodayMeals,
        getAverageBloodSugar
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
}
