import { TrendDownIcon, TrendNeutralIcon, TrendUpIcon } from "ui-components";
import type { StatCardTrend } from "types";

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
