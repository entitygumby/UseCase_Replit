import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import StatusBadge from "./StatusBadge";
import { Badge } from "@/components/ui/badge";

interface UseCase {
  id: string;
  name: string;
  division: string;
  category: string;
  status: string;
  solutionType: string;
  teamContact: string | null;
  description: string | null;
  impact: string | null;
  priorityTier: string | null;
}

interface UseCaseTableProps {
  useCases: UseCase[];
  onRowClick?: (id: string) => void;
}

export default function UseCaseTable({ useCases, onRowClick }: UseCaseTableProps) {
  return (
    <div className="border-2 border-foreground/20 rounded-md">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-b-foreground/20">
            <TableHead className="font-semibold border-r border-r-foreground/20">Name</TableHead>
            <TableHead className="font-semibold border-r border-r-foreground/20">Division</TableHead>
            <TableHead className="font-semibold border-r border-r-foreground/20">Category</TableHead>
            <TableHead className="font-semibold border-r border-r-foreground/20">Status</TableHead>
            <TableHead className="font-semibold border-r border-r-foreground/20">Type</TableHead>
            <TableHead className="font-semibold border-r border-r-foreground/20">Team Contact</TableHead>
            <TableHead className="font-semibold">Priority</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {useCases.map((useCase) => (
            <TableRow
              key={useCase.id}
              className="cursor-pointer hover-elevate border-b-foreground/20"
              onClick={() => onRowClick?.(useCase.id)}
              data-testid={`row-usecase-${useCase.id}`}
            >
              <TableCell className="font-medium max-w-xs border-r border-r-foreground/20">
                <div className="truncate">{useCase.name}</div>
              </TableCell>
              <TableCell className="text-muted-foreground border-r border-r-foreground/20">{useCase.division}</TableCell>
              <TableCell className="text-muted-foreground text-sm border-r border-r-foreground/20">{useCase.category}</TableCell>
              <TableCell className="border-r border-r-foreground/20">
                <StatusBadge status={useCase.status} />
              </TableCell>
              <TableCell className="border-r border-r-foreground/20">
                <Badge variant="outline" className="font-normal">
                  {useCase.solutionType}
                </Badge>
              </TableCell>
              <TableCell className="text-muted-foreground border-r border-r-foreground/20">{useCase.teamContact || 'N/A'}</TableCell>
              <TableCell>
                {useCase.priorityTier && (
                  <Badge variant="secondary" className="font-normal">
                    {useCase.priorityTier}
                  </Badge>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
