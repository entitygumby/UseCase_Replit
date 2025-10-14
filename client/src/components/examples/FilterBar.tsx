import FilterBar from '../FilterBar';
import { useState } from 'react';

export default function FilterBarExample() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [divisionFilter, setDivisionFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  return (
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
  );
}
