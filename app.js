const WHATSAPP_NUMBER = "9603155131";
let allProducts = [];

async function initCatalog() {
  try {
    const responsible = await fetch('products.json');
    allProducts = await response.json();
    renderProducts(allProducts);
    setupFilters();
  } catch (error) {
    console.error("Failed to load products:", error);
  }
}

function renderProducts(items) {
  const container = document.getElementById('products-grid');

  if (items.length === 0) {
    container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #888; padding: 2rem;">No items currently available in this category.</p>`;
    return;
  }

  container.innerHTML = items.map(item => {
    const message = encodeURIComponent(`Hi! I want to order "${item.name}" (${item.pack}) for ₹${item.price} from your website.`);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

    return `
      <div class="card">
        <img src="${item.image}" alt="${item.name}" class="card-img" loading="lazy">
        <div class="card-body">
          <h3>${item.name}</h3>
          <p>${item.description}</p>
          <div class="card-meta">
            <span class="pack-size">${item.pack}</span>
            <span class="price">₹${item.price}</span>
          </div>
          <a href="${whatsappUrl}" target="_blank" class="btn-whatsapp">
            Order on WhatsApp
          </a>
        </div>
      </div>
    `;
  }).join('');
}

function setupFilters() {
  const buttons = document.querySelectorAll('.filter-btn');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      buttons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const selectedCategory = button.getAttribute('data-category');

      if (selectedCategory === 'all') {
        renderProducts(allProducts);
      } else {
        const filtered = allProducts.filter(item => item.category === selectedCategory);
        renderProducts(filtered);
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', initCatalog);
