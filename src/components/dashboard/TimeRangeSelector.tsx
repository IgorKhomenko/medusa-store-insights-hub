
import React, { useState } from 'react';
import { CalendarRange, ChevronDown, Clock } from 'lucide-react';
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
import { Input } from '@/components/ui/input';

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
  const [date, setDate] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: customRange?.from || undefined,
    to: customRange?.to || undefined,
  });
  
  const [fromTime, setFromTime] = useState(
    customRange?.from ? format(customRange.from, 'HH:mm') : '00:00'
  );
  
  const [toTime, setToTime] = useState(
    customRange?.to ? format(customRange.to, 'HH:mm') : '23:59'
  );

  const handleSelectChange = (newValue: TimeRange) => {
    if (newValue !== 'custom') {
      onChange(newValue);
    } else {
      // When selecting custom, open the date picker but don't change yet
      onChange('custom', date.from && date.to ? { 
        from: combineDateTime(date.from, fromTime), 
        to: combineDateTime(date.to, toTime)
      } : undefined);
    }
  };

  const combineDateTime = (date: Date, timeString: string): Date => {
    const [hours, minutes] = timeString.split(':').map(Number);
    const newDate = new Date(date);
    newDate.setHours(hours, minutes, 0, 0);
    return newDate;
  };

  const handleDateSelect = (range: { from: Date | undefined; to: Date | undefined }) => {
    setDate(range);
    if (range.from && range.to) {
      onChange('custom', { 
        from: combineDateTime(range.from, fromTime), 
        to: combineDateTime(range.to, toTime) 
      });
    }
  };

  const handleFromTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromTime(e.target.value);
    if (date.from && date.to) {
      onChange('custom', {
        from: combineDateTime(date.from, e.target.value),
        to: combineDateTime(date.to, toTime)
      });
    }
  };

  const handleToTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToTime(e.target.value);
    if (date.from && date.to) {
      onChange('custom', {
        from: combineDateTime(date.from, fromTime),
        to: combineDateTime(date.to, e.target.value)
      });
    }
  };

  // Format the date range for display
  const formatDateRange = () => {
    if (value !== 'custom' || !date.from || !date.to) {
      return "Select dates";
    }
    return `${format(date.from, 'MMM d, yyyy')} ${fromTime} - ${format(date.to, 'MMM d, yyyy')} ${toTime}`;
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
            <div className="p-3 pointer-events-auto">
              <Calendar
                mode="range"
                selected={date}
                onSelect={handleDateSelect}
                numberOfMonths={2}
                className="mb-4"
              />
              
              <div className="flex flex-col sm:flex-row gap-4 mt-4 border-t pt-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm font-medium">Start Time</span>
                  </div>
                  <Input
                    type="time"
                    value={fromTime}
                    onChange={handleFromTimeChange}
                    className="w-full"
                  />
                </div>
                
                <div className="flex-1 space-y-2">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm font-medium">End Time</span>
                  </div>
                  <Input
                    type="time"
                    value={toTime}
                    onChange={handleToTimeChange}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};

export default TimeRangeSelector;
