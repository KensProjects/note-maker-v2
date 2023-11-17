import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const noteRouter = createTRPCRouter({
  createNote: protectedProcedure

    .input(z.object({ label: z.string(), body: z.string() }))

    .mutation(async ({ ctx, input }) => {

      return ctx.db.note.create({
        data: {
          label: input.label,
          body: input.body,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  getNotes: protectedProcedure.query(async ({ ctx }) => {

    return ctx.db.note.findMany({
      where: { createdById: ctx.session.user.id },
    });
  }),

  editNote: protectedProcedure

    .input(z.object({ id: z.string(), label: z.string(), body: z.string() }))

    .mutation(async ({ ctx, input }) => {

      return ctx.db.note.update({
        where: {
          id: input.id
        },
        data: {
          label: input.label,
          body: input.body
        }
      })
    }),

  deleteNote: protectedProcedure

    .input(z.object({ id: z.string() }))

    .mutation(async ({ ctx, input }) => {

      return ctx.db.note.delete({
        where: { id: input.id }
      })
    }),

  findNote: protectedProcedure
    .input(z.object({ noteId: z.string() }))

    .query(async ({ ctx, input }) => {

      return ctx.db.note.findUnique({
        where: { id: input.noteId }
      })
    }),

  getFilteredNotes: protectedProcedure
    .input(z.object({ searchTerm: z.string(), searchType: z.string() }))
    .query(async ({ ctx, input }) => {

      if (input.searchType === "label") {
        return ctx.db.note.findMany({
          where: {
            label: {
              contains: input.searchTerm
            }
          }
        })
      }
      if (input.searchType === "body") {
        return ctx.db.note.findMany({
          where: {
            body: {
              contains: input.searchTerm
            }
          }
        })
      }
    }),
})

