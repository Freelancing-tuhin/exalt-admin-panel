import { useEffect, useMemo } from "react";
import { Layout } from "../layout/Layout";
import Navbar from "../../components/main/navbar/Navbar";
import { useHeading } from "../../contexts/headingContext";
import { GradientHeader } from "../../components/shared/gradientHeader/GradientHedaer";
import { HolidayStats } from "../../components/main/holiday/HolidayStats/HolidayStats";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import { UpcomingHolidays } from "../../components/main/holiday/holidayCard/UpcomingHolidays";
import { HolidayList } from "../../components/main/holiday/holidayLists/HolidayList";
import { HolidayGrid } from "../../components/main/holiday/holidayGrid/HolidayGrid";

export const Holidays = () => {
  const { setHeading } = useHeading();

  // Generate 6 months: 3 previous, current, 2 next
  const { months, data } = useMemo(() => {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const now = new Date();
    const currentMonth = now.getMonth();

    const selectedMonths = Array.from({ length: 6 }, (_, i) => {
      const idx = (currentMonth - 3 + i + 12) % 12;
      return monthNames[idx];
    });

    // Dummy event data
    const dummyData = [8, 12, 15, 10, 18, 22];

    return { months: selectedMonths, data: dummyData };
  }, []);

  const eventTrendOptions: ApexOptions = {
    chart: { type: "bar", toolbar: { show: false } },
    xaxis: {
      categories: months,
      labels: { style: { colors: "#4b5563", fontSize: "12px" } },
    },
    plotOptions: {
      bar: { borderRadius: 6, columnWidth: "55%" },
    },
    dataLabels: { enabled: false },
    fill: {
      type: [
        "gradient",
        "gradient",
        "gradient",
        "gradient",
        "gradient",
        "solid",
      ],
      gradient: {
        shade: "light",
        type: "vertical",
        gradientToColors: ["#a78bfa"], // blue fades at top
        inverseColors: false,
        opacityFrom: 0.95,
        opacityTo: 0.85,
        stops: [0, 70, 100], // purple covers 70%, then blue
      },
    },
    colors: [
      "#a78bfa", // gradient base (purple)
      "#a78bfa",
      "#a78bfa",
      "#a78bfa",
      "#a78bfa",
      "#f87171", // 🔴 solid last bar
    ],
    grid: { strokeDashArray: 4 },
  };

  const eventTrendSeries = [{ name: "Events Posted", data }];

  useEffect(() => {
    setHeading("Holiday");
  }, [setHeading]);

  return (
    <Layout>
      <Navbar />
      <div className="p-6">
        <GradientHeader title="Holidays" />
        <div className="2xl:flex mt-8 gap-6">
          {/* Stats Section */}
          <div className="2xl:w-5/7">
            <HolidayStats />
            <UpcomingHolidays />
          </div>

          {/* Chart Section */}
          <div className="2xl:w-2/7">
            <div className="bg-gray-50 rounded-xl border border-gray-200 p-4">
              <div className="flex justify-between mb-3">
                <h3 className="font-semibold">Events Posted (6-Month View)</h3>
                <select className="border rounded text-sm px-2 py-1">
                  <option>2025</option>
                  <option>2024</option>
                </select>
              </div>
              <Chart
                options={eventTrendOptions}
                series={eventTrendSeries}
                type="bar"
                height={300}
              />
            </div>
          </div>
        </div>
        <HolidayList />
        <HolidayGrid />
      </div>
    </Layout>
  );
};
