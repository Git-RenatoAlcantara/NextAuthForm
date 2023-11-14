'use client'

import clsx from "clsx"
import  * as z  from 'zod'
import { ErrorMessage } from "@hookform/error-message"

const FormSchema = z.object({
    username: z.string().min(1, "Username is required").max(100),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z.string()
    .min(1, "Password is required")
    .min(8, "Password must have than 8 characters"),
})

import {
    FieldErrors, 
    FieldValues,
    UseFormRegister
} from 'react-hook-form'

interface InputProps {
    label: string;
    id: string;
    type?: string;
    required?: boolean;
    register: UseFormRegister<any>,
    errors: FieldErrors,
    disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
    label,
    id,
    type,
    required,
    register,
    errors,
    disabled
 }) => {
    
    return (
        <div>
           <label
                className="
                    block
                    text-sm
                    font-medium
                    leading-6
                    text-gray-900
                "
                htmlFor={id}
            >
                {label}
            </label>
            <div className="mt-2">
               <input 
                  id={id}
                  type={type}
                  autoComplete={id}
                  disabled={disabled}
                  {...register(id, {required})}
                className={clsx(`
                form-input
                block
                w-full
                rounded-md
                border-0
                py-1.5
                text-gray-900
                shadow-sm
                outline-none
                ring-1
                ring-inset
                ring-gray-300
                placeholder:text-gray-400
                focus:ring-2
                focus:ring-inset
                focus:ring-sky-600
                sm:text-sm
                sm:leading-6`,
                errors[id] && "focus:ring-rose-500",
                disabled && "opacity-50 cursor-default"
                )}
               />
            </div>
            <ErrorMessage 
                errors={errors}
                name={id}
            />
    
        </div>
    )
}

export default Input