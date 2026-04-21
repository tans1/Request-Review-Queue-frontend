import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export type RequestFilters = {
  status: string;
  priority: string;
  submittedDate: string;
  owner: string;
};

type FiltersProps = {
  onFiltersChange: (filters: RequestFilters) => void;
};

const INITIAL_FILTERS: RequestFilters = {
  status: "",
  priority: "",
  submittedDate: "",
  owner: "",
};

type FilterKey = "status" | "priority" | "submittedDate" | "owner";

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default function Filters({ onFiltersChange }: FiltersProps) {
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const datePickerRef = useRef<HTMLDivElement>(null);

  const updateFilters = (nextFilters: RequestFilters) => {
    setFilters(nextFilters);
    onFiltersChange(nextFilters);
  };

  const handleFilterChange = (
    key: FilterKey,
    value: RequestFilters[FilterKey],
  ) => {
    updateFilters({
      ...filters,
      [key]: value,
    });
  };

  const handleDateSelect = (date?: Date) => {
    setSelectedDate(date);

    updateFilters({
      ...filters,
      submittedDate: date ? formatDate(date) : "",
    });

    setIsCalendarOpen(false);
  };

  const handleClear = () => {
    setSelectedDate(undefined);
    setIsCalendarOpen(false);
    updateFilters(INITIAL_FILTERS);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!datePickerRef.current?.contains(event.target as Node)) {
        setIsCalendarOpen(false);
      }
    };

    window.addEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div className="flex flex-wrap items-center justify-end gap-2">
      <NativeSelect
        value={filters.status}
        onChange={(event) => handleFilterChange("status", event.target.value)}
        className="w-36 rounded-lg bg-white shadow-sm outline-none border-none">
        <NativeSelectOption value="">All status</NativeSelectOption>
        <NativeSelectOption value="NEW">New</NativeSelectOption>
        <NativeSelectOption value="IN_REVIEW">In review</NativeSelectOption>
        <NativeSelectOption value="NEEDS_INFO">Needs info</NativeSelectOption>
        <NativeSelectOption value="APPROVED">Approved</NativeSelectOption>
        <NativeSelectOption value="REJECTED">Rejected</NativeSelectOption>
      </NativeSelect>

      <NativeSelect
        value={filters.priority}
        onChange={(event) => handleFilterChange("priority", event.target.value)}
        className="w-36 rounded-lg bg-white shadow-sm ">
        <NativeSelectOption value="">All priority</NativeSelectOption>
        <NativeSelectOption value="HIGH_PRIORITY">High</NativeSelectOption>
        <NativeSelectOption value="MEDIUM_PRIORITY">Medium</NativeSelectOption>
        <NativeSelectOption value="LOW_PRIORITY">Low</NativeSelectOption>
      </NativeSelect>

      <NativeSelect
        value={filters.priority}
        onChange={(event) => handleFilterChange("owner", event.target.value)}
        className="w-36 rounded-lg bg-white shadow-sm ">
        <NativeSelectOption value="">All owners</NativeSelectOption>
        {[].map((owner) => (
          <NativeSelectOption value={owner}>{owner}</NativeSelectOption>
        ))}
      </NativeSelect>

      <div className="relative" ref={datePickerRef}>
        <Button
          type="button"
          variant="ghost"
          className="w-36 justify-start bg-white font-normal shadow-sm"
          onClick={() => setIsCalendarOpen(!isCalendarOpen)}>
          <CalendarIcon className="size-4" />
          {filters.submittedDate || "Due date"}
        </Button>

        {isCalendarOpen && (
          <div className="absolute right-0 z-20 mt-2 rounded-lg bg-white p-2 shadow-md">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
            />

            <div className="mt-2 flex justify-end">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => handleDateSelect(undefined)}>
                Clear date
              </Button>
            </div>
          </div>
        )}
      </div>

      <Button
        type="button"
        variant="ghost"
        className="bg-white shadow-sm hover:bg-white"
        onClick={handleClear}>
        Clear
      </Button>
    </div>
  );
}
