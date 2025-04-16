export function xDataPagination(context: any) {
  return {
    currentGroup: 1,
    pagesPerGroup: 4,
    totalGroups: Math.ceil(context.pagination.totalPages / 4),
    currentPage: 1,

    setPagination(page: number) {
      window.updateLoading('page', true);
      if (page >= 1 && page <= context.pagination.totalPages) {
        this.currentGroup = Math.ceil(page / this.pagesPerGroup);
        Qumra.products.setPage(page).then((res: any) => {
          window.updateLoading('page', false);
          this.totalGroups = Math.ceil(res.data.pagination.totalPages / this.pagesPerGroup);
          this.currentPage = res.data.pagination.page;
          window.updateContext({ products: res.data.products});
        }).catch((err: any) => {
          console.error("setLimit error", err);
        });
      }
    },

    nextGroup() {
      if (this.currentGroup < this.totalGroups) {
        this.currentGroup++;
      }
    },

    prevGroup() {
      if (this.currentGroup > 1) {
        this.currentGroup--;
      }
    }
  };
}

(window as any).xDataPagination = xDataPagination;
