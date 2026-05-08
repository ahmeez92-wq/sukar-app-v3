import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { useLocation } from 'wouter';

const MEALS_DATABASE = [
  { name: 'خبز أبيض (شريحة)', carbs: 15, protein: 3, fat: 1, calories: 75 },
  { name: 'خبز بني (شريحة)', carbs: 14, protein: 4, fat: 1, calories: 80 },
  { name: 'أرز مطبوخ (كوب)', carbs: 45, protein: 4, fat: 0, calories: 200 },
  { name: 'معكرونة مطبوخة (كوب)', carbs: 40, protein: 8, fat: 1, calories: 220 },
  { name: 'حليب كامل الدسم (كوب)', carbs: 12, protein: 8, fat: 8, calories: 150 },
  { name: 'حليب منزوع الدسم (كوب)', carbs: 12, protein: 8, fat: 0, calories: 80 },
  { name: 'لبن (كوب)', carbs: 10, protein: 10, fat: 3, calories: 100 },
  { name: 'جبن أبيض (100 غ)', carbs: 3, protein: 20, fat: 15, calories: 250 },
  { name: 'بيضة مسلوقة', carbs: 1, protein: 6, fat: 5, calories: 70 },
  { name: 'دجاج مشوي (100 غ)', carbs: 0, protein: 31, fat: 3, calories: 165 },
  { name: 'سمك مشوي (100 غ)', carbs: 0, protein: 25, fat: 5, calories: 150 },
  { name: 'لحم بقري (100 غ)', carbs: 0, protein: 26, fat: 15, calories: 250 },
  { name: 'تفاح متوسط', carbs: 25, protein: 0, fat: 0, calories: 95 },
  { name: 'موز متوسط', carbs: 27, protein: 1, fat: 0, calories: 105 },
  { name: 'برتقال متوسط', carbs: 15, protein: 1, fat: 0, calories: 60 },
  { name: 'عنب (كوب)', carbs: 29, protein: 1, fat: 0, calories: 110 },
  { name: 'جزر (متوسط)', carbs: 6, protein: 1, fat: 0, calories: 25 },
  { name: 'خيار (متوسط)', carbs: 4, protein: 1, fat: 0, calories: 15 },
  { name: 'طماطم (متوسطة)', carbs: 5, protein: 1, fat: 0, calories: 20 },
  { name: 'خس (كوب)', carbs: 1, protein: 1, fat: 0, calories: 5 },
  { name: 'زيت زيتون (ملعقة)', carbs: 0, protein: 0, fat: 14, calories: 120 },
  { name: 'زبدة الفول السوداني (ملعقة)', carbs: 4, protein: 8, fat: 16, calories: 190 },
  { name: 'حمص (كوب)', carbs: 35, protein: 15, fat: 4, calories: 270 },
  { name: 'فول مطبوخ (كوب)', carbs: 40, protein: 13, fat: 1, calories: 240 },
  { name: 'عدس مطبوخ (كوب)', carbs: 40, protein: 18, fat: 1, calories: 230 },
  { name: 'حلويات (قطعة)', carbs: 30, protein: 1, fat: 5, calories: 150 },
  { name: 'شوكولاتة (قطعة)', carbs: 15, protein: 2, fat: 9, calories: 150 },
  { name: 'آيس كريم (نصف كوب)', carbs: 20, protein: 2, fat: 7, calories: 130 },
  { name: 'عصير برتقال (كوب)', carbs: 26, protein: 2, fat: 0, calories: 110 },
  { name: 'قهوة بالحليب', carbs: 5, protein: 3, fat: 2, calories: 50 }
];

export default function AddMeal() {
  const [selectedMeal, setSelectedMeal] = useState('');
  const [customName, setCustomName] = useState('');
  const [customCarbs, setCustomCarbs] = useState('');
  const [customProtein, setCustomProtein] = useState('');
  const [customFat, setCustomFat] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { isAuthenticated } = useAuth();
  const { addMeal } = useData();
  const [, setLocation] = useLocation();

  if (!isAuthenticated) {
    setLocation('/login');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let mealData;

    if (selectedMeal) {
      const meal = MEALS_DATABASE.find(m => m.name === selectedMeal);
      if (!meal) return;
      mealData = meal;
    } else if (customName && customCarbs) {
      mealData = {
        name: customName,
        carbs: parseInt(customCarbs),
        protein: parseInt(customProtein) || 0,
        fat: parseInt(customFat) || 0,
        calories: 0
      };
    } else {
      return;
    }

    setIsSubmitting(true);
    try {
      addMeal({
        name: mealData.name,
        carbs: mealData.carbs,
        protein: mealData.protein,
        fat: mealData.fat,
        calories: mealData.calories,
        timestamp: new Date()
      });

      setShowSuccess(true);
      setTimeout(() => {
        setLocation('/dashboard');
      }, 2000);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50 p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-8">
            <CheckCircle className="w-16 h-16 text-orange-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">تم بنجاح!</h2>
            <p className="text-gray-600">تم حفظ الوجبة بنجاح</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white p-6 flex items-center gap-3 safe-area-inset-top">
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-orange-700"
          onClick={() => setLocation('/dashboard')}
        >
          <ArrowRight className="w-5 h-5" />
        </Button>
        <h1 className="text-2xl font-bold">إضافة وجبة</h1>
      </div>

      <div className="container mt-6">
        <Card>
          <CardHeader>
            <CardTitle>اختر وجبة أو أضف وجبة مخصصة</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="meal">الوجبات الشائعة</Label>
                <Select value={selectedMeal} onValueChange={setSelectedMeal}>
                  <SelectTrigger id="meal">
                    <SelectValue placeholder="اختر وجبة من القائمة" />
                  </SelectTrigger>
                  <SelectContent>
                    {MEALS_DATABASE.map((meal) => (
                      <SelectItem key={meal.name} value={meal.name}>
                        {meal.name} ({meal.carbs}g كربوهيدرات)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {!selectedMeal && (
                <>
                  <div className="border-t pt-4">
                    <h3 className="font-semibold mb-3">أو أضف وجبة مخصصة</h3>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="customName">اسم الوجبة</Label>
                    <Input
                      id="customName"
                      placeholder="مثال: سلطة خضراء"
                      value={customName}
                      onChange={(e) => setCustomName(e.target.value)}
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="customCarbs">الكربوهيدرات (جرام)</Label>
                    <Input
                      id="customCarbs"
                      type="number"
                      placeholder="0"
                      value={customCarbs}
                      onChange={(e) => setCustomCarbs(e.target.value)}
                      min="0"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="customProtein">البروتين (جرام)</Label>
                    <Input
                      id="customProtein"
                      type="number"
                      placeholder="0"
                      value={customProtein}
                      onChange={(e) => setCustomProtein(e.target.value)}
                      min="0"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="customFat">الدهون (جرام)</Label>
                    <Input
                      id="customFat"
                      type="number"
                      placeholder="0"
                      value={customFat}
                      onChange={(e) => setCustomFat(e.target.value)}
                      min="0"
                      disabled={isSubmitting}
                    />
                  </div>
                </>
              )}

              <Button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700"
                disabled={isSubmitting || (!selectedMeal && !customName)}
              >
                {isSubmitting ? 'جاري الحفظ...' : 'حفظ الوجبة'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
