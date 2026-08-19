// app/(dashboard)/patients/page.tsx
"use client";

import React, { useMemo, useState } from "react";
import { PatientsFilterToolbarSection } from "@/components/sections/patients/PatientsFilterToolbarSection";
import { PatientsTable } from "@/components/sections/patients/PatientsTableSection";
import { PatientDrawer } from "@/components/sections/patients/patient-drawer/PatientDrawer";
import PatientStatSection from "@/components/sections/patients/PatientsStatCardsSection";
import { PatientsPageHeader } from "@/components/sections/patients/PatientsPageHeader";
import { CreatePatientModal } from "@/components/sections/patients/patient-create-modal/PatientCreateModal";
import { EditPatientModal } from "@/components/sections/patients/patient-drawer/PatientEditModal";
import {
  EditMedicationModal,
  Medication,
} from "@/components/sections/patients/patient-drawer/PatientUpdateMedsModal";
import { mockPatients } from "@/utils";



export default function PatientsPage() {
  const [activeTab, setActiveTab] = useState<
    "active" | "on-hold" | "high-risk" | "review-date" | "new" | "all"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [patientsData, setPatientsData] = useState(mockPatients);
  const [createModal, setCreateModal] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [medicationModalOpen, setMedicationModalOpen] = useState(false);
  const [patientMeds, setPatientMeds] = useState<Medication[]>([]);

  const handleEditMedications = (medications: Medication[]) => {
    setPatientMeds(medications);
    setMedicationModalOpen(true);
  };

  const handleSaveMedications = async (medications: Medication[]) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setPatientsData((prev) =>
      prev.map((p) =>
        p.id === selectedPatient.id ? { ...p, medications } : p,
      ),
    );
    console.log("Medications updated:", medications);
  };

  const handlePatientCreate = (newPatient: any) => {
    setPatientsData((prev) => [...prev, newPatient]);
    console.log("New patient created:", newPatient);
  };

  const handlePatientUpdate = async (data: Partial<any>) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setPatientsData((prev) =>
      prev.map((p) => (p.id === selectedPatient.id ? { ...p, ...data } : p)),
    );
    console.log("Patient updated:", { id: selectedPatient.id, ...data });
  };

  const filteredPatients = useMemo(() => {
    let result = [...patientsData];

    if (activeTab === "active") {
      result = result.filter((p) => p.status === "active");
    } else if (activeTab === "on-hold") {
      result = result.filter((p) => p.status === "on-hold");
    } else if (activeTab === "new") {
      result = result.filter((p) => p.status === "new");
    } else if (activeTab === "high-risk") {
      result = result.filter((p) => p.risk === "high");
    } else if (activeTab === "review-date") {
      result = result.filter((p) => {
        const today = new Date();
        const nextVisitDate = new Date(p.nextVisit);
        const diffTime = nextVisitDate.getTime() - today.getTime();
        const diffDays = diffTime / (1000 * 60 * 60 * 24);
        return diffDays >= 0 && diffDays <= 7;
      });
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.email.toLowerCase().includes(query),
      );
    }

    return result;
  }, [patientsData, activeTab, searchQuery]);

  const handleExportClick = () => {
    console.log("Export patients");
  };

  const handleFilterClick = () => {
    console.log("something clicked");
  };

  const handleViewPatient = (patient: any) => {
    setSelectedPatient(patient);
    setDrawerOpen(true);
  };

  const handleCreatePatient = () => {
    setCreateModal(true);
  };

  return (
    <div className="h-screen w-full p-6 border rounded-2xl shadow bg-cf-surface space-y-8 overflow-y-scroll no-scrollbar">
      <PatientsPageHeader onCreateClick={handleCreatePatient} />

      <CreatePatientModal
        open={createModal}
        onOpenChange={setCreateModal}
        onPatientCreate={handlePatientCreate}
      />

      <EditPatientModal
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        patient={selectedPatient}
        onSave={handlePatientUpdate}
      />
      <EditMedicationModal
        open={medicationModalOpen}
        onOpenChange={setMedicationModalOpen}
        medications={patientMeds}
        onSave={handleSaveMedications}
        patientName={selectedPatient?.name}
      />
      <PatientStatSection />

      <div className="flex flex-col gap-y-1">
        <PatientsFilterToolbarSection
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onFilterClick={handleFilterClick}
          onExportClick={handleExportClick}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <PatientsTable patients={filteredPatients} onView={handleViewPatient} />
      </div>

      <PatientDrawer
        patient={selectedPatient}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        onEditPatient={setEditModalOpen as any}
        onUpdateMeds={handleEditMedications as any}
        
      />
    </div>
  );
}
