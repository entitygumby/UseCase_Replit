import { useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import UseCaseForm from "@/components/UseCaseForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { InsertUseCase } from "@shared/schema";

export default function CreateUseCase() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const createMutation = useMutation({
    mutationFn: async (data: InsertUseCase) => {
      console.log('Submitting use case data:', data);
      const response = await apiRequest('POST', '/api/use-cases', data);
      const result = await response.json();
      console.log('Create response:', result);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/use-cases'] });
      toast({
        title: "Success",
        description: "Use case created successfully",
      });
      setLocation('/use-cases');
    },
    onError: (error: Error) => {
      console.error('Create error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to create use case",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (data: InsertUseCase) => {
    createMutation.mutate(data);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => setLocation('/use-cases')}
          data-testid="button-back"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div>
          <h1 className="text-4xl font-semibold">Create Use Case</h1>
          <p className="text-muted-foreground mt-1">
            Add a new use case to the portfolio
          </p>
        </div>
      </div>

      <UseCaseForm
        onSubmit={handleSubmit}
        onCancel={() => setLocation('/use-cases')}
        isSubmitting={createMutation.isPending}
      />
    </div>
  );
}
