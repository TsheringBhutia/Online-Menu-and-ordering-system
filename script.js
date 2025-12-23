// LOAD CART
let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* ADD ITEM */
function addItem(name, price) {
    cart.push({ name, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart");
}

/* PLACE ORDER */
function placeOrder() {
    let table = document.getElementById("tableNo").value;
    if (!table || cart.length === 0) {
        alert("Enter table number and add items");
        return;
    }

    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    orders.push({
        table: table,
        items: cart,              // ✅ store items permanently
        time: new Date().toLocaleString(),
        status: "Pending"
    });

    localStorage.setItem("orders", JSON.stringify(orders));

    localStorage.removeItem("cart");
    cart = [];

    alert("Order sent to kitchen 👨‍🍳");
    window.location.href = "history.html";
}

/* CART PAGE LOAD */
if (document.getElementById("cart")) {
    let ul = document.getElementById("cart");
    let total = 0;

    cart.forEach(item => {
        ul.innerHTML += `<li>${item.name} - ₹${item.price}</li>`;
        total += item.price;
    });

    document.getElementById("total").innerText = total;
}

/* ORDER HISTORY PAGE */
if (document.getElementById("orderHistory")) {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.forEach(o => {
        orderHistory.innerHTML += `
            <li>
                🪑 Table ${o.table} |
                🕒 ${o.time} |
                💰 ₹${o.items.reduce((s,i)=>s+i.price,0)}
            </li>
        `;
    });
}

/* KITCHEN DASHBOARD (FIXED) */
if (document.getElementById("kitchenOrders")) {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    orders.forEach(o => {
        kitchenOrders.innerHTML += `
            <li>
                <strong>Table ${o.table}</strong><br>
                Items: ${o.items.map(i => i.name).join(", ")}<br>
                Status: ${o.status}
            </li>
            <hr>
        `;
    });
}
