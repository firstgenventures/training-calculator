"use client";
import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

export function DatePicker({ value, onChange, label }: { value: string; onChange: (date: string) => void; label: string }) {
  const [open, setOpen] = React.useState(false);
  const dateObj = value ? new Date(value) : undefined;
  return (
    <div className="flex flex-col gap-1">
      <label className="font-medium mb-1">{label}</label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start text-left font-normal"
            onClick={() => setOpen(true)}
            type="button"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateObj ? format(dateObj, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="p-0">
          <Calendar
            mode="single"
            selected={dateObj}
            onSelect={d => { if (d) { onChange(d.toISOString().split('T')[0]); setOpen(false); } }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
