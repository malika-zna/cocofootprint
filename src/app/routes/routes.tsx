import type { Dispatch, SetStateAction } from "react";
import {
  createBrowserRouter,
  useOutletContext,
} from "react-router";
import { type Device } from "../shared/shared";
import Root from "./root";
import LandingPage from "./landingPage";
import DashboardPage from "./dashboardPage";
import DevicesPage from "./devicesPage";
import SimulationPage from "./simulationPage";
import AboutPage from "./aboutPage";
import NotFound from "./notFound";


export type AppContext = {
  devices: Device[];
  setDevices: Dispatch<SetStateAction<Device[]>>;
  totals: { energy: number; emission: number; cost: number };
};

export function useAppData() {
  return useOutletContext<AppContext>();
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: LandingPage },
      { path: "dashboard", Component: DashboardPage },
      { path: "perangkat", Component: DevicesPage },
      { path: "simulasi", Component: SimulationPage },
      { path: "tentang", Component: AboutPage },
      { path: "*", Component: NotFound },
    ],
  },
]);
