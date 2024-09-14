 
"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod" 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SignUpValidation } from "@/lib/validation"
import Loader from "@/components/shared/Loader"
import { Link, useNavigate } from "react-router-dom"

import { useToast } from "@/components/ui/use-toast"
import { useCreateUserAccountMutation , useSignInAccount} from "@/lib/react-query/queriesandMuntations"
import { useUserContext } from "@/context/AuthContext"

 




const SignUp = () => {
  const { toast } = useToast()
  const {checkAuthUser, isPending: isUserLoading} = useUserContext();
  const navigate = useNavigate();

  
  const {mutateAsync: createUserAccount, isPending: isCreatingAccount } = useCreateUserAccountMutation();

  const {mutateAsync: signInAccount, isPending: isSigningIn} = useSignInAccount();

    // 1. Define  form.
    const form = useForm<z.infer<typeof SignUpValidation>>({
      resolver: zodResolver(SignUpValidation),
      defaultValues: {
        username: "",
        email: "",
        password: ""
      },
    })
   
    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof SignUpValidation>) {
      
      const newUser = await createUserAccount(values)

      console.log("newUser:", newUser)

      if (!newUser){
       return  toast({
          title: "Sign up failed. Please try again!!"
        })
      }

      const session = await signInAccount({
        username: values.username,
        password: values.password,

      })
      console.log("Session:", session);
      if(!session){
        return toast({title: 'sign in failed. Please try again.'})

      }
      const isLoggedIn = await checkAuthUser();
      console.log("isLoggedIn: " ,isLoggedIn)
      if(isLoggedIn){
        form.reset();
        navigate('/')
      }else{
        return toast({ title: "Sign up failed. Please try again."})
      }
    
      
    }

  



    return (
      <Form {...form}>

        <div className="sm:w-420 flex-center flex-col">
          <h2 className="h2-bold">VIDBOX</h2>

          <h3 className="h3-bold md:h2-bold pt-5 sm:pt-12">Create new account here</h3>

          <p className="text-light-3 small-medium md:based-regular mt-2">
            To use VIDBOX, please enter your details here</p>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">

      

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
                <FormLabel className="shad-form_label">Email</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
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
                <FormLabel>password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary">
            {
               isCreatingAccount ? (
                <div className="flex-center gap-2">
                  <Loader /> Loading...

                </div>
              ): "Sign up"
            }
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2">
          Already have an account?
          <Link to="/sign-in" className="text-primary-500 text-small-semibold ml-1">Sign in</Link>
          </p>
        </form>

        </div>
      </Form>
    )
    
  
}

export default SignUp