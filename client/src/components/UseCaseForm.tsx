import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  insertUseCaseSchema, 
  type InsertUseCase, 
  divisions, 
  categories, 
  statuses, 
  implementationPhases, 
  impacts 
} from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface UseCaseFormProps {
  defaultValues?: Partial<InsertUseCase>;
  onSubmit: (data: InsertUseCase) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export default function UseCaseForm({
  defaultValues,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: UseCaseFormProps) {
  const form = useForm<InsertUseCase>({
    resolver: zodResolver(insertUseCaseSchema),
    defaultValues: defaultValues || {
      name: "",
      division: "",
      category: "",
      status: "New",
      solutionType: "",
      description: "",
      benefits: "",
      impact: "",
      weeklySavings: undefined,
      complexity: "",
      techStack: [],
      phase: "",
      teamContact: "",
      effortEstimate: "",
      dependencies: "",
      milestones: "",
      riskAssessment: "",
      successCriteria: "",
    },
  });

  const handleSubmit = (data: InsertUseCase) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">General Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Use Case Name *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., BBSW/FX Rate Collection"
                      {...field}
                      data-testid="input-name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="division"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Division *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger data-testid="select-division">
                        <SelectValue placeholder="Select division" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {divisions.map((division) => (
                        <SelectItem key={division} value={division}>
                          {division}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger data-testid="select-category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger data-testid="select-status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {statuses.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="solutionType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Solution Type *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger data-testid="select-solution-type">
                        <SelectValue placeholder="Select solution type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="AI Agent">AI Agent</SelectItem>
                      <SelectItem value="AI Prompt">AI Prompt</SelectItem>
                      <SelectItem value="Automation">Automation</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phase"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Implementation Phase</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value || undefined}>
                    <FormControl>
                      <SelectTrigger data-testid="select-phase">
                        <SelectValue placeholder="Select phase" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {implementationPhases.map((phase) => (
                        <SelectItem key={phase} value={phase}>
                          {phase}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="teamContact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Team Contact</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Sarah Chen"
                      {...field}
                      value={field.value || ""}
                      data-testid="input-contact"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">Business Case</h2>
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the use case, what it does, and how it works..."
                      className="min-h-[100px]"
                      {...field}
                      value={field.value || ""}
                      data-testid="textarea-description"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="benefits"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Benefits</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What are the key benefits and value delivered?"
                      className="min-h-[80px]"
                      {...field}
                      value={field.value || ""}
                      data-testid="textarea-benefits"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="impact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Impact</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value || undefined}>
                      <FormControl>
                        <SelectTrigger data-testid="select-impact">
                          <SelectValue placeholder="Select impact level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {impacts.map((impact) => (
                          <SelectItem key={impact} value={impact}>
                            {impact}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="weeklySavings"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weekly Time Savings (hours)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g., 5"
                        {...field}
                        value={field.value ?? ""}
                        onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                        data-testid="input-savings"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">Technical Details</h2>
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="complexity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Complexity</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value || undefined}>
                    <FormControl>
                      <SelectTrigger data-testid="select-complexity">
                        <SelectValue placeholder="Select complexity level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="techStack"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tech Stack (comma-separated)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Python, Azure Functions, SharePoint"
                      value={field.value?.join(", ") || ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(value ? value.split(",").map(s => s.trim()).filter(Boolean) : []);
                      }}
                      data-testid="input-techstack"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="effortEstimate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Effort Estimate</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., 2-4 weeks"
                      {...field}
                      value={field.value || ""}
                      data-testid="input-effort"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dependencies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dependencies</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What are the key dependencies and requirements?"
                      className="min-h-[80px]"
                      {...field}
                      value={field.value || ""}
                      data-testid="textarea-dependencies"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="milestones"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Milestones</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Key milestones and deliverables..."
                      className="min-h-[80px]"
                      {...field}
                      value={field.value || ""}
                      data-testid="textarea-milestones"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">Risk & Success</h2>
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="riskAssessment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Risk Assessment</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What are the key risks and mitigation strategies?"
                      className="min-h-[80px]"
                      {...field}
                      value={field.value || ""}
                      data-testid="textarea-risk"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="successCriteria"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Success Criteria</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="How will success be measured?"
                      className="min-h-[80px]"
                      {...field}
                      value={field.value || ""}
                      data-testid="textarea-success"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </Card>

        <div className="flex gap-4 justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
            data-testid="button-cancel"
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting} data-testid="button-submit">
            {isSubmitting ? "Saving..." : "Save Use Case"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
