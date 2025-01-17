function GlobalState() {
    return {
        count: JSON.parse(localStorage.cart).itemsCount,
        notifi: 9,
        updateCartNumber(newNum) {
            this.count = newNum;
        },
        updateCartNumberasda(newNum) {
            this.count = newNum;
        },
        init() {
            window.updateCartNumber = this
                .updateCartNumber
                .bind(this);
            window.updateCartNumberasda = this
                .updateCartNumberasda
                .bind(this);
        }
    }
}


window.GlobalState = GlobalState