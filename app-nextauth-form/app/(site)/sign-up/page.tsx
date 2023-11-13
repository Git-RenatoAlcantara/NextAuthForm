'use client';

import { useRouter } from "next/navigation";
import { FieldValues,SubmitHandler,useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import clsx from "clsx"
import axios from "axios";
import Input from "../components/Input";

const schema = yup.object().shape({
    username: yup.string().min(5).required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).max(32).required(),
    confirmPassword: yup.string().label('confirm password').required()

});

const AuthForm = () => {
    const router = useRouter()
    const { 
        control,
        handleSubmit,
        register,
        formState: {
            errors
        },
        reset
    } = useForm({
        resolver: yupResolver(schema),
    });

  
      const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        axios.post('/api/register', data)
        .then(() =>  router.push('/admin'))
        .catch(() => console.log('Something went wrong!'))
    }

    return (
        <div
            className="
            mt-8
            sm:mx-auto
            sm:w-full
            sm:max-w-md"
        >
            <div 
                className="
                bg-white
                px-4
                py-8
                shadow
                sm:rounded-lg
                sm:px-10"
            >

                <form 
                    className="space-y-6"
                   onSubmit={handleSubmit(onSubmit)}
                >

               <Input 
                 id="username" 
                 label="username" 
                 register={register}
                 errors={errors}
               />   
               
               <Input 
                 id="email" 
                 label="email" 
                 register={register}
                 errors={errors}
               />   
            

                <Input 
                 id="password" 
                 label="password" 
                 register={register}
                 errors={errors}
               />  
                
                <Input 
                 id="confirmPassword" 
                 label="confirmPassword" 
                 register={register}
                 errors={errors}
               />  
            

                <button 
                    type="submit"
                    className="
                    bg-gray-900
                    w-full
                    flex
                    text-white
                    justify-center
                    rounded-md
                    px-3
                    py-2
                    text-sm
                    font-semibold
                    focus-visible:outline
                    focus-visible:outline-2
                    focus-visible:outline-offset-2
                    text-sm
                    "   
                   >
                    Registre-se
                </button>
        
                </form>
                <div className="mt-6">
                    <div className="relative">
                        <div
                            className="
                                absolute
                                inset-0
                                flex
                                items-center
                            "
                        >
                            <div className="
                                w-full 
                                border-t 
                                border-gray-300" 
                            />
                        </div>
                        <div 
                            className="
                                relative
                                flex
                                justify-center
                                text-sm
                            "
                        >
                            <span
                                className="
                                    bg-white
                                    px-2
                                    text-gray-500
                                "
                            >
                                Or continue with
                            </span>
                        </div>
                    </div>
                    <div className="mt-6 flex gap-2">
                       
                    </div>
                </div>
                <div
                    className="
                        flex
                        gap-2
                        justify-center
                        text-sm
                        mt-6
                        px-2
                        text-gray-500
                    "
                >
                  
                </div>
            </div>
        </div>
    )
}

export default AuthForm