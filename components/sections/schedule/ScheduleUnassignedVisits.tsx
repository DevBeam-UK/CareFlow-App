// components/sections/schedule/UnassignedVisits.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge, Button, Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { UnassignedScheduleBlock } from '@/components/ui/schedule/unassigned-schedule-block';

const mockUnassignedVisits = [
  {
    id: '1',
    patientName: 'Dorothy Chen',
    date: 'Friday 4 Aug',
    startTime: '11:00',
    endTime: '12:00',
    type: 'Initial Assessment',
    typeKey: 'initial-assessment',
    reason: 'New Patient',
    reasonKey: 'new-patient',
  },
  {
    id: '2',
    patientName: 'James Okafor',
    date: 'Friday 4 Aug',
    startTime: '13:00',
    endTime: '14:00',
    type: 'Care Visit',
    typeKey: 'care-visit',
    reason: 'Routine',
    reasonKey: 'routine',
  },
  {
    id: '3',
    patientName: 'Edna Morris',
    date: 'Friday 4 Aug',
    startTime: '14:30',
    endTime: '15:30',
    type: 'Medication',
    typeKey: 'medication',
    reason: 'Urgent',
    reasonKey: 'urgent',
  },
  {
    id: '4',
    patientName: 'Robert Hayes',
    date: 'Friday 4 Aug',
    startTime: '10:00',
    endTime: '11:00',
    type: 'Follow-up',
    typeKey: 'follow-up',
    reason: 'Follow-up',
    reasonKey: 'follow-up',
  },
  {
    id: '5',
    patientName: 'Sophie Martinez',
    date: 'Friday 4 Aug',
    startTime: '09:00',
    endTime: '10:00',
    type: 'Review',
    typeKey: 'review',
    reason: 'Routine',
    reasonKey: 'routine',
  },
];

const VISIBLE_COUNT = 3;

function UnassignedVisits() {
  const [showAll, setShowAll] = useState(false);

  const visits = mockUnassignedVisits;
  const totalCount = visits.length;
  const hasMore = totalCount > VISIBLE_COUNT;

  const displayedVisits = showAll 
    ? visits 
    : visits.slice(0, VISIBLE_COUNT);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <motion.div 
      className="w-full max-w-sm h-full"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="w-full max-w-sm h-full">
        <CardHeader>
          <CardTitle>
            <div className="flex items-center gap-x-1">
              <h1>Unassigned</h1>
              <Badge variant="pastel-danger" shape="pill">
                {totalCount}
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="mt-4">
          <motion.div 
            className="space-y-3"
            layout
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30,
              mass: 0.8
            }}
          >
            <AnimatePresence mode="popLayout">
              {displayedVisits.map((visit, index) => (
                <motion.div
                  key={visit.id}
                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                    delay: index * 0.05,
                  }}
                  layout
                >
                  <UnassignedScheduleBlock
                    patientName={visit.patientName}
                    date={visit.date}
                    startTime={visit.startTime}
                    endTime={visit.endTime}
                    type={visit.type}
                    reason={visit.reason}
                    typeKey={visit.typeKey}
                    reasonKey={visit.reasonKey}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </CardContent>
        <CardFooter className="flex items-center justify-center mt-4 bg-white">
          {hasMore ? (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="ghost" 
                onClick={toggleShowAll}
                className="gap-1"
              >
                <motion.span
                  animate={{ rotate: showAll ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {showAll ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </motion.span>
                {showAll ? 'Show Less' : 'View More'}
              </Button>
            </motion.div>
          ) : (
            <Button variant="ghost" disabled className="text-cf-ink-40">
              No more visits
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export default UnassignedVisits;