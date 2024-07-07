import { toastConfig } from "react-simple-toasts";
import "react-simple-toasts/dist/theme/dark.css";

import ColorDropper from "./ColorDropper/ColorDropper";

toastConfig({ theme: "dark" });

export default function App() {
  return <ColorDropper />;
}
