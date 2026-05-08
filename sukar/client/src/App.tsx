import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { DataProvider } from "@/contexts/DataContext";
import NotFound from "@/pages/NotFound";
import AddMeal from "@/pages/AddMeal";
import AddReading from "@/pages/AddReading";
import Dashboard from "@/pages/Dashboard";
import History from "@/pages/History";
import InsulinCalculator from "@/pages/InsulinCalculator";
import Login from "@/pages/Login";
import Settings from "@/pages/Settings";
import { useEffect } from "react";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { initializeNotifications } from "./lib/notifications";

function Router() {
  return (
    <Switch>
      <Route path={"/login"} component={Login} />
      <Route path={"/dashboard"} component={Dashboard} />
      <Route path={"/add-reading"} component={AddReading} />
      <Route path={"/insulin-calculator"} component={InsulinCalculator} />
      <Route path={"/add-meal"} component={AddMeal} />
      <Route path={"/history"} component={History} />
      <Route path={"/settings"} component={Settings} />
      <Route path={"/"} component={Login} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    // تسجيل Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
          console.log('Service Worker registered:', registration);
        })
        .catch(err => {
          console.error('Service Worker registration failed:', err);
        });
    }

    // تهيئة الإشعارات
    initializeNotifications().catch(err => {
      console.error('Failed to initialize notifications:', err);
    });
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <AuthProvider>
          <DataProvider>
            <TooltipProvider>
              <Router />
            </TooltipProvider>
          </DataProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
