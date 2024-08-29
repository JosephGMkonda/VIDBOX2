import { z } from "zod"

export const SignUpValidation = z.object({
    email: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    username: z.string().min(2, {
      message: "Must be Valid email",
    }),
    password: z.string().min(8, {
      message: "Password must have at least 8 characters or more",
    })
  })

