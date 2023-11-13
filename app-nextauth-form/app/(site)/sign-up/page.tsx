'use client';

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { FieldValues,SubmitHandler,useForm, Controller } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import clsx from "clsx"
import axios from "axios";

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
        .then(() =>  router.push('/dashboard'))
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

                <input
                id="username"
                type="username"
                {...register("username")}
                    className={clsx(`
                        form-input
                        block
                        px-2
                        w-full
                        rounded-md
                        border-0
                        py-1.5
                        text-gray-900
                        shadow-sm
                        ring-1
                        ring-inset
                        ring-gray-300
                        placeholder:text-gray-400
                        focus:ring-2
                        focus:ring-inset
                        focus:ring-sky-600
                        sm:text-sm
                        sm:leading-6`,
                        errors["username"] && "ring-rose-500",
        
                )}
                placeholder="username"
                />
                <p className="text-sm">{errors.username?.message}</p>
                    
                <input
                id="email"
                type="email"
                {...register("email")}
                    className={clsx(`
                        form-input
                        block
                        px-2
                        w-full
                        rounded-md
                        border-0
                        py-1.5
                        text-gray-900
                        shadow-sm
                        ring-1
                        ring-inset
                        ring-gray-300
                        placeholder:text-gray-400
                        focus:ring-2
                        focus:ring-inset
                        focus:ring-sky-600
                        sm:text-sm
                        sm:leading-6`,
                        errors["email"] && "ring-rose-500",
        
                )}
                placeholder="email"
                />
                <p className="text-sm">{errors.email?.message}</p>

                <input
                id="password"
                type="password"
                {...register("password")}
                className={clsx(`
                    form-input
                    block
                    px-2
                    w-full
                    rounded-md
                    border-0
                    py-1.5
                    text-gray-900
                    shadow-sm
                    ring-1
                    ring-inset
                    ring-gray-300
                    placeholder:text-gray-400
                    focus:ring-2
                    focus:ring-inset
                    focus:ring-sky-600
                    sm:text-sm
                    sm:leading-6`,
                    errors["password"] && "ring-rose-500",
        
                )}
                placeholder="password"
                />
                <p>{errors.password?.message}</p>
                
                <input
                id="confirmPassword"
                type="confirmPassword"
                {...register("confirmPassword")}
                    className={clsx(`
                        form-input
                        block
                        px-2
                        w-full
                        rounded-md
                        border-0
                        py-1.5
                        text-gray-900
                        shadow-sm
                        ring-1
                        ring-inset
                        ring-gray-300
                        placeholder:text-gray-400
                        focus:ring-2
                        focus:ring-inset
                        focus:ring-sky-600
                        sm:text-sm
                        sm:leading-6`,
                        errors["confirmPassword"] && "ring-rose-500",
        
                )}
                placeholder="confirm password"
                />
                <p className="text-sm">{errors.confirmPassword?.message}</p>

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