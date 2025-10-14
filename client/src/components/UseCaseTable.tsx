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
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="font-semibold">Name</TableHead>
            <TableHead className="font-semibold">Division</TableHead>
            <TableHead className="font-semibold">Category</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="font-semibold">Type</TableHead>
            <TableHead className="font-semibold">Team Contact</TableHead>
            <TableHead className="font-semibold">Priority</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {useCases.map((useCase) => (
            <TableRow
              key={useCase.id}
              className="cursor-pointer hover-elevate"
              onClick={() => onRowClick?.(useCase.id)}
              data-testid={`row-usecase-${useCase.id}`}
            >
              <TableCell className="font-medium max-w-xs">
                <div className="truncate">{useCase.name}</div>
              </TableCell>
              <TableCell className="text-muted-foreground">{useCase.division}</TableCell>
              <TableCell className="text-muted-foreground text-sm">{useCase.category}</TableCell>
              <TableCell>
                <StatusBadge status={useCase.status} />
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="font-normal">
                  {useCase.solutionType}
                </Badge>
              </TableCell>
              <TableCell className="text-muted-foreground">{useCase.teamContact || 'N/A'}</TableCell>
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
