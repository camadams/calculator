<<<<<<< HEAD
import { exampleRouter } from "~/server/api/routers/example";
=======
import { calculatorHistoryRouter } from './routers/calculatorHistory';
>>>>>>> def2284128bf66f79faf8c549edd826a4e31f69c
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
<<<<<<< HEAD
  example: exampleRouter,
=======
  calculatorHistory: calculatorHistoryRouter,
>>>>>>> def2284128bf66f79faf8c549edd826a4e31f69c
});

// export type definition of API
export type AppRouter = typeof appRouter;
