document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");
  let products = [];
  let pageNum = 1;

  const fetchProducts = async () => {
    try {
      const res = await fetch("https://dummyjson.com/products?limit=100");
      const data = await res.json();

      if (data && data.products) {
        products = data.products;
        render();
      }
    } catch (err) {
      console.log(err);
    }
  };

  function render() {
    const productsContainer = document.createElement("div");
    productsContainer.classList.add("products");

    //Pagination
    const pagination = document.createElement("div");
    pagination.classList.add("pagination");

    if (products.length > 0) {
      products.slice(pageNum * 10 - 10, pageNum * 10).forEach((prod) => {
        const productElement = document.createElement("div");
        productElement.classList.add("singleproduct");

        productElement.innerHTML = `
        <img src=${prod.thumbnail} alt="${prod.title}" />
        <span>${prod.title}</span>
        `;

        productsContainer.appendChild(productElement);
      });

      //pagination
      if (pageNum > 1) {
        const prevButton = createPaginationButton("🔙", () => {
          selectHandler(pageNum - 1);
        });
        pagination.appendChild(prevButton);
      }

      //display Numbers
      for (let i = 0; i < products.length / 10; i++) {
        const pageButton = createPaginationButton(
          i + 1,
          () => {
            selectHandler(i + 1);
          },
          pageNum === i + 1
        );
        pagination.appendChild(pageButton);
      }

      //nextButton
      if (pageNum < products.length / 10) {
        const nextButton = createPaginationButton("⏭️", () => {
          selectHandler(pageNum + 1);
        });
        pagination.appendChild(nextButton);
      }
    }
    app.innerHTML = "";
    app.appendChild(productsContainer);
    app.appendChild(pagination);
  }

  const createPaginationButton = (text, clickHandler, isSelected = false) => {
    const button = document.createElement("button");
    button.textContent = text;
    button.addEventListener("click", clickHandler);
    if (isSelected) {
      button.classList.add("pageSeleted");
    }
    return button;
  };
  const selectHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= products.length / 10 &&
      selectedPage !== pageNum
    ) {
      pageNum = selectedPage;
      render();
    }
  };

  fetchProducts();
});
