"use client";

import { useState } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DateObject from "react-date-object";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { translations } from "@/lib/translations";

interface JalaliMonthPickerProps {
  selectedMonth: string;
  onMonthChange: (month: string) => void;
}

export function JalaliMonthPicker({
  selectedMonth,
  onMonthChange,
}: JalaliMonthPickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDateChange = (date: DateObject | DateObject[] | null) => {
    if (
      date &&
      !Array.isArray(date) &&
      typeof date === "object" &&
      "toDate" in date
    ) {
      const selectedDate = date as DateObject;
      // Convert to Gregorian format for database queries (YYYY-MM)
      const gregorianDate = selectedDate.toDate();
      const year = gregorianDate.getFullYear();
      const month = String(gregorianDate.getMonth() + 1).padStart(2, "0");
      onMonthChange(`${year}-${month}`);
      setIsOpen(false);
    }
  };

  // Convert current selected month to Jalali for display
  const getDisplayMonth = () => {
    try {
      const [year, month] = selectedMonth.split("-");
      const date = new Date(parseInt(year), parseInt(month) - 1, 1);
      const jalaliDate = new DateObject(date).convert(persian, persian_fa);
      return jalaliDate.format("MMMM YYYY");
    } catch {
      return translations.selectMonth;
    }
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2"
      >
        <Calendar className="h-4 w-4" />
        {getDisplayMonth()}
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 z-50 mt-2">
          <DatePicker
            value={new DateObject()
              .set({
                year: parseInt(selectedMonth.split("-")[0]),
                month: parseInt(selectedMonth.split("-")[1]),
                day: 1,
              })
              .convert(persian, persian_fa)}
            onChange={handleDateChange}
            calendar={persian}
            locale={persian_fa}
            onlyMonthPicker
            format="MMMM YYYY"
            style={{
              padding: "8px 12px",
              border: "1px solid #d1d5db",
              borderRadius: "6px",
              fontSize: "14px",
              backgroundColor: "white",
              minWidth: "200px",
            }}
            onClose={() => setIsOpen(false)}
          />
        </div>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
}
