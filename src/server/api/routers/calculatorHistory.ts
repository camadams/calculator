import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const calculatorHistoryRouter = createTRPCRouter({
   getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.calculatorHistory.findMany();
  }),
});
