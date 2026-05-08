import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'wouter';

export default function NotFound() {
  const { isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  const handleGoHome = () => {
    setLocation(isAuthenticated ? '/dashboard' : '/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">الصفحة غير موجودة</p>
        <Button
          onClick={handleGoHome}
          className="bg-green-600 hover:bg-green-700"
        >
          العودة للرئيسية
        </Button>
      </div>
    </div>
  );
}
