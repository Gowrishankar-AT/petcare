import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, Calendar } from 'lucide-react';
import {AvatarImage,Avatar} from '@/components/ui/avatar';
interface LayoutProps {
  children: ReactNode;
  title: string;
}
 


const Layout = ({ children, title }: LayoutProps) => {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

 const profileClick = () => {
    navigate('/profile'); // Make sure this route exists
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold">{title}</h1>
              {user && (
                <p className="text-sm text-muted-foreground">
                  {user.name} • {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </p>
              )}
            </div>
          </div>
          <Button
          variant="ghost"
          className="p-2 rounded-full" 
          onClick={profileClick}
        >
          <Avatar  className="cursor-pointer">
            <AvatarImage src="https://plus.unsplash.com/premium_photo-1666229410352-c4686b71cea2?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
          </Avatar>
        </Button>
        </div>
      </header>
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
};

export default Layout;
