import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import UseCaseTable from "@/components/UseCaseTable";
import FilterBar from "@/components/FilterBar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import type { UseCase } from "@shared/schema";

export default function UseCaseList() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [divisionFilter, setDivisionFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const { data: useCases = [], isLoading } = useQuery<UseCase[]>({
    queryKey: ['/api/use-cases'],
  });

  const filteredUseCases = useMemo(() => {
    return useCases.filter((uc) => {
      const matchesSearch = 
        searchQuery === "" ||
        uc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        uc.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        uc.teamContact?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = 
        statusFilter === "all" || 
        uc.status.toLowerCase() === statusFilter.toLowerCase();

      const matchesDivision = 
        divisionFilter === "all" || 
        uc.division.toLowerCase() === divisionFilter.toLowerCase();

      const matchesType = 
        typeFilter === "all" || 
        uc.solutionType.toLowerCase() === typeFilter.toLowerCase();

      return matchesSearch && matchesStatus && matchesDivision && matchesType;
    });
  }, [useCases, searchQuery, statusFilter, divisionFilter, typeFilter]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-lg text-muted-foreground">Loading use cases...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Button
        variant="ghost"
        onClick={() => setLocation('/')}
        data-testid="button-back"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Dashboard
      </Button>
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Use Cases</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {filteredUseCases.length} of {useCases.length} use cases
          </p>
        </div>
        <Button onClick={() => setLocation('/use-cases/new')} data-testid="button-create">
          <Plus className="mr-2 h-4 w-4" />
          New Use Case
        </Button>
      </div>

      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        divisionFilter={divisionFilter}
        onDivisionChange={setDivisionFilter}
        typeFilter={typeFilter}
        onTypeChange={setTypeFilter}
      />

      <UseCaseTable
        useCases={filteredUseCases}
        onRowClick={(id) => setLocation(`/use-cases/${id}`)}
      />
    </div>
  );
}
