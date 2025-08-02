import { useQuery } from "@tanstack/react-query";

export const useGetTools = () =>
  useQuery({
    queryKey: ["tools"],
    queryFn: async () => {
      const response = await fetch("/api/tools/get");
      if (!response.ok) {
        throw new Error("Failed to fetch tools");
      }
      return response.json();
    },
  });
