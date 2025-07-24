import { ChangeLog } from "@/types";
import { useEffect, useState } from "react";

const VERSION_KEY = "app_version";

export const useVersionCheck = () => {
  const [showModal, setShowModal] = useState(false);
  const [changeLog, setChangeLog] = useState<ChangeLog | null>(null);

  useEffect(() => {
    async function checkVersion() {
      try {
        const changelog = await fetch("/version.json", {
          cache: "no-cache",
        });
        const data: ChangeLog[] = await changelog.json();
        const currentVersion = localStorage.getItem(VERSION_KEY);
        const latestVersion = data[data.length - 1].version;
        if (currentVersion !== latestVersion) {
          setShowModal(true);
          setChangeLog(data[data.length - 1]);
          localStorage.setItem(VERSION_KEY, latestVersion);
        }
      } catch (error) {
        console.error("Error checking version:", error);
      }
    }
    checkVersion();
  }, []);

  const close = () => {
    setShowModal(false);
  };

  return { showModal, changeLog, close };
};
