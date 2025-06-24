// const makeOrder = new Promise((resolve, reject) => {
//     const isSucess = true;
//     setTimeout(() => {
//         console.log("order take time 4s")
//         if (isSucess) {
//             resolve("order has been made")
//         }
//         else {
//             reject("order not made")
//         }
//     },4000)
// })
// async function makeorderasync() {
//     try {
//         const res = await makeOrder
//     console.log(res)
//     }
//     catch (error) {
//         console.log(error)
        
//     }
// } makeorderasync();
let allProducts = [];
const productsContainer = document.querySelector(".container");
async function makeOrder() {
    const request = await fetch("https://dummyjson.com/products?limit=100");
    const response = (await request.json()).products;
    allProducts = response; 
    displayProducts(allProducts);
} makeOrder();
function displayProducts(data) {
    let html = ``;
    data.forEach(element => {
        html += `<div class="card">
        <div class="card-image">
            <img src="${element.thumbnail}" alt="" />
        </div>  
        <div class="card-content">
            <div class="card-content-top">
                <span class="card-content-top-category">${element.category}</span>
                <div class="card-content-top-rate">
                    <span>${"★".repeat(element.rating)}${"☆".repeat(5 - element.rating)}</span>
                </div>
            </div>
            <a href="./single-product.html?id=${element.id}" >${element.title}</a>
            <p>${element.description.split(" ").slice(0, 10).join(" ")}...</p>
            <strong>$${element.price}</strong>
            <div class="card-content-tags">
            ${element.tags.map((tag) => `<span>${tag}</span>`).join("")}
            </div>
        </div>
    </div>`;
});
productsContainer.innerHTML = html;
    };
    const limit = document.querySelector(".limit");
    const limitSelect = document.querySelector(".limit-select");

    limitSelect.addEventListener("change", (e) => {
        if (e.target.value === "all") {
            limit.textContent = "Limit:  all";
        } else {
            limit.textContent = `Limit:  ${e.target.value}`;
        }
    });
     


    limitSelect.addEventListener("change", (e) => {
        limit.textContent = e.target.value === "all" ? "Limit: all" : `Limit: ${e.target.value}`;

        const limitedProducts = e.target.value === "all" ? allProducts : allProducts.slice(0, +e.target.value);

        displayProducts(limitedProducts);
    });