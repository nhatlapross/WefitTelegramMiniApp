"use client"

import React, { useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { CalendarIcon } from "lucide-react"

// You might need to adjust the import path for the Button component
import { Button } from "@nextui-org/react"

export default function DateRangePicker({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null])
  const [startDate, endDate] = dateRange

  return (
      <DatePicker
        selectsRange={true}
        startDate={startDate as Date}
        endDate={endDate as Date}
        onChange={(update: [Date | null, Date | null]) => {
          setDateRange(update)
        }}
        customInput={
          <Button
            variant="bordered"
            className="w-full justify-center text-left text-grey-800"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {startDate ? (
              endDate ? (
                <>
                  {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
                </>
              ) : (
                startDate.toLocaleDateString()
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        }
        monthsShown={1}
        calendarClassName="bg-gray-100 border border-gray-200 rounded-md"
        className="w-full"
        wrapperClassName="w-full"
      />
  )
}