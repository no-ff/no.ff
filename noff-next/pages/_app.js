import "@/styles/globals.css";
import "@/styles/components/Champ.css"
import "@/styles/components/TeamFrame.css"

import Navbar from "./components/Navbar";
export default function App({ Component, pageProps }) {
  return <div>
    <Navbar> </Navbar>
    <Component {...pageProps} />
  </div>;
}
