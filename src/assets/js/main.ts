document.addEventListener("DOMContentLoaded", async () => {
    window.Qumra.events.on("cart::updated", (cart : any) => {
        console.log("🚀 ~ window.Qumra.events.on ~ cart:", cart)
        // GlobalState().updateCartNumber(5)
    })
})

function GlobalState() {
    return {
        itemsCount: window.__qumra__.context.cart.items.length,
        items: window.__qumra__.context.cart.items,
        updateCartNumber(newNum : any) {
            this.itemsCount = newNum;
        },
        updateCartNumberasda(newNum: any) {
            this.itemsCount = newNum;
        },
    }
}



window.GlobalState = GlobalState;

