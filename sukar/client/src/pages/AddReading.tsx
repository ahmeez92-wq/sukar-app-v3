import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { useLocation } from 'wouter';

export default function AddReading() {
  const [value, setValue] = useState('');
  const [mealType, setMealType] = useState<'breakfast' | 'lunch' | 'dinner' | 'snack'>('breakfast');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { isAuthenticated } = useAuth();
  const { addReading } = useData();
  const [, setLocation] = useLocation();

  if (!isAuthenticated) {
    setLocation('/login');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!value) return;

    setIsSubmitting(true);
    try {
      addReading({
        value: parseInt(value),
        timestamp: new Date(),
        mealType,
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-8">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">تم بنجاح!</h2>
            <p className="text-gray-600">تم حفظ قراءة السكر بنجاح</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 flex items-center gap-3 safe-area-inset-top">
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-green-700"
          onClick={() => setLocation('/dashboard')}
        >
          <ArrowRight className="w-5 h-5" />
        </Button>
        <h1 className="text-2xl font-bold">قراءة السكر</h1>
      </div>

      <div className="container mt-6">
        <Card>
          <CardHeader>
            <CardTitle>إضافة قراءة جديدة</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="value">قيمة السكر (mg/dL)</Label>
                <Input
                  id="value"
                  type="number"
                  placeholder="أدخل قيمة السكر"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  min="0"
                  max="600"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mealType">نوع الوجبة</Label>
                <Select value={mealType} onValueChange={(val: any) => setMealType(val)}>
                  <SelectTrigger id="mealType">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="breakfast">الإفطار</SelectItem>
                    <SelectItem value="lunch">الغداء</SelectItem>
                    <SelectItem value="dinner">العشاء</SelectItem>
                    <SelectItem value="snack">وجبة خفيفة</SelectItem>
                  </SelectContent>
                </Select>
              </div>

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
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={isSubmitting || !value}
              >
                {isSubmitting ? 'جاري الحفظ...' : 'حفظ القراءة'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
