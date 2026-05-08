import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { Activity, Apple, Pill, TrendingUp } from 'lucide-react';
import { useEffect } from 'react';
import { useLocation } from 'wouter';

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  const { getTodayReadings, getTodayMeals, getAverageBloodSugar } = useData();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      setLocation('/login');
    }
  }, [isAuthenticated, setLocation]);

  const todayReadings = getTodayReadings();
  const todayMeals = getTodayMeals();
  const averageBloodSugar = getAverageBloodSugar();

  const getBloodSugarStatus = (value: number) => {
    if (value < 70) return { label: 'منخفض جداً', color: 'text-red-600', bgColor: 'bg-red-50' };
    if (value < 100) return { label: 'طبيعي', color: 'text-green-600', bgColor: 'bg-green-50' };
    if (value < 200) return { label: 'مرتفع', color: 'text-yellow-600', bgColor: 'bg-yellow-50' };
    return { label: 'مرتفع جداً', color: 'text-red-600', bgColor: 'bg-red-50' };
  };

  if (!isAuthenticated) return null;

  const latestReading = todayReadings[0];
  const status = latestReading ? getBloodSugarStatus(latestReading.value) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 safe-area-inset-top">
        <h1 className="text-3xl font-bold">مرحباً، {user?.name}</h1>
        <p className="text-green-100">لوحة التحكم الرئيسية</p>
      </div>

      <div className="container mt-6 space-y-6">
        {/* آخر قراءة */}
        {latestReading && (
          <Card className={`${status?.bgColor} border-2`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                آخر قراءة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold mb-2">
                <span className={status?.color}>{latestReading.value}</span>
                <span className="text-lg mr-2">mg/dL</span>
              </div>
              <p className={`text-sm ${status?.color}`}>{status?.label}</p>
              <p className="text-gray-600 text-sm mt-2">
                {latestReading.timestamp.toLocaleTimeString('ar-EG')}
              </p>
            </CardContent>
          </Card>
        )}

        {/* الإحصائيات اليومية */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                المتوسط
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{averageBloodSugar}</div>
              <p className="text-xs text-gray-600 mt-1">mg/dL</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Activity className="w-4 h-4" />
                القراءات
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{todayReadings.length}</div>
              <p className="text-xs text-gray-600 mt-1">اليوم</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Apple className="w-4 h-4" />
                الوجبات
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{todayMeals.length}</div>
              <p className="text-xs text-gray-600 mt-1">اليوم</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Pill className="w-4 h-4" />
                الأدوية
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">2</div>
              <p className="text-xs text-gray-600 mt-1">جرعات</p>
            </CardContent>
          </Card>
        </div>

        {/* الأزرار السريعة */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold">الإجراءات السريعة</h2>
          <Button
            onClick={() => setLocation('/add-reading')}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-6"
          >
            <Activity className="mr-2 w-5 h-5" />
            قراءة السكر
          </Button>
          <Button
            onClick={() => setLocation('/insulin-calculator')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6"
          >
            <Pill className="mr-2 w-5 h-5" />
            حساب الإنسولين
          </Button>
          <Button
            onClick={() => setLocation('/add-meal')}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-6"
          >
            <Apple className="mr-2 w-5 h-5" />
            إضافة وجبة
          </Button>
        </div>
      </div>
    </div>
  );
}
