import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";

const FullPizza = () => {
    const [pizza, setPizza] = useState<{
        imageUrl: string;
        name: string;
        price: number;
    }>()
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`https://62b57a56da3017eabb1b8e17.mockapi.io/Items/${id}`).then(({data} ) => {
            setPizza(data)
        }).catch(e => {
            alert('Ошибка при получении пиццы')
            console.log(e)
            navigate('/')
        })
    }, [])

    return (
        <>
            {pizza && <div className="container pizza-container">
                <img src={pizza?.imageUrl} alt={'pizza'}/>
                <h2>{pizza?.name}</h2>
                <h2>{pizza?.price} руб.</h2>
                <Link to={"/"}>
                    <button className="button button--outline button--add">
                        <span>Назад</span>
                    </button>
                </Link>

            </div>}
        {/*    todo loader */}
        </>

    )
}

export default FullPizza
