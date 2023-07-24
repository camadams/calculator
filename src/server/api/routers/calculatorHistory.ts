import { clerkClient } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/dist/types/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, privateProcedure, publicProcedure } from "~/server/api/trpc";


const filt = (user: User) => {
  return {
    id: user.id,
    username: user.username,
    profilePictureUrl: user.profileImageUrl
  }
}

export const calculatorHistoryRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const history = await ctx.prisma.calculatorHistory.findMany({ take: 100, });
    const users = (await clerkClient.users.getUserList({
      userId: history.map((hist) => hist.userId),
      limit: 100,
    })).map(filt);

    return history.map((hist) => {
      const user = users.find((user) => user.id === hist.userId);
      if (!user) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "User for history not found" });
      return { hist, user: user, }
    });
  }),
  getByUserId: privateProcedure
    .query(async ({ ctx, input }) => {
      const history = await ctx.prisma.calculatorHistory.findMany();
      console.log("history from hist router: ", history);
      return history.map((hist) => {
        // const user = users.find((user) => user.id === hist.userId);
        // if (!user) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "User for history not found" });
        // return { hist, user: user, }
        return { hist }
      });
    }),


  getHistByUserId: publicProcedure
    .input(z.object({ userId: z.string(), }))
    .query(async ({ ctx, input }) => {
      console.log("########### userId in calculatorHistoryRouter: ", input.userId)
      const hist = await ctx.prisma.calculatorHistory.findMany({
        where: { userId: input.userId, },
        take: 100,
        orderBy: [{ createdAt: "desc" }],
      });
      return hist;

      // const users = (await clerkClient.users.getUserList({
      //   userId: a.map((hist) => hist.userId),
      //   limit: 100,
      // })).map(filt);

      // return a.map((hist) => {
      //   const user = users.find((user) => user.id === hist.userId);
      //   if (!user) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "User for history not found" });
      //   return hist
      // });
    }),

  create: privateProcedure
    .input(z.object({ content: z.string(), }))
    .mutation(async (opts) => {
      const userId = opts.ctx.userId;
      const hist = await opts.ctx.prisma.calculatorHistory.create({
        data: {
          userId,
          content: opts.input.content,
        }
      });
    }),
});
