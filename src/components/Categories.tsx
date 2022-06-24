import React from "react";

function Categories() {
    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые','Закрытые']

    const [activeIndex, setActiveIndex] = React.useState(0)

    const categoryItem = categories.map((cat, idx) => <li onClick={() => setActiveIndex(idx)} key={cat} className={activeIndex === idx ? 'active' : ''}>{cat}</li>)

    return (
        <div className="categories">
            <ul>
                { categoryItem }
            </ul>
        </div>
    )
}
export default Categories
