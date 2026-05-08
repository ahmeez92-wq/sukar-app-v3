import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowRight, LogOut } from 'lucide-react';
import { useLocation } from 'wouter';

export default function Settings() {
  const { user, logout, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  if (!isAuthenticated) {
    setLocation('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    setLocation('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-600 to-gray-700 text-white p-6 flex items-center gap-3 safe-area-inset-top">
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-gray-700"
          onClick={() => setLocation('/dashboard')}
        >
          <ArrowRight className="w-5 h-5" />
        </Button>
        <h1 className="text-2xl font-bold">الإعدادات</h1>
      </div>

      <div className="container mt-6 space-y-4">
        {/* معلومات المستخدم */}
        <Card>
          <CardHeader>
            <CardTitle>معلومات الحساب</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">الاسم</p>
              <p className="font-semibold">{user?.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">البريد الإلكتروني</p>
              <p className="font-semibold">{user?.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">نوع الحساب</p>
              <p className="font-semibold">{user?.isAdmin ? 'مسؤول' : 'مستخدم عادي'}</p>
            </div>
          </CardContent>
        </Card>

        {/* إعدادات التطبيق */}
        <Card>
          <CardHeader>
            <CardTitle>إعدادات التطبيق</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span>الإشعارات</span>
              <input type="checkbox" defaultChecked className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between">
              <span>الوضع الليلي</span>
              <input type="checkbox" className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between">
              <span>حفظ البيانات تلقائياً</span>
              <input type="checkbox" defaultChecked className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        {/* معلومات التطبيق */}
        <Card>
          <CardHeader>
            <CardTitle>عن التطبيق</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div>
              <p className="text-gray-600">الإصدار</p>
              <p>1.0.0</p>
            </div>
            <div>
              <p className="text-gray-600">آخر تحديث</p>
              <p>{new Date().toLocaleDateString('ar-EG')}</p>
            </div>
          </CardContent>
        </Card>

        {/* تسجيل الخروج */}
        <Button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-6"
        >
          <LogOut className="mr-2 w-5 h-5" />
          تسجيل الخروج
        </Button>
      </div>
    </div>
  );
}
