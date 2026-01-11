import { Slot, usePathname, useRouter } from "expo-router";
import { ThemeProvider } from "../components/ThemeContext";
import ScreenLoader from "../components/ScreenLoader";
import { useEffect, useState } from "react";

export default function RootLayout() {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Show loader on route change (except first load)
    if (pathname !== "/") {
      setLoading(true);
      const t = setTimeout(() => {
        setLoading(false);
      }, 1000);
      return () => clearTimeout(t);
    }
  }, [pathname]);

  return (
    <ThemeProvider>
      {loading && <ScreenLoader />}
      <Slot />
    </ThemeProvider>
  );
}
