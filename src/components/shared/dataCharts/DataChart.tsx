import Chart from "react-apexcharts";

export const DataChart = () => {
  // Pie chart data for gun control question
  const pieChartOptions = {
    chart: {
      type: "pie" as const,
      height: 300,
    },
    labels: ["Democrat", "No difference", "Republican", "Don't know/refused"],
    colors: ["#22D3EE", "#7C3AED", "#EF4444", "#6B7280"],
    legend: {
      position: "bottom" as const,
      fontSize: "12px",
      horizontalAlign: "center" as const,
      itemMargin: {
        horizontal: 10,
        vertical: 5,
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (
        val: number,
        opts: { seriesIndex: number; w: { globals: { labels: string[] } } }
      ) {
        const label = opts.w.globals.labels[opts.seriesIndex];
        const percentage = Math.round(val);
        return `${label} (${percentage}%)`;
      },
      style: {
        fontSize: "11px",
        fontWeight: "500",
      },
    },
    plotOptions: {
      pie: {
        customScale: 0.9,
        donut: {
          size: "0%",
        },
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300,
          },
          legend: {
            position: "bottom" as const,
          },
        },
      },
    ],
  };

  const pieChartSeries = [44, 28, 20, 8];

  // Bar chart data for attack blame question
  const barChartOptions = {
    chart: {
      type: "bar" as const,
      height: 300,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "70%",
        endingShape: "rounded" as const,
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: number) {
        return `${val}%`;
      },
      style: {
        fontSize: "11px",
        colors: ["#fff"],
      },
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: [
        "Lack of gun control",
        "Lapse in security",
        "Political polarization",
        "Incendiary remarks against Trump",
        "Other",
      ],
      labels: {
        style: {
          fontSize: "11px",
        },
        maxHeight: 60,
      },
    },
    yaxis: {
      title: {
        text: "",
      },
      max: 50,
      labels: {
        formatter: function (val: number) {
          return `${val}%`;
        },
      },
    },
    fill: {
      colors: ["#10B981"],
    },
    tooltip: {
      y: {
        formatter: function (val: number) {
          return `${val}%`;
        },
      },
    },
    grid: {
      borderColor: "#e7e7e7",
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5,
      },
    },
  };

  const barChartSeries = [
    {
      name: "Percentage",
      data: [38, 35, 29, 15, 7],
    },
  ];

  return (
    <div className="bg-gray-200 p-6 rounded-lg border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Exalt Visualizations
      </h2>

      <div className="grid grid-cols-2 gap-8">
        {/* Pie Chart - Full Width */}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-4 leading-tight">
            Do Indian Americans think the Democratic or the Republican party is
            doing a better job with the issue of gun control?
          </h3>
          <Chart
            options={pieChartOptions}
            series={pieChartSeries}
            type="pie"
            height={300}
          />
        </div>

        {/* Bar Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-4">
            What do you blame for this attack?
          </h3>
          <Chart
            options={barChartOptions}
            series={barChartSeries}
            type="bar"
            height={300}
          />
          <p className="text-xs text-gray-500 text-center mt-2">
            [Exalt Polling Insights on the Diaspora]
          </p>
        </div>
      </div>
    </div>
  );
};
