import profile from './pages/profile_doc';

import appointment from '../DoctorDashbord/pages/check_appointment'
import appointmentapproval from '../DoctorDashbord/pages/appointment_approval'
import Patient_info from '../DoctorDashbord/pages/enetr_patient'
import Patient_records from '../DoctorDashbord/pages/patient_records'
import chat from './pages/chat'
import brainstormy from './pages/brainstormy'
import home from '../DoctorDashbord/pages/home'

import {
  HomeIcon,
  LayoutIcon,
  CalendarIcon,
  InvoiceIcon,
  UserIcon,
  RolesIcon,
  ChatIcon,
  PsychologyIcon
} from "./Icons";

export const SIDEBAR_DATA = [
  
  {
    id: 1,
    name: "home",
    path: "home",
    icon: <LayoutIcon />,
    component: home,
  },
  {
    id: 2,
    name: "Profile",
    path: "layouts",
    icon: <LayoutIcon />,
    component: profile,
  },
  {
    id: 3,
    name: "Appointments",
    path: "calendar",
    icon: <CalendarIcon />,
    component: appointment,
  },
  {
    id: 4,
    name: "Appointments approval",
    path: "check",
    icon: <InvoiceIcon />,
    component: appointmentapproval,
  },
  {
    id: 5,
    name: "Enter Patient data",
    path: "users",
    icon: <UserIcon />,
    component: Patient_info,
  },
  {
    id: 6,
    name: "Patient_Records",
    path: "roles",
    icon: <RolesIcon />,
    component: Patient_records,
  },
  {
    id: 7,
    name: "Chat",
    path: "chat",
    icon: <ChatIcon />,
    component: chat,
  },
  {
    id: 8,
    name: "BrainStormy",
    path: "brainstormy",
    icon: <PsychologyIcon />,
    component: brainstormy,
  },
 
];
