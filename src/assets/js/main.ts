interface GlobalStateInterface {
	itemsCount: number;
	products: any;
	cardItems: any;
	Modal: {
		open: boolean;
		type: string;
	};
	couponLoading: boolean;
	coupon?: string;
	addCartItem(product: any, quantity: any, properties: any): void;
	updatePrductCount(_id: string, quantity: string | number): void;
	removeProduct(_id: string): void;
	checkCoupon(code: string): void;
	toggle(type: string): void;
	closeModal(): void;
	searchProducts(search: any): void;
}
function GlobalState(): GlobalStateInterface {
	return {
		itemsCount: window.__qumra__?.context.cart?.items?.length ?? 0,
		products: window.__qumra__?.context?.products ?? [],
		cardItems: window.__qumra__?.context?.cart,
		Modal: {
			open: false,
			type: "",
		},
		couponLoading: false,
		addCartItem(product: any, quantity: any, properties: any) {
			window.Qumra.cart
				.addCartItem(product, quantity, properties)
				.then(
					(res: any) => (
						(this.cardItems = res), (this.itemsCount = res.items.length)
					)
				);
		},
		updatePrductCount(_id: string, quantity: number) {
			window.Qumra.cart.updateQuantity(_id, quantity).then(
				(res: any) => (
					this.cardItems.items.map((item: any) => {
						if (item._id === _id) {
							item.quantity = quantity;
						}
					}),
					(this.cardItems.totalPrice = res.totalPrice),
					(this.cardItems.productDiscount = res.productDiscount),
					(this.cardItems.totalProducts = res.totalProducts),
					(this.cardItems.totalProductsAfterDiscount =
						res.totalProductsAfterDiscount)
				)
			);
		},
		removeProduct(_id: string) {
			window.Qumra.cart.clearCartItem(_id).then(
				(res: any) => (
					(this.itemsCount = this.cardItems.items.length - 1),
					(this.cardItems.items = this.cardItems.items.filter(
						(item: any) => item._id !== _id
					)),
					(this.cardItems.totalPrice = res.totalPrice),
					(this.cardItems.productDiscount = res.productDiscount),
					(this.cardItems.totalProducts = res.totalProducts),
					(this.cardItems.totalProductsAfterDiscount =
						res.totalProductsAfterDiscount)
					// this.cardItems = res
				)
			);
		},
		checkCoupon(code: string) {
			this.couponLoading = true;
			window.Qumra.cart.redeemCode(code).finally(() => {
				this.couponLoading = false;
			});
		},
		toggle(type) {
			if (this.Modal.type === type) {
				this.Modal.open = !this.Modal.open;
			} else {
				this.Modal.type = type;
				this.Modal.open = true;
			}
			if (type === "cart") {
				this.couponLoading = false;
				if (this.Modal.open) {
					window.Qumra.dom.disableScrolling();
				} else {
					window.Qumra.dom.enableScrolling();
				}
				this.coupon = "";
			}
		},
		closeModal() {
			this.Modal.open = false;
		},
		searchProducts(search: any) {
			window.location.href = `/search/?q=${search}`;
			window.Qumra
		},
		
	};
}
window.GlobalState = GlobalState;
