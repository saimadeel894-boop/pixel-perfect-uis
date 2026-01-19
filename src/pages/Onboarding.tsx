import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext, AppRole } from '@/contexts/AuthContext';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Dumbbell, Users, UserCheck, Loader2, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RoleOption {
  role: AppRole;
  title: string;
  description: string;
  icon: typeof Dumbbell;
}

const roleOptions: RoleOption[] = [
  {
    role: 'client',
    title: 'Client',
    description: 'I want to train and track my fitness progress',
    icon: Dumbbell,
  },
  {
    role: 'coach',
    title: 'Coach',
    description: 'I want to train clients and manage their progress',
    icon: Users,
  },
];

export default function Onboarding() {
  const [selectedRole, setSelectedRole] = useState<AppRole | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { assignRole, user } = useAuthContext();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleContinue = async () => {
    if (!selectedRole) {
      toast({
        variant: 'destructive',
        title: 'Please select a role',
        description: 'Choose how you want to use Tronex.',
      });
      return;
    }

    setIsLoading(true);

    const { error } = await assignRole(selectedRole);

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: typeof error === 'object' && 'message' in error ? error.message : 'Failed to assign role',
      });
    } else {
      toast({
        title: 'Welcome to Tronex!',
        description: `You're all set as a ${selectedRole}.`,
      });
      navigate('/');
    }

    setIsLoading(false);
  };

  return (
    <AuthLayout>
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-xl font-semibold text-foreground">How will you use Tronex?</h2>
          <p className="text-muted-foreground text-sm">
            Choose your role to personalize your experience
          </p>
        </div>

        {/* Role Selection */}
        <div className="space-y-4">
          {roleOptions.map((option) => {
            const Icon = option.icon;
            const isSelected = selectedRole === option.role;

            return (
              <button
                key={option.role}
                onClick={() => setSelectedRole(option.role)}
                className={cn(
                  'w-full p-4 rounded-2xl border-2 transition-all duration-200',
                  'flex items-center gap-4 text-left',
                  isSelected
                    ? 'border-primary bg-primary/10'
                    : 'border-border bg-background-card hover:border-primary/50'
                )}
              >
                <div
                  className={cn(
                    'w-12 h-12 rounded-xl flex items-center justify-center shrink-0',
                    isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  )}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground">{option.title}</h3>
                  <p className="text-sm text-muted-foreground">{option.description}</p>
                </div>
                <div
                  className={cn(
                    'w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0',
                    isSelected ? 'border-primary bg-primary' : 'border-muted-foreground'
                  )}
                >
                  {isSelected && <Check className="h-4 w-4 text-primary-foreground" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Continue Button */}
        <Button
          onClick={handleContinue}
          disabled={!selectedRole || isLoading}
          className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Setting up...
            </>
          ) : (
            'Continue'
          )}
        </Button>

        <p className="text-center text-muted-foreground text-xs">
          You can change this later in your profile settings
        </p>
      </div>
    </AuthLayout>
  );
}