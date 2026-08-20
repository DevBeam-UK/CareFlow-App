import { borderColorMap, reasonColorMap, typeColorMap } from "@/utils/type-color-map";

interface UnassignedScheduleBlockProps {
  patientName: string;
  date: string;
  startTime: string;
  endTime: string;
  type: string;
  reason: string;
  typeKey: string;
  reasonKey: string
}


export function UnassignedScheduleBlock({
  patientName,
  date,
  startTime,
  endTime,
  type,
  typeKey,
  reason,
  reasonKey
}: UnassignedScheduleBlockProps) {
  const typeColor = typeColorMap[typeKey] || typeColorMap.default;


  return (
    <div className={`flex flex-col gap-y-1 py-4 px-4 border rounded-xl border-l-4 border-l-cf-red-500`}>
      <h1 className="text-lg font-semibold">{patientName}</h1>
      <div className="flex gap-x-1 text-xs text-cf-ink-60">
        <p>{date}</p>
        <span>-</span>
        <p>
          {startTime} - {endTime}
        </p>
      </div>
      <div className={`flex gap-x-1 text-sm ${typeColor}`}>
        <p >{type}</p>
        <span className="text-cf-ink-60">-</span>
        <p >{reason}</p>
      </div>
    </div>
  );
}