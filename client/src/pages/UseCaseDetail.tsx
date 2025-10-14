import { useQuery } from "@tanstack/react-query";
import { useLocation, useRoute } from "wouter";
import UseCaseDetailView from "@/components/UseCaseDetailView";
import type { UseCase } from "@shared/schema";

export default function UseCaseDetail() {
  const [, setLocation] = useLocation();
  const [, params] = useRoute("/use-cases/:id");
  const useCaseId = params?.id;

  const { data: useCases = [], isLoading } = useQuery<UseCase[]>({
    queryKey: ['/api/use-cases'],
  });

  const useCase = useCases.find((uc) => uc.id === useCaseId);

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
    <UseCaseDetailView
      useCase={useCase}
      onBack={() => setLocation('/use-cases')}
      onEdit={() => console.log('Edit use case:', useCaseId)}
      onDelete={() => {
        console.log('Delete use case:', useCaseId);
        setLocation('/use-cases');
      }}
    />
  );
}
