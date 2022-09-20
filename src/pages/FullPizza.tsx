import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import PizzaBlockProps from "../interfaces/PizzaBlock";

const FullPizza = () => {
    const [pizza, setPizza] = useState<PizzaBlockProps>()
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
        <div className="container">
            <img src={pizza?.imageUrl}  />
            <h2>{pizza?.name}</h2>
            {pizza && <h2>{pizza?.price} руб.</h2>}
        </div>
    )
}

export default FullPizza
