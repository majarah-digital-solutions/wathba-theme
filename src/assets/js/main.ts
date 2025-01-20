import { CartItem } from "../../types/cart.js";

interface GlobalStateInterface {
	itemsCount: number;
	products: any;
	cart: any;
	Modal: {
		open: boolean;
		type: string;
	};
	couponLoading: boolean;
	coupon?: string;
	cartLoading: boolean;
	updateCart: (data: any) => void;
	addCartItem?(product: any, quantity: any, properties: any): void;
	updatePrductCount?(_id: string, quantity: string | number): void;
	removeProduct?(_id: string): void;
	checkCoupon?(code: string): void;
	toggle?(type: string): void;
	searchProducts(search: any): void;
	closeModal(): void;
	cartLoadingToggle(loading: boolean): void;

	init: () => void;
}

function GlobalState(): GlobalStateInterface {
	return {
		itemsCount: window.__qumra__?.context.cart?.items?.length ?? 0,
		products: window.__qumra__?.context?.products ?? [],
		cart: window.__qumra__?.context?.cart,
		cartLoading: false,
		Modal: {
			open: false,
			type: "",
		},
		couponLoading: false,
		updateCart(data: any) {
			this.cart = data;
		},
		toggle(type) {
			console.log("Modal", this.Modal, type);
			if (this.Modal.type === type) {
				this.Modal.open = !this.Modal.open;
			} else {
				this.Modal.type = type;
				this.Modal.open = true;
			}
			this.couponLoading = false;
			// if (this.Modal.open) {
			// 	Qumra.dom.disableScrolling();
			// } else {
			// 	Qumra.dom.enableScrolling();
			// }
			this.coupon = "";
		},
		closeModal() {
			this.Modal.open = false;
		},
		searchProducts(search: any) {
			console.log(search); // Your search logic here
			window.location.href = `/search/?q=${search}`;
		},
		cartLoadingToggle(loading: boolean) {
			this.cartLoading = loading;
		},
		init() {
			window.updateCart = this.updateCart.bind(this);
			window.cartLoadingToggle = this.cartLoadingToggle.bind(this);
		},
	};
}
document.addEventListener("QumraGearboxReady", () => {
	if (Qumra && Qumra.events) {
		window.Qumra.events.on(
			window.Qumra.events.QumraEventName.CartUpdate,
			(data: any) => {
				window.updateCart(data);
			}
		);

		window.Qumra.events.on(
			window.Qumra.events.QumraEventName.CartLoading,
			(data: { loading: boolean }) => {
				window.cartLoadingToggle(data.loading);
			}
		);
	} else {
		console.error("Qumra is not defined or events are not available.");
	}
});

window.GlobalState = GlobalState;
