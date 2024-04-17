import { Button, Label, TextInput } from "flowbite-react"
import { useForm } from "react-hook-form"
import { TProduct } from "./interfaces/TProduct"
import { joiResolver } from "@hookform/resolvers/joi"
import Joi from "joi"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const schema = Joi.object({
    title: Joi.string().required().min(6),
    price: Joi.number().required().min(100),
    stock: Joi.number().required().min(0)
})

export default function Add() {
    const nav = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm<TProduct>({ resolver: joiResolver(schema) })

    const onSubmit = (data: TProduct) => {
        axios({
            method: 'POST',
            url: `http://localhost:3000/products`,
            data: data
        })
            .then(() => {
                alert('Thêm thành công!');
                nav('/products')
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="title" value="Title" />
                    </div>
                    <TextInput id="title" type="text" {...register('title')} />
                    {errors.title && <span>{errors.title.message}</span>}
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="price" value="Price" />
                    </div>
                    <TextInput id="price" type="text" {...register('price')} />
                    {errors.price && <span>{errors.price.message}</span>}
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="stock" value="Stock" />
                    </div>
                    <TextInput id="stock" type="text" {...register('stock')} />
                    {errors.stock && <span>{errors.stock.message}</span>}
                </div>
                <Button type="submit">Submit</Button>
            </form>

        </>
    )
}