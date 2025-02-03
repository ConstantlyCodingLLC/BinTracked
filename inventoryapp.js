document.getElementById("inventoryForm").addEventListener("submit", addInventoryItem);
document.getElementById("deliveryForm").addEventListener("submit", markDelivery);

let inventory = [];

function addInventoryItem(event) {
    event.preventDefault();

    const itemName = document.getElementById("itemName").value;
    const itemQuantity = document.getElementById("itemQuantity").value;

    if (itemName && itemQuantity) {
        const newItem = {
            name: itemName,
            quantity: parseInt(itemQuantity),
            delivered: false
        };
        inventory.push(newItem);
        renderInventory();
        document.getElementById("inventoryForm").reset();
    }
}

function markDelivery(event) {
    event.preventDefault();

    const deliveryItem = document.getElementById("deliveryItem").value;
    const deliveryDate = document.getElementById("deliveryDate").value;

    if (deliveryItem && deliveryDate) {
        const item = inventory.find(i => i.name.toLowerCase() === deliveryItem.toLowerCase());
        
        if (item) {
            item.delivered = true;
            alert(`Marked "${item.name}" as delivered on ${deliveryDate}`);
            renderInventory();
        } else {
            alert("Item not found in inventory.");
        }
        document.getElementById("deliveryForm").reset();
    }
}

function renderInventory() {
    const tableBody = document.getElementById("inventoryTable").getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ""; // Clear the table body

    inventory.forEach((item, index) => {
        const row = tableBody.insertRow();

        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);

        cell1.textContent = item.name;
        cell2.textContent = item.quantity;
        cell3.textContent = item.delivered ? "Delivered" : "Pending";

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Remove";
        deleteButton.onclick = () => removeItem(index);
        cell4.appendChild(deleteButton);
    });
}

function removeItem(index) {
    inventory.splice(index, 1);
    renderInventory();
}
