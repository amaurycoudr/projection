import { initContract } from "@ts-rest/core";
import { z } from "zod";

const c = initContract();

export const contract = c.router({
  healthCheck: {
    path: "/health",
    method: "GET",
    responses: { 200: z.object({ status: z.string() }) },
  },
});
