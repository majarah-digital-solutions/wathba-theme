import { CartItem } from "../../types/cart.js";

interface GlobalStateInterface {
	itemsCount: number;
	products: any;
	cart: any;
	context: any;
	data: any;
	Modal: {
		open: boolean;
		type: string;
	};
	couponLoading: boolean;
	coupon?: string;
	search?: string;
	cartLoading: boolean;
	updateCart: (data: any) => void;
	checkCoupon?(code: string): void;
	toggle?(type: string): void;
	searchProducts(search: any): void;
	closeModal(): void;
	checkoutLoading: boolean
	cartLoadingToggle(loading: boolean): void;
	couponLoadingToggle(loading: boolean): void;
	init: () => void;
}

function GlobalState(): GlobalStateInterface {
	return {
		itemsCount: window.__qumra__?.context.cart?.items?.length ?? 0,
		products: window.__qumra__?.context?.products ?? [],
		cart: window.__qumra__?.cart,
		context: window.__qumra__?.context,
		data: window.__qumra__?.data,
		cartLoading: false,
		search: window.__qumra__?.context.search?.q || "",
		Modal: {
			open: false,
			type: "",
		},
		checkoutLoading: false,
		couponLoading: false,
		updateCart(data: any) {
			this.cart = data;
			this.itemsCount = data?.items?.length ?? 0;
		},
		toggle(type) {
			if (this.Modal.type === type) {
				this.Modal.open = !this.Modal.open;
			} else {
				this.Modal.type = type;
				this.Modal.open = true;
			}
			this.couponLoading = false;
			if (this.Modal.open) {
				Qumra.dom.disableScrolling();
			} else {
				Qumra.dom.enableScrolling();
			}
			this.coupon = "";
		},
		closeModal() {
			this.Modal.open = false;
		},
		searchProducts(search: any) {
			window.location.href = `/search/?q=${search}`;
		},
		cartLoadingToggle(loading: boolean) {
			this.cartLoading = loading;
		},
		couponLoadingToggle(loading: boolean) {
			this.couponLoading = loading;
		},
		init() {
			window.updateCart = this.updateCart.bind(this);
			window.cartLoadingToggle = this.cartLoadingToggle.bind(this);
			window.couponLoadingToggle = this.couponLoadingToggle.bind(this);
		},
	};
	
}
document.addEventListener("QumraGearboxReady", () => {
	 
 (document?.getElementById('spinner-container') as any).style.display= 'none' 
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
		window.Qumra.events.on(
			window.Qumra.events.QumraEventName.CouponeLoading,
			(data: { loading: boolean }) => {
				window.couponLoadingToggle(data.loading);
			}
		);

		
	} else {
		console.error("Qumra is not defined or events are not available.");
	}
});

window.GlobalState = GlobalState;
