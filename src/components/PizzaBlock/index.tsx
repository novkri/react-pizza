import React from "react";
import PizzaBlockProps from "../../interfaces/PizzaBlock";
import {useDispatch, useSelector} from "react-redux";
import {addItem} from "../../redux/slices/cartSlice";

const typeNames = ['тонкое', 'традиционное']


function PizzaBlock({id, imageUrl, name, types, sizes, price, category, rating}: PizzaBlockProps) {
    const dispatch = useDispatch()
    const cartItem = useSelector((state: any) => state.cart.items.find((i: any) => i.id === id))
    const [activeSize, setActiveSize] = React.useState(0)
    const [activeType, setActiveType] = React.useState(types[0])

    const sizesList = sizes.map((item, index) => <li key={item} className={activeSize === index ? 'active' : ''} onClick={() => setActiveSize(index)}>{item}</li>)
    const typesList = types.map((item) => <li key={item} className={activeType === item ? 'active' : ''} onClick={() => setActiveType(item)}>{typeNames[item]}</li>)

    const onClickAdd = () => {
        const item = {
            id,
            name,
            price,
            imageUrl,
            type: typeNames[activeType],
            size: sizes[activeSize]
        }

        dispatch(addItem(item))
    }
    return (
        <div className="pizza-block-wrapper">
            <div className="pizza-block">
                <img
                    className="pizza-block__image"
                    src={imageUrl}
                    alt="Pizza"
                />
                <h4 className="pizza-block__title">{name}</h4>
                <div className="pizza-block__selector">
                    <ul>
                        {typesList}
                    </ul>
                    <ul>
                        {sizesList}
                    </ul>
                </div>
                <div className="pizza-block__bottom">
                    <div className="pizza-block__price">от {price} ₽</div>
                    <button className="button button--outline button--add" onClick={onClickAdd} >
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                                fill="white"
                            />
                        </svg>
                        <span>Добавить</span>
                        {cartItem &&  <i>{cartItem?.count}</i>}

                    </button>
                </div>
            </div>
        </div>
    )
}
export default PizzaBlock
