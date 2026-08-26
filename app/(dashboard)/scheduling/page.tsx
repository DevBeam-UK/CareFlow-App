import { SectionPlaceholder } from "shared";

import {
  CalendarWrapper,
  ScheduleStatSection,
  ScheduleHeaderSection,
  AddVisitModal,
  UnassignedVisits,
  EventDetailsModal,
  EditVisitModal,
  ScheduleCarerVisitSwaps,
  CapacityPlanningSection,
} from "sections";
import { mockVisits, convertVisitToEvent } from "utils";
import { useState } from "react";
import "@/components/styles/calendar.css";
import { Visit } from "types";


const mockPatients = [
  { id: '1', name: 'Dorothy Chen' },
  { id: '2', name: 'James Okafor' },
  { id: '3', name: 'Edna Morris' },
];

const mockCarers = [
  { id: '1', name: 'Sarah Johnson' },
  { id: '2', name: 'Michael Chen' },
  { id: '3', name: 'Emma Williams' },
];

export default function Page() {
  const [currentDate, setCurrentDate] = useState(new Date("2024-03-18"));
  const [view, setView] = useState("week");
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [visits, setVisits] = useState(mockVisits);
  const events = convertVisitToEvent(visits);

  const handleSelectEvent = (event: any) => {
    setSelectedEvent(event);
    setEventModalOpen(true);
  };

  const handleAddVisit = () => {
    setModalOpen(true);
  };

  const handleEditVisit = () => {
    setEventModalOpen(false);
    setEditModalOpen(true);
  };

  const handleEditSave = async (data: any) => {
    const updatedVisit = {
      id: selectedEvent?.resource?.id || selectedEvent?.id,
      patientId: data.patientId,
      patientName: mockPatients.find(p => p.id === data.patientId)?.name || '',
      carerId: data.carerId,
      carerName: mockCarers.find(c => c.id === data.carerId)?.name || '',
      date: data.date,
      startTime: data.startTime,
      endTime: data.endTime,
      title: data.title,
      type: data.type,
      address: data.location || '',
      notes: data.notes || '',
      status: data.status,
    };

    setVisits((prev) =>
      prev.map((v) =>
        v.id === updatedVisit.id ? updatedVisit : v
      )
    );

    setSelectedEvent(null);
    await new Promise((resolve) => setTimeout(resolve, 500));
  };

  const calculateEndTime = (startTime: string, durationMinutes: string) => {
    const [hours, minutes] = startTime.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes + parseInt(durationMinutes);
    const endHours = Math.floor(totalMinutes / 60);
    const endMinutes = totalMinutes % 60;
    return `${String(endHours).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`;
  };

  const handleSaveVisit = async (data: any) => {
    const newVisit = {
      id: `visit-${Date.now()}`,
      patientId: data.patientId,
      patientName: mockPatients.find(p => p.id === data.patientId)?.name || '',
      carerId: data.carerId,
      carerName: mockCarers.find(c => c.id === data.carerId)?.name || '',
      date: data.date.toISOString().split('T')[0],
      startTime: data.startTime,
      endTime: calculateEndTime(data.startTime, data.duration),
      title: data.title,
      type: data.type,
      address: data.location || '',
      notes: data.notes || '',
      status: 'scheduled',
    };

    setVisits((prev) => [...prev, newVisit as Visit]);
    await new Promise((resolve) => setTimeout(resolve, 500));
  };

  const handleSelectSlot = (slotInfo: any) => {
    console.log("Selected slot:", slotInfo.start, slotInfo.end);
  };

 

  return (
    <div className="h-screen w-full p-6 bg-cf-surface rounded-2xl border shadow space-y-4 overflow-y-scroll overflow-x-hidden min-w-0 no-scrollbar">
      <ScheduleHeaderSection onAddVisit={handleAddVisit} />
      <ScheduleStatSection />
      
      <div className="w-full flex gap-x-4">
        <div className="flex flex-col gap-y-4 w-full">
          <CalendarWrapper
            events={events}
            view={view}
            onViewChange={setView}
            date={currentDate}
            onDateChange={setCurrentDate}
            onSelectEvent={handleSelectEvent}
            onSelectSlot={handleSelectSlot}
          />
          <CapacityPlanningSection />
        </div>
        <div className="flex flex-col gap-y-4 w-full max-w-sm h-full">
          <UnassignedVisits />
          <ScheduleCarerVisitSwaps 
          
          />
        </div>
        
      </div>

      <EventDetailsModal
        open={eventModalOpen}
        onOpenChange={setEventModalOpen}
        event={selectedEvent}
        onEdit={handleEditVisit}
      />

      <EditVisitModal
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        visit={selectedEvent}
        onSave={handleEditSave}
        patients={mockPatients}
        carers={mockCarers}
      />

      <AddVisitModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        onSave={handleSaveVisit}
        patients={mockPatients}
        carers={mockCarers}
        defaultDate={new Date()}
      />
    </div>
  );
}