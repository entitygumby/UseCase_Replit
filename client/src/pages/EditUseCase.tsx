import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocation, useRoute } from "wouter";
import UseCaseForm from "@/components/UseCaseForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { InsertUseCase, UseCase } from "@shared/schema";

export default function EditUseCase() {
  const [, setLocation] = useLocation();
  const [, params] = useRoute("/use-cases/:id/edit");
  const useCaseId = params?.id;
  const { toast } = useToast();

  const { data: useCases = [], isLoading } = useQuery<UseCase[]>({
    queryKey: ['/api/use-cases'],
  });

  const useCase = useCases.find((uc) => uc.id === useCaseId);

  const updateMutation = useMutation({
    mutationFn: async (data: InsertUseCase) => {
      return apiRequest('PUT', `/api/use-cases/${useCaseId}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/use-cases'] });
      toast({
        title: "Success",
        description: "Use case updated successfully",
      });
      setLocation(`/use-cases/${useCaseId}`);
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update use case",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (data: InsertUseCase) => {
    updateMutation.mutate(data);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-lg text-muted-foreground">Loading use case...</div>
        </div>
      </div>
    );
  }

  if (!useCase) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Use case not found</h2>
          <p className="text-muted-foreground mb-4">The use case you're looking for doesn't exist.</p>
          <button
            onClick={() => setLocation('/use-cases')}
            className="text-primary hover:underline"
          >
            Back to use cases
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => setLocation(`/use-cases/${useCaseId}`)}
          data-testid="button-back"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div>
          <h1 className="text-4xl font-semibold">Edit Use Case</h1>
          <p className="text-muted-foreground mt-1">
            Update {useCase.name}
          </p>
        </div>
      </div>

      <UseCaseForm
        defaultValues={useCase}
        onSubmit={handleSubmit}
        onCancel={() => setLocation(`/use-cases/${useCaseId}`)}
        isSubmitting={updateMutation.isPending}
      />
    </div>
  );
}
