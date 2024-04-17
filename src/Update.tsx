import { Button, Label, TextInput } from "flowbite-react"
import { useForm } from "react-hook-form"
import { TProduct } from "./interfaces/TProduct"
import { joiResolver } from "@hookform/resolvers/joi"
import Joi from "joi"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"

const schema = Joi.object({
    title: Joi.string().required().min(6),
    price: Joi.number().required().min(100),
    stock: Joi.number().required().min(0)
})

export default function Update() {
    const { id } = useParams()
    const nav = useNavigate()
    const [product, setProduct] = useState<TProduct>()
    const { register, handleSubmit, formState: { errors } } = useForm<TProduct>({ resolver: joiResolver(schema) })

    useEffect(() => {
        axios({
            method: 'GET',
            url: `http://localhost:3000/products/${id}`
        })
            .then(data => setProduct(data.data))
            .catch(err => console.log(err))
    }, [])

    const onSubmit = (data: TProduct) => {
        axios({
            method: 'PUT',
            url: `http://localhost:3000/products/${id}`,
            data: data
        })
            .then(() => {
                alert('Sửa thành công!');
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
                    <TextInput defaultValue={product?.title} id="title" type="text" {...register('title')} />
                    {errors.title && <span>{errors.title.message}</span>}
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="price" value="Price" />
                    </div>
                    <TextInput id="price" defaultValue={product?.price} type="text" {...register('price')} />
                    {errors.price && <span>{errors.price.message}</span>}
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="stock" value="Stock" />
                    </div>
                    <TextInput id="stock" defaultValue={product?.stock} type="text" {...register('stock')} />
                    {errors.stock && <span>{errors.stock.message}</span>}
                </div>
                <Button type="submit">Submit</Button>
            </form>

        </>
    )
}