import "@/styles/globals.css";
import { AuthProvider } from "@/contexts/authContext";
import SignUp from "./signup";

function App({ Component, pageProps }) {
  return ( 
    <AuthProvider>
      <Component {...pageProps} />

    </AuthProvider>
);
}
export default App; 