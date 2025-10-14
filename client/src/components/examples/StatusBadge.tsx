import StatusBadge from '../StatusBadge';

export default function StatusBadgeExample() {
  return (
    <div className="flex gap-2">
      <StatusBadge status="Live" />
      <StatusBadge status="Developing" />
      <StatusBadge status="Scoping" />
    </div>
  );
}
