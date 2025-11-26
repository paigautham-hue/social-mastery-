import { usePWA } from "@/hooks/usePWA";
import { WifiOff, Wifi } from "lucide-react";
import { useEffect, useState } from "react";

export function OfflineIndicator() {
  const { isOnline } = usePWA();
  const [showOffline, setShowOffline] = useState(false);
  const [showOnline, setShowOnline] = useState(false);

  useEffect(() => {
    if (!isOnline) {
      setShowOffline(true);
      setShowOnline(false);
    } else {
      // Show "back online" briefly
      if (showOffline) {
        setShowOnline(true);
        setTimeout(() => {
          setShowOnline(false);
        }, 3000);
      }
      setShowOffline(false);
    }
  }, [isOnline, showOffline]);

  if (!showOffline && !showOnline) return null;

  return (
    <div
      className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full shadow-lg flex items-center gap-2 transition-all animate-slide-up ${
        showOffline
          ? "bg-orange-500 text-white"
          : "bg-green-500 text-white"
      }`}
    >
      {showOffline ? (
        <>
          <WifiOff className="h-4 w-4" />
          <span className="text-sm font-medium">You're offline</span>
        </>
      ) : (
        <>
          <Wifi className="h-4 w-4" />
          <span className="text-sm font-medium">Back online!</span>
        </>
      )}
    </div>
  );
}
