import { Button, Label, TextInput } from "flowbite-react"
import { useForm } from "react-hook-form"
import { joiResolver } from "@hookform/resolvers/joi"
import Joi from "joi"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { TUser } from "./interfaces/TUser"

const schema = Joi.object({
    email: Joi.string().required().email({ tlds: { allow: false } }),
    password: Joi.string().required().min(6),
})

export default function Register() {
    const nav = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm<TUser>({ resolver: joiResolver(schema) })

    const onSubmit = (data: TUser) => {
        axios({
            method: 'POST',
            url: `http://localhost:3000/register`,
            data: data
        })
            .then(() => {
                alert('Đăng ký thành công! Vui lòng đăng nhập lại!');
                nav('/login')
            })
            .catch(err => alert(err.response.data))
    }

    return (
        <>
            <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                <h1>Đăng ký</h1>

                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="email" value="Email" />
                    </div>
                    <TextInput id="email" type="text" {...register('email')} />
                    {errors.email && <span>{errors.email.message}</span>}
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="password" value="Password" />
                    </div>
                    <TextInput id="password" type="text" {...register('password')} />
                    {errors.password && <span>{errors.password.message}</span>}
                </div>
                <Button type="submit">Submit</Button>
            </form>

        </>
    )
}