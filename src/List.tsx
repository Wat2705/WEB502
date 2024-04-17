"use client"
import { Button, Table } from "flowbite-react"
import { useEffect, useState } from "react";
import { TProduct } from "./interfaces/TProduct";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function List() {
    const nav = useNavigate()

    useEffect(() => {
        if (sessionStorage.getItem('token') == null) {
            alert('Bạn chưa đăng nhập! Vui lòng đăng nhập để có thể vào trang products!')
            nav('/login')
        }
    }, [])

    const [products, setProducts] = useState<TProduct[]>([]);

    useEffect(() => {
        axios({
            method: 'GET',
            url: `http://localhost:3000/products`
        })
            .then(data => setProducts(data.data))
            .catch(err => console.log(err))
    }, [])

    return (
        <>
            <div className="overflow-x-auto">
                <Button onClick={() => nav('/add')}>Add</Button>
                <Table>
                    <Table.Head>
                        <Table.HeadCell>Product ID</Table.HeadCell>
                        <Table.HeadCell>Title</Table.HeadCell>
                        <Table.HeadCell>Price</Table.HeadCell>
                        <Table.HeadCell>Stock</Table.HeadCell>
                        <Table.HeadCell>Description</Table.HeadCell>
                        <Table.HeadCell>
                            <span className="sr-only">Edit</span>
                        </Table.HeadCell>
                        <Table.HeadCell>
                            <span className="sr-only">Del</span>
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {products.map((e) => {
                            return (
                                <Table.Row key={e.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {e.id}
                                    </Table.Cell>
                                    <Table.Cell>{e.title}</Table.Cell>
                                    <Table.Cell>${e.price}</Table.Cell>
                                    <Table.Cell>{e.stock}</Table.Cell>
                                    <Table.Cell>{e.description}</Table.Cell>
                                    <Table.Cell>
                                        <a href={`/update/${e.id}`} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                            Edit
                                        </a>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div onClick={() => {
                                            if (confirm('Bạn có muốn xóa sản phẩm này không?')) {
                                                axios({
                                                    method: "DELETE",
                                                    url: `http://localhost:3000/products/${e.id}`
                                                })
                                                    .then(() => {
                                                        alert('Xóa thành công!');
                                                        setProducts(products.filter((p) => {
                                                            if (p.id != e.id) {
                                                                return true
                                                            }
                                                        }))
                                                    })
                                                    .catch(err => console.log(err))
                                            }
                                        }} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 cursor-pointer">
                                            Del
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            )
                        })}
                    </Table.Body>
                </Table>
            </div>

        </>
    )
}