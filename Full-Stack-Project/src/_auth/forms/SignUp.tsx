import { z } from "zod"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { signUpValidation } from "@/lib/Validation"
import Loader from "@/components/shared/Loader"
import { Link } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"
import { useCreateUserAccount, useSignInAccount } from "@/lib/React-query/queriesAndmutation"



const SignUp = () => {

  const { toast } = useToast()

  const {mutateAsync: createUserAccount, isLoading: isCreatingUser} = useCreateUserAccount();

  const {mutateAsync: signInAccount, isLoading: isSigningIn} = useSignInAccount();

  const form = useForm<z.infer<typeof signUpValidation>>({
    resolver: zodResolver(signUpValidation),
    defaultValues: {
      name: " ",
      username: " ",
      email: " ",
      password: " ",
    },
  })
   async function onSubmit(values: z.infer<typeof signUpValidation>) {
    const newUser = await createUserAccount(values)
  
     if(!newUser){
      return   toast({
        title: "Sign up failed. Please try again.",
      })
     }

     const session = await signInAccount({
      email: values.email,
      password: values.password,

     })

     if(!session){
      return toast({title: "Sign in failed. Please  try again."})
     }

     

  }
  return (
    <div>
       <Form {...form}>
        <div className="sm:w-420 flex-center flex-col">
         <img src="/assets/images/logo.svg" alt="logo" />
         <h2 className="h3-bold md:h2-bold pt-5 sm:pt-5">Create a new account</h2>
         <p className="text-light-3 small-medium md:base-regular mt-2">To use Snapgram enter you account details</p>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" flex flex-col gap-3 w-full mt-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type="text" className="shad-input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input type="text" className="shad-input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" className="shad-input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" className="shad-input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="shad-button_primary">
              {isCreatingUser ? (
                <div className="flex-center gap-2">
                   <Loader />Loading...
                </div>
              ) : "Sign Up"}
            </Button>
            <p className="text-small-regular text-light-2 text-center mt-2 ">
               Already have an account? 
               <Link to={"/sign-in"} className="text-primary-500 text-small-semibold ml-1">Login in</Link>
            </p>
          </form>
      </div>
    </Form>
    </div>
  )
}

export default SignUp