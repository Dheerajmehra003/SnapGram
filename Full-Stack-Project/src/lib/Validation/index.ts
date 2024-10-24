import { z } from "zod"

 export  const signUpValidation = z.object({
    name: z.string().min(2,{message: 'To Short'}),
    username: z.string().min(2, {message: 'To Short'}),
    email: z.string().email(),
    password: z.string().min(8,{message: 'Password must be atleast 8 characters'})
  })