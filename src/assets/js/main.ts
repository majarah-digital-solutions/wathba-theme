document.addEventListener("DOMContentLoaded", () => {
	document.querySelector("#loadmore")?.addEventListener("click", () => {
		window.Qumra.products.loadMore();
	})
})