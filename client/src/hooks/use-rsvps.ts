import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type InsertRsvp } from "@shared/routes"; // Ensure paths match your project structure
import { useToast } from "@/hooks/use-toast";

// GET /api/rsvps
export function useRsvps() {
  return useQuery({
    queryKey: [api.rsvps.list.path],
    queryFn: async () => {
      const res = await fetch(api.rsvps.list.path);
      if (!res.ok) throw new Error("Failed to fetch RSVPs");
      return api.rsvps.list.responses[200].parse(await res.json());
    },
  });
}

// POST /api/rsvps
export function useCreateRsvp() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertRsvp) => {
      // Zod validation is handled by api.rsvps.create.input.parse inside the schema normally,
      // but here we just send the data. The backend will validate.
      const res = await fetch(api.rsvps.create.path, {
        method: api.rsvps.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = api.rsvps.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to submit RSVP");
      }
      return api.rsvps.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.rsvps.list.path] });
      toast({
        title: "RSVP Confirmed! 🎉",
        description: "We can't wait to celebrate with you.",
      });
    },
    onError: (error) => {
      toast({
        title: "Uh oh!",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
