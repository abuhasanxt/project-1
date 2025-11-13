"use client"

import { useState } from "react"

export default function WorkSchedulePage() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 10))

  const handlePreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const generateMonthData = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const days = []

    // Fill in days before month starts
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push({
        date: new Date(),
        dayType: "off",
        role: "",
        timeSlot: "",
        status: { label: "", type: "not-required" },
      })
    }

    // Generate data for each day in month
    const statusCycle = [
      { label: "Attended", type: "attended", details: ["Overtime"] },
      { label: "Attended", type: "attended", details: ["Overtime"] },
      { label: "Attended", type: "attended", details: ["Overtime"] },
      { label: "Attended", type: "attended", details: ["Overtime"] },
      { label: "Incomplete", type: "incomplete", details: ["Missing Check-out", "Remaining Hours"] },
      { label: "Attended", type: "attended", details: ["Overtime"] },
      { label: "Attendance Not Recorded", type: "incomplete", details: ["Missing Check-in"] },
      { label: "Shift Not Started", type: "shift-not-started" },
      { label: "Shift Not Started", type: "shift-not-started" },
    ]

    for (let day = 1; day <= lastDay.getDate(); day++) {
      const dateObj = new Date(year, month, day)
      const isOffDay = dateObj.getDay() === 6 && day === 1

      days.push({
        date: dateObj,
        dayType: isOffDay ? "off" : "work",
        role: isOffDay ? "CASHIER" : "CASHIER",
        timeSlot: isOffDay ? "" : "04:00 PM - 12:00 AM",
        status: statusCycle[(day - 1) % statusCycle.length],
      })
    }

    return days
  }

  const monthData = generateMonthData()
  const weeks = []

  for (let i = 0; i < monthData.length; i += 7) {
    weeks.push(monthData.slice(i, i + 7))
  }

  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  const getStatusColor = (type) => {
    switch (type) {
      case "attended":
        return "bg-teal-50 text-teal-700"
      case "incomplete":
        return "bg-orange-50 text-orange-700"
      case "not-required":
        return "bg-purple-50 text-purple-600"
      case "shift-not-started":
        return "bg-purple-50 text-purple-600"
      default:
        return "bg-gray-50 text-gray-700"
    }
  }

  const getDayBadgeColor = (dayType) => {
    return dayType === "work" ? "bg-teal-100 text-teal-700" : "bg-blue-100 text-blue-600"
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-blue-600">Workshfit Schedule</h1>
            <span className="text-gray-500 text-sm">Fatima Abdullah Al-Mutairi Al-Mutar</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600 font-medium">
              {currentMonth.toLocaleDateString("en-US", { month: "2-digit", year: "numeric" })}
            </span>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition">
              <span className="text-sm text-gray-600">📅</span>
            </button>
          </div>
        </div>
      </header>

      <div className="p-8">
        {/* Month Navigation */}
        <div className="mb-8 flex items-center justify-center gap-4">
          <button onClick={handlePreviousMonth} className="p-2 hover:bg-gray-100 rounded-lg transition">
            <span className="text-gray-600">◀</span>
          </button>

          <h2 className="text-3xl font-bold text-blue-600 min-w-48 text-center">
            {currentMonth.toLocaleDateString("en-US", { month: "short", year: "numeric" })}
          </h2>

          <button onClick={handleNextMonth} className="p-2 hover:bg-gray-100 rounded-lg transition">
            <span className="text-gray-600">▶</span>
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          {/* Day names header */}
          <div className="grid grid-cols-7 bg-white border-b border-gray-200">
            {dayNames.map((day) => (
              <div key={day} className="p-4 text-center font-bold text-gray-900 bg-gray-50">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar cells */}
          <div className="grid grid-cols-7">
            {weeks.map((week, weekIndex) =>
              week.map((day, dayIndex) => {
                const isEmptyDay = !day.role

                return (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    className={`min-h-48 border border-gray-200 p-4 flex flex-col ${isEmptyDay ? "bg-gray-50" : "bg-white"}`}
                  >
                    {!isEmptyDay && (
                      <>
                        <div className="flex items-start justify-between mb-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${getDayBadgeColor(day.dayType)}`}
                          >
                            {day.date.getDate()}
                          </div>
                        </div>

                        <div className="text-xs text-gray-500 mb-1">
                          {day.date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                        </div>

                        <div className="text-xs font-semibold text-gray-900 mb-2">
                          {day.dayType === "work" ? "Work Day" : "Off Day"}
                        </div>

                        <div className="text-xs font-bold text-gray-900 mb-2">{day.role}</div>

                        {day.timeSlot && <div className="text-xs text-gray-600 mb-3">{day.timeSlot}</div>}

                        <div className="space-y-2 flex-1">
                          <div
                            className={`text-xs font-semibold px-2 py-1 rounded text-center ${getStatusColor(day.status.type)}`}
                          >
                            {day.status.label}
                          </div>

                          {day.status.details && day.status.details.length > 0 && (
                            <div className="space-y-1">
                              {day.status.details.map((detail, idx) => (
                                <div
                                  key={idx}
                                  className={`text-xs px-2 py-1 rounded text-center ${getStatusColor(day.status.type)}`}
                                >
                                  {detail}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        <button className="mt-3 flex justify-center p-1 hover:bg-gray-100 rounded transition">
                          <span className="text-blue-600">✎</span>
                        </button>
                      </>
                    )}
                  </div>
                )
              }),
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
