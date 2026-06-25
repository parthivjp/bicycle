// --- Database of Images & Pricing in INR ---
const productsBase = [
    { id: 1, price: 14999.00, image: "IMG-20260515-WA0058.jpg.jpeg" },
    { id: 2, price: 18500.00, image: "IMG20250725171210.jpg.jpeg" },
    { id: 3, price: 12499.00, image: "IMG20250725171247.jpg.jpeg" },
    { id: 4, price: 21999.00, image: "IMG20250725171255.jpg.jpeg" }
];

// --- Application State ---
let cart = [];
let currentLang = 'gu'; // Default language is Gujarati

// --- Multilingual Dictionary (English & Gujarati) ---
const dictionary = {
    en: {
        navBrand: "Sunride Bicycles",
        heroTitle: "Ride the Future",
        heroSub: "Discover our premium range of all-terrain fat bikes and mountain cruisers.",
        heroBtn: "Shop Now",
        secTitle: "Featured Bicycles",
        addCart: "Add to Cart",
        cartTitle: "Your Cart",
        total: "Total:",
        emptyCart: "Your cart is empty",
        alertEmpty: "Your cart is empty!",
        alertCheckout: "Checkout functionality would trigger here! \nTotal: ₹",
        
        // Form & Contact Translations
        contactTitle: "Contact Us",
        contactPhone: "Phone",
        contactAddress: "Address",
        contactMapText: "View on Google Maps",
        formName: "Full Name",
        formPhone: "Phone Number",
        formMessage: "Your Message",
        formSubmit: "Send Message",
        formSuccess: "Thank you! Your message has been sent. We will contact you soon.",

        footer: "© 2026 Sunride Bicycles. All rights reserved.",
        products: {
            1: { name: "Sunride Stealth Fat Bike", desc: "Aggressive styling with massive wide tires. Perfect for sand, snow, and rough terrain." },
            2: { name: "Sunride Eleven Pro Array", desc: "Fleet-ready high-performance mountain bikes with premium suspension systems." },
            3: { name: "Sunride Urban Cruiser", desc: "Sleek, durable frame designed for comfortable city commuting and light trails." },
            4: { name: "Sunride All-Terrain Series", desc: "The ultimate off-road companion featuring alloy star wheels and disc brakes." }
        }
    },
    gu: {
        navBrand: "સનરાઇડ બાયસિકલ્સ",
        heroTitle: "ભવિષ્યની સવારી કરો",
        heroSub: "અમારી પ્રીમિયમ ઓલ-ટેરેન ફેટ બાઇક્સ અને માઉન્ટેન ક્રૂઝર્સની શ્રેણી શોધો.",
        heroBtn: "હમણાં ખરીદો",
        secTitle: "વૈશિષ્ટિકૃત સાયકલ્સ",
        addCart: "કાર્ટમાં ઉમેરો",
        cartTitle: "તમારું કાર્ટ",
        total: "કુલ:",
        emptyCart: "તમારું કાર્ટ ખાલી છે",
        alertEmpty: "તમારું કાર્ટ ખાલી છે!",
        alertCheckout: "ચેકઆઉટ પ્રક્રિયા અહીં શરૂ થશે! \nકુલ: ₹",
        
        // Form & Contact Translations
        contactTitle: "અમારો સંપર્ક કરો",
        contactPhone: "ફોન",
        contactAddress: "સરનામું",
        contactMapText: "ગૂગલ મેપ્સ પર જુઓ",
        formName: "પૂરું નામ",
        formPhone: "ફોન નંબર",
        formMessage: "તમારો સંદેશ",
        formSubmit: "સંદેશ મોકલો",
        formSuccess: "આભાર! તમારો સંદેશ મોકલવામાં આવ્યો છે. અમે ટૂંક સમયમાં તમારો સંપર્ક કરીશું.",

        footer: "© 2026 સનરાઇડ બાયસિકલ્સ. સર્વાધિકાર સુરક્ષિત.",
        products: {
            1: { name: "સનરાઇડ સ્ટીલ્થ ફેટ બાઇક", desc: "આક્રમક સ્ટાઇલ અને પહોળા ટાયર. રેતી, બરફ અને ખરબચડા રસ્તાઓ માટે શ્રેષ્ઠ." },
            2: { name: "સનરાઇડ ઇલેવન પ્રો એરે", desc: "પ્રીમિયમ સસ્પેન્શન સિસ્ટમ સાથે હાઇ-પરફોર્મન્સ માઉન્ટેન બાઇક્સ." },
            3: { name: "સનરાઇડ અર્બન ક્રૂઝર", desc: "શહેરના રસ્તાઓ પર આરામદાયક મુસાફરી માટે મજબૂત અને આકર્ષક ફ્રેમ." },
            4: { name: "સનરાઇડ ઓલ-ટેરેન સિરીઝ", desc: "એલોય સ્ટાર વ્હીલ્સ અને ડિસ્ક બ્રેક્સ સાથે તમારો શ્રેષ્ઠ ઓફ-રોડ સાથી." }
        }
    }
};

// --- Format Currency Helper ---
function formatCurrency(amount) {
    return "₹" + amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// --- Initialization ---
document.addEventListener("DOMContentLoaded", () => {
    changeLanguage(); 
});

// --- Render Products dynamically based on language ---
function renderProducts() {
    const grid = document.getElementById("product-grid");
    grid.innerHTML = "";
    
    productsBase.forEach(item => {
        const translatedInfo = dictionary[currentLang].products[item.id];
        
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <div class="card-img-wrap">
                <img src="${item.image}" alt="${translatedInfo.name}">
            </div>
            <div class="card-content">
                <h3 class="card-title">${translatedInfo.name}</h3>
                <p class="card-desc">${translatedInfo.desc}</p>
                <div class="card-footer">
                    <span class="price">${formatCurrency(item.price)}</span>
                    <button class="add-btn" onclick="addToCart(${item.id})">
                        ${dictionary[currentLang].addCart}
                    </button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// --- Cart Functionality ---
function toggleCart() {
    document.getElementById("cart-sidebar").classList.toggle("active");
    document.getElementById("cart-overlay").classList.toggle("active");
}

function addToCart(productId) {
    const baseItem = productsBase.find(p => p.id === productId);
    cart.push({
        id: baseItem.id,
        price: baseItem.price
    });
    
    updateCartUI();
    
    const icon = document.querySelector('.cart-icon i');
    icon.style.transform = 'scale(1.3)';
    setTimeout(() => icon.style.transform = 'scale(1)', 200);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function updateCartUI() {
    document.getElementById("cart-count").innerText = cart.length;
    const cartItemsDiv = document.getElementById("cart-items");
    const cartTotalSpan = document.getElementById("cart-total");
    
    cartItemsDiv.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = `<p style="text-align:center; color:gray; margin-top: 2rem;">${dictionary[currentLang].emptyCart}</p>`;
    } else {
        cart.forEach((item, index) => {
            total += item.price;
            const translatedName = dictionary[currentLang].products[item.id].name;
            
            cartItemsDiv.innerHTML += `
                <div class="cart-item">
                    <div class="cart-item-details">
                        <h4>${translatedName}</h4>
                        <p>${formatCurrency(item.price)}</p>
                    </div>
                    <button class="remove-btn" onclick="removeFromCart(${index})">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            `;
        });
    }

    cartTotalSpan.innerText = formatCurrency(total);
}

function checkout() {
    const textData = dictionary[currentLang];
    if(cart.length === 0) return alert(textData.alertEmpty);
    
    const totalAmount = cart.reduce((a, b) => a + b.price, 0);
    alert(textData.alertCheckout + totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 }));
    
    cart = [];
    updateCartUI();
    toggleCart();
}

// --- Handle Contact Form Submission ---
function handleContactSubmit(event) {
    event.preventDefault(); // Prevents the page from reloading
    alert(dictionary[currentLang].formSuccess); // Shows success message in current language
    document.getElementById("contact-form").reset(); // Clears the form fields
}

// --- Smooth Scrolling ---
function scrollToProducts() {
    document.getElementById("section-title").scrollIntoView({ behavior: 'smooth' });
}

// --- Multi-language Toggle ---
function changeLanguage() {
    currentLang = document.getElementById("lang-select").value;
    const langData = dictionary[currentLang];

    const setElementText = (id, text) => {
        const el = document.getElementById(id);
        if (el) el.innerText = text;
    };

    setElementText("nav-brand", langData.navBrand);
    setElementText("hero-title", langData.heroTitle);
    setElementText("hero-subtitle", langData.heroSub);
    setElementText("hero-btn", langData.heroBtn);
    setElementText("section-title", langData.secTitle);
    setElementText("cart-title", langData.cartTitle);
    setElementText("total-text", langData.total);
    
    // Updates for Contact Information
    setElementText("contact-title", langData.contactTitle);
    setElementText("contact-phone-title", langData.contactPhone);
    setElementText("contact-address-title", langData.contactAddress);
    setElementText("contact-address-link", langData.contactMapText);

    // Updates for Contact Form Placeholders & Button
    const formName = document.getElementById("form-name");
    if(formName) formName.placeholder = langData.formName;
    
    const formPhone = document.getElementById("form-phone");
    if(formPhone) formPhone.placeholder = langData.formPhone;
    
    const formMessage = document.getElementById("form-message");
    if(formMessage) formMessage.placeholder = langData.formMessage;
    
    setElementText("form-submit", langData.formSubmit);

    const checkoutBtn = document.getElementById("checkout-btn");
    if (checkoutBtn && langData.checkout) {
        checkoutBtn.innerText = langData.checkout;
    }

    const footerText = document.getElementById("footer-text");
    if (footerText) footerText.innerHTML = langData.footer;

    document.documentElement.lang = currentLang;

    renderProducts();
    updateCartUI();
}