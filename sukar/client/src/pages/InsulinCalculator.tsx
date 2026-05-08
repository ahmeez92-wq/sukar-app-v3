import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { useLocation } from 'wouter';

export default function InsulinCalculator() {
  const [bloodSugar, setBloodSugar] = useState('');
  const [carbs, setCarbs] = useState('');
  const [insulinDose, setInsulinDose] = useState<number | null>(null);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { isAuthenticated } = useAuth();
  const { addCalculation } = useData();
  const [, setLocation] = useLocation();

  if (!isAuthenticated) {
    setLocation('/login');
    return null;
  }

  const calculateInsulin = () => {
    if (!bloodSugar || !carbs) return;

    const bs = parseInt(bloodSugar);
    const c = parseInt(carbs);

    // معادلة حساب الإنسولين المبسطة
    // 1 وحدة إنسولين لكل 15 جرام كربوهيدرات
    // + تصحيح بناءً على مستوى السكر
    const carbRatio = c / 15;
    const correctionFactor = Math.max(0, (bs - 100) / 50);
    const totalDose = carbRatio + correctionFactor;

    setInsulinDose(Math.round(totalDose * 2) / 2); // تقريب لأقرب 0.5
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bloodSugar || !carbs || insulinDose === null) return;

    setIsSubmitting(true);
    try {
      addCalculation({
        bloodSugar: parseInt(bloodSugar),
        carbs: parseInt(carbs),
        insulinDose,
        timestamp: new Date(),
        notes
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-8">
            <CheckCircle className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">تم بنجاح!</h2>
            <p className="text-gray-600">تم حفظ الحساب بنجاح</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 flex items-center gap-3 safe-area-inset-top">
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-blue-700"
          onClick={() => setLocation('/dashboard')}
        >
          <ArrowRight className="w-5 h-5" />
        </Button>
        <h1 className="text-2xl font-bold">حساب الإنسولين</h1>
      </div>

      <div className="container mt-6">
        <Card>
          <CardHeader>
            <CardTitle>حاسبة الإنسولين الذكية</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bloodSugar">مستوى السكر الحالي (mg/dL)</Label>
                <Input
                  id="bloodSugar"
                  type="number"
                  placeholder="أدخل مستوى السكر"
                  value={bloodSugar}
                  onChange={(e) => setBloodSugar(e.target.value)}
                  min="0"
                  max="600"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="carbs">الكربوهيدرات (جرام)</Label>
                <Input
                  id="carbs"
                  type="number"
                  placeholder="أدخل كمية الكربوهيدرات"
                  value={carbs}
                  onChange={(e) => setCarbs(e.target.value)}
                  min="0"
                  max="500"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <Button
                type="button"
                onClick={calculateInsulin}
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={!bloodSugar || !carbs || isSubmitting}
              >
                حساب الجرعة
              </Button>

              {insulinDose !== null && (
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-gray-600 mb-2">جرعة الإنسولين المقترحة</p>
                      <div className="text-4xl font-bold text-blue-600 mb-2">
                        {insulinDose}
                      </div>
                      <p className="text-sm text-gray-600">وحدة دولية</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="space-y-2">
                <Label htmlFor="notes">ملاحظات (اختياري)</Label>
                <Textarea
                  id="notes"
                  placeholder="أضف أي ملاحظات..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={isSubmitting || insulinDose === null}
              >
                {isSubmitting ? 'جاري الحفظ...' : 'حفظ الحساب'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
