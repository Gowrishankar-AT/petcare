import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import AppointmentPage from "./pages/appointment";
import HistoryPage from "./pages/history";
import PetListPage from "./pages/petlist";
import LandingPage from "./pages/landing";
import AppointmentsPage from "./components/AppointmentAdmin";
import CustomerManagement from "./pages/customermang";
import PetsPage from "./pages/petsmgm";
import StaffPage from "./pages/staff";
import TreatmentPage from "./pages/treatmentpage";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path='/profile'element={<Profile />}/>
            <Route path='/appoint'element={<AppointmentPage />}/>
            <Route path='/history'element={<HistoryPage />}/>
            <Route path='/petlist'element={<PetListPage />}/>
             <Route path='/landing'element={<LandingPage />}/>
             <Route path='/adminapp'element={<AppointmentsPage />}/>
             <Route path='/custmgm'element={<CustomerManagement />}/>
             <Route path='/pets'element={<PetsPage/>}/>
             <Route path='/staff'element={<StaffPage/>}/>
             <Route path='/treatment'element={<TreatmentPage/>}/>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<LandingPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
