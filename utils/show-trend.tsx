import TrendDownIcon from "@/components/ui/trend-down-svg";
import TrendNeutralIcon from "@/components/ui/trend-neutral-svg";
import TrendUpIcon from "@/components/ui/trend-up-svg";
import { StatCardTrend } from "@/types/components";

export const showStatTrend = (trend: StatCardTrend) => {
  switch (trend) {
    case "up":
      return <TrendUpIcon />;
    case "down":
      return <TrendDownIcon />;
    case "neutral":
      return <TrendNeutralIcon />;
  }
};
