// ============================================
// GENERADOR DE DATOS
// ============================================

function* dataGenerator(total) {
  for (let i = 1; i <= total; i++) {
    yield {
      id: i,
      title: `Item ${i}`,
      description: `Descripción del elemento ${i}`,
    };
  }
}

// ============================================
// UTILIDADES DE GENERADORES
// ============================================

function* take(iterator, n) {
  let count = 0;

  for (const item of iterator) {
    if (count++ >= n) return;
    yield item;
  }
}

function* skip(iterator, n) {
  let count = 0;

  for (const item of iterator) {
    if (count++ < n) continue;
    yield item;
  }
}

// ============================================
// CLASE PAGINATOR
// ============================================

class Paginator {
  constructor(generatorFn, totalItems, itemsPerPage = 5) {
    this.generatorFn = generatorFn;
    this.totalItems = totalItems;
    this.itemsPerPage = itemsPerPage;
    this.currentPage = 1;
  }

  get totalPages() {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  get hasNext() {
    return this.currentPage < this.totalPages;
  }

  get hasPrevious() {
    return this.currentPage > 1;
  }

  getPageItems() {
    const generator = this.generatorFn(this.totalItems);

    const skipCount = (this.currentPage - 1) * this.itemsPerPage;

    const result = take(skip(generator, skipCount), this.itemsPerPage);

    return [...result];
  }

  next() {
    if (!this.hasNext) return false;
    this.currentPage++;
    return true;
  }

  previous() {
    if (!this.hasPrevious) return false;
    this.currentPage--;
    return true;
  }

  goToPage(page) {
    if (page < 1 || page > this.totalPages) return false;
    this.currentPage = page;
    return true;
  }

  first() {
    this.currentPage = 1;
  }

  last() {
    this.currentPage = this.totalPages;
  }

  setItemsPerPage(newItemsPerPage) {
    const firstItemIndex =
      (this.currentPage - 1) * this.itemsPerPage;

    this.itemsPerPage = newItemsPerPage;

    this.currentPage =
      Math.floor(firstItemIndex / newItemsPerPage) + 1;
  }

  getRange() {
    const start =
      (this.currentPage - 1) * this.itemsPerPage + 1;

    const end = Math.min(
      this.currentPage * this.itemsPerPage,
      this.totalItems
    );

    return { start, end };
  }
}

// ============================================
// CONTROLADOR DE UI
// ============================================

let paginator = null;

const elements = {
  totalItems: document.getElementById('totalItems'),
  itemsPerPage: document.getElementById('itemsPerPage'),
  btnGenerate: document.getElementById('btnGenerate'),
  dataList: document.getElementById('dataList'),
  pagination: document.getElementById('pagination'),
  btnFirst: document.getElementById('btnFirst'),
  btnPrev: document.getElementById('btnPrev'),
  btnNext: document.getElementById('btnNext'),
  btnLast: document.getElementById('btnLast'),
  pageInput: document.getElementById('pageInput'),
  totalPages: document.getElementById('totalPages'),
  stats: document.getElementById('stats'),
  itemRange: document.getElementById('itemRange'),
  totalItemsDisplay: document.getElementById('totalItemsDisplay'),
};

// ============================================
// RENDER
// ============================================

function renderItems() {
  const items = paginator.getPageItems();

  elements.dataList.innerHTML = items
    .map(item => createItemHTML(item))
    .join('');

  updatePaginationUI();
}

function createItemHTML(item) {
  return `
    <div class="data-item">
      <div class="data-item-id">${item.id}</div>
      <div class="data-item-content">
        <div class="data-item-title">${item.title}</div>
        <div class="data-item-description">${item.description}</div>
      </div>
    </div>
  `;
}

function updatePaginationUI() {
  elements.btnPrev.disabled = !paginator.hasPrevious;
  elements.btnFirst.disabled = !paginator.hasPrevious;

  elements.btnNext.disabled = !paginator.hasNext;
  elements.btnLast.disabled = !paginator.hasNext;

  elements.pageInput.value = paginator.currentPage;
  elements.totalPages.textContent = paginator.totalPages;

  const { start, end } = paginator.getRange();
  elements.itemRange.textContent = `${start} - ${end}`;
  elements.totalItemsDisplay.textContent = paginator.totalItems;
}

// ============================================
// INICIALIZACIÓN
// ============================================

function initializePaginator() {
  const total = parseInt(elements.totalItems.value);
  const perPage = parseInt(elements.itemsPerPage.value);

  paginator = new Paginator(dataGenerator, total, perPage);

  elements.pagination.style.display = 'block';
  elements.stats.style.display = 'block';

  renderItems();
}

// ============================================
// EVENT LISTENERS
// ============================================

elements.btnGenerate.addEventListener('click', () => {
  initializePaginator();
});

elements.btnFirst.addEventListener('click', () => {
  paginator.first();
  renderItems();
});

elements.btnPrev.addEventListener('click', () => {
  paginator.previous();
  renderItems();
});

elements.btnNext.addEventListener('click', () => {
  paginator.next();
  renderItems();
});

elements.btnLast.addEventListener('click', () => {
  paginator.last();
  renderItems();
});

elements.pageInput.addEventListener('change', e => {
  const page = parseInt(e.target.value);

  if (paginator.goToPage(page)) {
    renderItems();
  }
});

elements.itemsPerPage.addEventListener('change', e => {
  if (!paginator) return;

  paginator.setItemsPerPage(parseInt(e.target.value));
  renderItems();
});