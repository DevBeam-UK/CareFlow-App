'use client';

import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis, Tooltip } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';


const weeklyActivityData = [
  { day: 'Mon', done: 45, active: 23, missed: 5 },
  { day: 'Tue', done: 52, active: 18, missed: 3 },
  { day: 'Wed', done: 48, active: 25, missed: 6 },
  { day: 'Thu', done: 61, active: 20, missed: 4 },
  { day: 'Fri', done: 55, active: 22, missed: 7 },
  { day: 'Sat', done: 42, active: 28, missed: 8 },
  { day: 'Sun', done: 38, active: 30, missed: 9 },
];

const chartConfig = {
  done: {
    label: 'Done',
    color: 'var(--chart-1)',
  },
  active: {
    label: 'Active',
    color: 'var(--chart-2)',
  },
  missed: {
    label: 'Missed',
    color: 'var(--chart-3)',
  },
} satisfies ChartConfig;

export function DashboardWeeklyActivity() {
  const totalDone = weeklyActivityData.reduce((acc, item) => acc + item.done, 0);
  const totalMissed = weeklyActivityData.reduce((acc, item) => acc + item.missed, 0);

  return (
    <Card className="border-cf-border w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-3 pt-4 px-4">
        <div>
          <CardTitle className="text-sm font-semibold text-cf-ink">
            Weekly Activity
          </CardTitle>
          <CardDescription className="text-xs mt-1">
            Visits overview
          </CardDescription>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm bg-[var(--chart-1)]" />
            <span className="text-xs text-cf-ink-60">Done</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm bg-[var(--chart-2)]" />
            <span className="text-xs text-cf-ink-60">Active</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm bg-[var(--chart-3)]" />
            <span className="text-xs text-cf-ink-60">Missed</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-4 pb-4">
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={weeklyActivityData}
            margin={{ left: 0, right: 0, top: 10, bottom: 0 }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tick={{ fontSize: 12 }}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Bar
              dataKey="done"
              stackId="a"
              fill="var(--color-done)"
              radius={[0, 0, 4, 4]}
              isAnimationActive={true}
            />
            <Bar
              dataKey="active"
              stackId="a"
              fill="var(--color-active)"
              isAnimationActive={true}
            />
            <Bar
              dataKey="missed"
              stackId="a"
              fill="var(--color-missed)"
              radius={[4, 4, 0, 0]}
              isAnimationActive={true}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}