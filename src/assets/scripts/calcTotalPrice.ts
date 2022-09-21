export const calcTotalPrice = (items: any[]) => {
    return items.reduce((sum, obj) => {
        return (obj.price * obj.count) + sum
    }, 0)
}
