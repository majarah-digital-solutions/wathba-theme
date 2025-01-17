document.addEventListener("DOMContentLoaded", async () => {
    window.Qumra.events.on("cart::updated", (cart : any) => {
        console.log("🚀 ~ window.Qumra.events.on ~ cart:", cart)
        // GlobalState().updateCartNumber(5)
    })
})

function GlobalState() {
    return {
        count: JSON.parse(localStorage.cart).itemsCount,
        notifi: 9,
        updateCartNumber(newNum : any) {
            this.count = newNum;
        },
        updateCartNumberasda(newNum: any) {
            this.count = newNum;
        },
    }
}


window.GlobalState = GlobalState