import { CartItem } from "../../types/cart";

document.addEventListener("DOMContentLoaded", async () => {
    window.Qumra.events.on("cart::updated", (cart : any) => {
        console.log("🚀 ~ window.Qumra.events.on ~ cart:", cart)
        // GlobalState().updateCartNumber(5)
    })
})

function GlobalState() {
    return {
        itemsCount: JSON.parse(localStorage.cart)?.itemsCount,
        notifi: 9,
        updateCartNumber(newNum : any) {
            this.itemsCount = newNum;
        },
        updateCartNumberasda(newNum: any) {
            this.itemsCount = newNum;
        },
    }
}


function CartItemList() {
    return {
        items: window.__qumra__.context.cart.items,
        addItemCart(items : CartItem) {
            window
                .Qumra
                .events
                .on("cart::updated", (cart: any) => {
                    GlobalState().updateCartNumber(cart.itemsCount)
                })
        },
        deleteItemCart(index: any, newFruit: any) {
            this.items[index] = newFruit;
        },
        init() {
            window.addItemCart = this
                .addItemCart
                .bind(this);
        }
    }
}
window.GlobalState = GlobalState;
window.CartItemList = CartItemList;

