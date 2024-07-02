import HomePage from '../../Pages/HelloComponent';
import profile from './pages/profile_pati';
import appointment from './pages/appointment_pati'
import chat from './pages/chat'
import brainstormy from './pages/brainstormy'
import checkappointment from '../UserDashbord/pages/check_appointments'
import personal from '../UserDashbord/pages/personaldata'
import emergrncy from '../UserDashbord/pages/emergencyalert'
import home from '../UserDashbord/pages/home'
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
    name: "Appointment",
    path: "calendar",
    icon: <CalendarIcon />,
    component: appointment,
  },
  {
    id: 4,
    name: "Check Appointment",
    path: "invoice",
    icon: <InvoiceIcon />,
    component: checkappointment,
  },
  {
    id: 5,
    name: "Personal Info",
    path: "users",
    icon: <UserIcon />,
    component: personal,
  },
  {
    id: 6,
    name: "Emergency Alert",
    path: "roles",
    icon: <RolesIcon />,
    component: emergrncy,
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
