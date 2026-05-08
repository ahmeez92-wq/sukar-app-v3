import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { ArrowRight, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useLocation } from 'wouter';

export default function History() {
  const [activeTab, setActiveTab] = useState<'readings' | 'meals'>('readings');
  const { isAuthenticated } = useAuth();
  const { readings, meals, deleteReading, deleteMeal } = useData();
  const [, setLocation] = useLocation();

  if (!isAuthenticated) {
    setLocation('/login');
    return null;
  }

  const sortedReadings = [...readings].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  const sortedMeals = [...meals].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  const getBloodSugarStatus = (value: number) => {
    if (value < 70) return { label: 'منخفض جداً', color: 'text-red-600', bgColor: 'bg-red-50' };
    if (value < 100) return { label: 'طبيعي', color: 'text-green-600', bgColor: 'bg-green-50' };
    if (value < 200) return { label: 'مرتفع', color: 'text-yellow-600', bgColor: 'bg-yellow-50' };
    return { label: 'مرتفع جداً', color: 'text-red-600', bgColor: 'bg-red-50' };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6 flex items-center gap-3 safe-area-inset-top">
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-purple-700"
          onClick={() => setLocation('/dashboard')}
        >
          <ArrowRight className="w-5 h-5" />
        </Button>
        <h1 className="text-2xl font-bold">السجل التاريخي</h1>
      </div>

      <div className="container mt-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <Button
            onClick={() => setActiveTab('readings')}
            className={activeTab === 'readings' ? 'bg-purple-600 text-white' : 'bg-white text-purple-600 border border-purple-200'}
          >
            قراءات السكر
          </Button>
          <Button
            onClick={() => setActiveTab('meals')}
            className={activeTab === 'meals' ? 'bg-purple-600 text-white' : 'bg-white text-purple-600 border border-purple-200'}
          >
            الوجبات
          </Button>
        </div>

        {/* Readings Tab */}
        {activeTab === 'readings' && (
          <div className="space-y-3">
            {sortedReadings.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center text-gray-600">
                  لا توجد قراءات حتى الآن
                </CardContent>
              </Card>
            ) : (
              sortedReadings.map((reading) => {
                const status = getBloodSugarStatus(reading.value);
                return (
                  <Card key={reading.id} className={`${status.bgColor} border-2`}>
                    <CardContent className="pt-4 flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-2xl font-bold ${status.color}`}>
                            {reading.value}
                          </span>
                          <span className="text-sm text-gray-600">mg/dL</span>
                        </div>
                        <p className={`text-xs ${status.color}`}>{status.label}</p>
                        <p className="text-xs text-gray-600 mt-1">
                          {reading.timestamp.toLocaleString('ar-EG')}
                        </p>
                        {reading.notes && (
                          <p className="text-xs text-gray-700 mt-2">{reading.notes}</p>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteReading(reading.id)}
                        className="text-red-600 hover:bg-red-100"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        )}

        {/* Meals Tab */}
        {activeTab === 'meals' && (
          <div className="space-y-3">
            {sortedMeals.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center text-gray-600">
                  لا توجد وجبات حتى الآن
                </CardContent>
              </Card>
            ) : (
              sortedMeals.map((meal) => (
                <Card key={meal.id} className="bg-orange-50 border-2 border-orange-200">
                  <CardContent className="pt-4 flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-2">{meal.name}</h3>
                      <div className="grid grid-cols-3 gap-2 text-xs mb-2">
                        <div>
                          <span className="text-gray-600">كربوهيدرات:</span>
                          <p className="font-semibold text-orange-600">{meal.carbs}g</p>
                        </div>
                        <div>
                          <span className="text-gray-600">بروتين:</span>
                          <p className="font-semibold text-orange-600">{meal.protein}g</p>
                        </div>
                        <div>
                          <span className="text-gray-600">دهون:</span>
                          <p className="font-semibold text-orange-600">{meal.fat}g</p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600">
                        {meal.timestamp.toLocaleString('ar-EG')}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteMeal(meal.id)}
                      className="text-red-600 hover:bg-red-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
