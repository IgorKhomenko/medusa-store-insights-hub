
import React from 'react';
import { CalendarRange, ChevronDown } from 'lucide-react';
import { format } from 'date-fns';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';

export type TimeRange = 
  | 'today'
  | 'last7days'
  | 'last30days'
  | 'lastyear'
  | 'custom';

interface TimeRangeSelectorProps {
  value: TimeRange;
  customRange?: { from: Date; to: Date };
  onChange: (value: TimeRange, customRange?: { from: Date; to: Date }) => void;
}

const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({
  value,
  customRange,
  onChange,
}) => {
  const [date, setDate] = React.useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: customRange?.from || undefined,
    to: customRange?.to || undefined,
  });

  const handleSelectChange = (newValue: TimeRange) => {
    if (newValue !== 'custom') {
      onChange(newValue);
    } else {
      // When selecting custom, open the date picker but don't change yet
      onChange('custom', date.from && date.to ? { from: date.from, to: date.to } : undefined);
    }
  };

  const handleDateSelect = (range: { from: Date | undefined; to: Date | undefined }) => {
    setDate(range);
    if (range.from && range.to) {
      onChange('custom', { from: range.from, to: range.to });
    }
  };

  // Format the date range for display
  const formatDateRange = () => {
    if (value !== 'custom' || !date.from || !date.to) {
      return "Select dates";
    }
    return `${format(date.from, 'MMM d, yyyy')} - ${format(date.to, 'MMM d, yyyy')}`;
  };

  return (
    <div className="flex flex-col md:flex-row gap-2 items-center">
      <Select value={value} onValueChange={handleSelectChange}>
        <SelectTrigger className="w-36">
          <SelectValue placeholder="Select range" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="today">Today</SelectItem>
          <SelectItem value="last7days">Last 7 days</SelectItem>
          <SelectItem value="last30days">Last 30 days</SelectItem>
          <SelectItem value="lastyear">Last year</SelectItem>
          <SelectItem value="custom">Custom range</SelectItem>
        </SelectContent>
      </Select>

      {value === 'custom' && (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "justify-start text-left font-normal",
                !date.from && "text-muted-foreground"
              )}
            >
              <CalendarRange className="mr-2 h-4 w-4" />
              {formatDateRange()}
              <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="range"
              selected={date}
              onSelect={handleDateSelect}
              numberOfMonths={2}
              className="p-3 pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};

export default TimeRangeSelector;
