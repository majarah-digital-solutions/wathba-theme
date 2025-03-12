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
	priceAfterCall: {
		type: string;
		call?: string;
		whatsapp?: string
	}
	priceAtCallLoading: boolean
	pageLoading: boolean
	buyNowLoading: boolean
	updateCart: (data: any) => void;
	updatePage(data: any): void;
	checkCoupon?(code: string): void;
	toggle?(type: string): void;
	searchProducts(search: any): void;
	closeModal(): void;
	checkoutLoading: boolean
	cartLoadingToggle(loading: boolean): void;
	couponLoadingToggle(loading: boolean): void;
	checkoutLoadingToggle(loading: boolean): void;
	buyNowLoadingToggle(loading: boolean): void;
	priceAfterCallMethod(type: string): void;
	priceAfterCallToggle(loading: boolean): void;
	filterProducts(filter: any): void;
	pageLoadingToggle(loading: boolean): void
	pageUpdated(data: any): void
	init: () => void;
	currency: string
	filterData: any
	filter: any
}

function GlobalState(): GlobalStateInterface {
	return {
		itemsCount: window.__qumra__?.cart?.items?.length ?? 0,
		products: window.__qumra__?.context?.products ?? [],
		cart: window.__qumra__?.cart,
		context: window.__qumra__?.context,
		filterData: window.__qumra__?.context?.filter?.data,
		filter: {
			limit: 10,
			page: 1,
		},
		data: window.__qumra__?.data,
		cartLoading: false,
		checkoutLoading: false,
		buyNowLoading: false,
		currency: window.__qumra__?.data?.app?.currency?.currencySymbol,
		search: window.__qumra__?.context.search?.q || "",
		Modal: {
			open: false,
			type: "",
		},
		couponLoading: false,
		priceAfterCall: {
			type: "none",
			call: "",
			whatsapp: ""
		},
		priceAtCallLoading: false,
		pageLoading: false,
		updateCart(data: any) {
			this.cart = data;
			this.itemsCount = data?.items?.length ?? 0;
		},
		updatePage(data: any) {
			this.context = data;
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
		priceAfterCallMethod(data: any) {
			this.priceAfterCall = data
		},
		closeModal() {
			this.Modal.open = false;
		},
		searchProducts(search: any) {
			window.location.href = `/search/?q=${search}`;
		},
		filterProducts(filter: any) {
			console.log("filterc", filter);
			this.filter = {
				...this.filter,
				...filter
			};
			window.Qumra.product.getProducts(this.filter);
		},
		cartLoadingToggle(loading: boolean) {
			this.cartLoading = loading;
		},
		couponLoadingToggle(loading: boolean) {
			this.couponLoading = loading;
		},
		checkoutLoadingToggle(loading: boolean) {
			this.checkoutLoading = loading;
		},
		buyNowLoadingToggle(loading: boolean) {
			this.buyNowLoading = loading;
		},
		priceAfterCallToggle(loading: boolean) {
			this.priceAtCallLoading = loading;
		},
		pageLoadingToggle(loading: boolean) {
			console.log("pageLoadingToggle", loading);
			this.pageLoading = loading;
		},
		pageUpdated(data: any) {
			  console.log("globalData data pagination",data?.data?.pagination); 
			  this.products = [...data?.data?.products];
			  this.context.products = data?.data?.products;
			  this.filterData.pagination = data?.data?.pagination
			  this.filterData.filters = data?.data?.filter?.data?.filters
		},

		init() {
			window.updateCart = this.updateCart.bind(this);
			window.pageUpdated = this.pageUpdated.bind(this);
			window.cartLoadingToggle = this.cartLoadingToggle.bind(this);
			window.couponLoadingToggle = this.couponLoadingToggle.bind(this);
			window.checkoutLoadingToggle = this.checkoutLoadingToggle.bind(this);
			window.buyNowLoadingToggle = this.buyNowLoadingToggle.bind(this);
			window.pageLoadingToggle = this.pageLoadingToggle.bind(this);
			window.priceAfterCallMethod = this.priceAfterCallMethod.bind(this);
			window.priceAfterCallToggle = this.priceAfterCallToggle.bind(this);
		},
	};

}
document.addEventListener("QumraGearboxReady", () => {
	(document?.getElementById('spinner-container') as any).style.display = 'none'
	const urlParams = new URLSearchParams(window.location.search);
	const page = urlParams.get("page")?.trim();
	const limit = urlParams.get("limit")?.trim();
	
	const pageNum = page && !isNaN(parseInt(page)) ? parseInt(page, 10) : null;
	const limitNum = limit && !isNaN(parseInt(limit)) ? parseInt(limit, 10) : null;
	
	if (pageNum && limitNum) {
		const globalState = GlobalState();
		globalState.filterProducts({ page: pageNum, limit: limitNum });
	}
	

	if (Qumra && Qumra.events) {
		window.Qumra.events.on(
			window.Qumra.events.QumraEventName.CartUpdate,
			(data: any) => {
				console.log("CartUpdate", data);
				window.updateCart(data);
			}
		);

		window.Qumra.events.on(
			window.Qumra.events.QumraEventName.CartLoading,
			(data: { loading: boolean }) => {
				console.log("CartUpdate loading", data.loading);
				window.cartLoadingToggle(data.loading);

			}
		);
		window.Qumra.events.on(
			window.Qumra.events.QumraEventName.CouponeLoading,
			(data: { loading: boolean }) => {
				window.couponLoadingToggle(data.loading);
			}
		);
		window.Qumra.events.on(
			window.Qumra.events.QumraEventName.CheckoutLoading,
			(data: { loading: boolean }) => {
				window.checkoutLoadingToggle(data.loading);
			}
		);
		window.Qumra.events.on(
			window.Qumra.events.QumraEventName.buyNowLoading,
			(data: { loading: boolean }) => {
				window.buyNowLoadingToggle(data.loading);
			}
		);
		window.Qumra.events.on(
			window.Qumra.events.QumraEventName.priceAtCall,
			(data: any) => {
				console.log("QumraEventName", data);
				window.priceAfterCallMethod(data)
				if (data.type === "call") {
					window.location.href = `tel:${data.phone}`
				} else if (data.type === "whatsapp") {
					window.location.href = `https://wa.me/${data.phone}`
				}
			}
		);

		window.Qumra.events.on(
			window.Qumra.events.QumraEventName.priceAtCallLoading,
			(data: { loading: boolean }) => {
				window.priceAfterCallToggle(data.loading);
			}
		);
		window.Qumra.events.on(
			window.Qumra.events.QumraEventName.pageUpdated,
			(data: any) => {
				window.pageUpdated(data);
			}
		);
		window.Qumra.events.on(
			window.Qumra.events.QumraEventName.pageLoading,
			(data: { loading: boolean }) => {
				window.pageLoadingToggle(data.loading);

			}
		);
	} else {
		console.error("Qumra is not defined or events are not available.");
	}
});

window.GlobalState = GlobalState;




