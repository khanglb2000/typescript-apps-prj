import { ChangeEvent, memo, ReactElement } from "react";
import { CartItemType, ReducerAction, ReducerActionType } from "../context/CartProvider"

type PropsType = {
    item: CartItemType;
    dispatch: React.Dispatch<ReducerAction>,
    REDUCER_ACTIONS: ReducerActionType,
}

const CartLineItem = ({ item, dispatch, REDUCER_ACTIONS }: PropsType): ReactElement => {
  const img: string = new URL(`../images/${item.sku}.png`, import.meta.url).href;

  const lineTotal: number = (item.quantity * item.price)

  const highestQuantity: number = 20 > item.quantity ? 20 : item.quantity;

  const optionValues: number[] = [...Array(highestQuantity).keys()].map(item => item + 1);

  const options: ReactElement[] = optionValues.map(val => {
    return <option key={`opt${val}`} value={val}>{val}</option>
  })

  const onChangeQuantity = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({
        type: REDUCER_ACTIONS.QUANTITY,
        payload: {...item, quantity: Number(e.target.value)}
    })
  }

  const onRemoveFromCart = () => dispatch({
    type: REDUCER_ACTIONS.REMOVE,
    payload: item, 
  })

  const content = (
    <li className="cart__item">
        <img className="cart__img" src={img} alt={item.name} />
        <div aria-label="Item Name">{item.name}</div>
        <div aria-label="Price per Item">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'vnd' }).format(item.price)}</div>
        
        <label htmlFor="itemQty" className="offscreen">
            Item Quantity
        </label>
        <select 
            name="itemQty" 
            id="itemQty" 
            className="cart__select" 
            value={item.quantity}
            aria-label="Item Quantity"
            onChange={onChangeQuantity}
        >
            {options}
        </select>

        <div className="cart__item-subtotal" aria-label="Line Item Subtotal">
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'vnd' }).format(lineTotal)}
        </div>

        <button 
            className="cart__button"
            aria-label="Remove Item From Cart"
            title="Remove Item From Cart"
            onClick={onRemoveFromCart}
        >
            ❌
        </button>
    </li>
  )

  return content;
}

function areItemsEqual({ item: prevItem}: PropsType, { item: nextItem }: PropsType) { 
  return Object.keys(prevItem).every(key => {
    return prevItem[key as keyof CartItemType] === nextItem[key as keyof CartItemType]
  })
}

const MemorizedCartLineItem = memo<typeof CartLineItem>(CartLineItem, areItemsEqual)

export default MemorizedCartLineItem;