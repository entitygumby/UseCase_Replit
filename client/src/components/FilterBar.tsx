import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
  divisionFilter: string;
  onDivisionChange: (value: string) => void;
  typeFilter: string;
  onTypeChange: (value: string) => void;
}

export default function FilterBar({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  divisionFilter,
  onDivisionChange,
  typeFilter,
  onTypeChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <div className="relative flex-1 min-w-[300px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search use cases..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
          data-testid="input-search"
        />
      </div>

      <Select value={statusFilter} onValueChange={onStatusChange}>
        <SelectTrigger className="w-[180px]" data-testid="select-status">
          <SelectValue placeholder="All Statuses" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          <SelectItem value="live">Live</SelectItem>
          <SelectItem value="developing">Developing</SelectItem>
          <SelectItem value="scoping">Scoping</SelectItem>
        </SelectContent>
      </Select>

      <Select value={divisionFilter} onValueChange={onDivisionChange}>
        <SelectTrigger className="w-[200px]" data-testid="select-division">
          <SelectValue placeholder="All Divisions" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Divisions</SelectItem>
          <SelectItem value="real estate sydney">Real Estate Sydney</SelectItem>
          <SelectItem value="transaction management">Transaction Management</SelectItem>
          <SelectItem value="finance">Finance</SelectItem>
          <SelectItem value="legal">Legal</SelectItem>
        </SelectContent>
      </Select>

      <Select value={typeFilter} onValueChange={onTypeChange}>
        <SelectTrigger className="w-[180px]" data-testid="select-type">
          <SelectValue placeholder="All Types" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="ai agent">AI Agent</SelectItem>
          <SelectItem value="ai prompt">AI Prompt</SelectItem>
          <SelectItem value="automation">Automation</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
