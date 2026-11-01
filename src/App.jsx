import { useState } from "react";
import "./App.css";

// Use only the supplied logo from src/assets.
const imageFiles = import.meta.glob("./assets/*", {
  eager: true,
  query: "?url",
  import: "default",
});

const logo =
  Object.entries(imageFiles).find(
    ([path]) => path.split("/").pop().toLowerCase() === "logo.png"
  )?.[1] || "";

// External photographs for the hero and menu.
// No locally supplied product images are used.
const photos = {
  hero: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1200&q=85",
  filterCoffee: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdIcBYmJYc1JCpKsx2nXxZvevb627bO_8QpkgDKxQ7zw&s=10",
  cappuccino: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=80",
  mocha: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&w=800&q=80",
  americano: "https://images.unsplash.com/photo-1497515114629-f71d768fd07c?auto=format&fit=crop&w=800&q=80",
  coldCoffee: "https://mytastycurry.com/wp-content/uploads/2020/04/Cafe-style-cold-coffee-with-icecream.jpg",
  vanilla: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwXyukJkxHx1XZjHu9tySa_fNN2k5VI6bAnfDLeO02okTwqSHEJZ-YZs8F&s=10",
 chocolate:
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIAzew2iqeE-0MyOjNKT2JZkS95RAsYGD2WxC467M51g&s=10",

lemonade:
  "https://images.squarespace-cdn.com/content/v1/5ed13dd3465af021e2c1342b/a5b1e544-ee89-4268-b9af-ab49e9cc7006/IMG_1986+%281%29.jpg",
  carbonated: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCONPgCAlxxCiMjd7_FFr6cGuU-YvAfvvV9-LlUW6w_A&s=10",
  tiramisu: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80",
  brownie: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
  cheesecake: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80",
  bananaFritters: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
  croissant: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80",
  bellam:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNFxX2kqEMaPySmzjEwj574bQLGVu432cRjbBi7CFKAg&s=10",
  cardamom:"https://i0.wp.com/shoptastingindia.com/wp-content/uploads/2023/06/Filter-Kaapi-min.jpg?resize=800%2C600&ssl=1",
  saffron:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9uIrGaRtcp2GyqMjdw1prAErRWEah_aui8r6y2Nlhmg&s=10",
  pistachio:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuAZDYkgHQDJ7bgK3UVFQB4L_YtEmW--m_6n4IIeCEYSKLk2TMflZbATQ&s=10",
  coconutCream:"https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRm9K1x5XIWcp_GOvFzEybdsJx9NdDGQ5dUhN-wdNe-lcsCc4Yk",



};

const menu = [
  {
    category: "Signature South Indian Coffee",
    shortCategory: "Signature Kaapi",
    products: [
      { name: "Classic Filter Kaapi", price: 349, image: photos.filterCoffee, filterKaapi: true },
      { name: "Strong Filter Kaapi – Small", price: 299, image: photos.filterCoffee, filterKaapi: true },
      { name: "Strong Filter Kaapi – Medium", price: 349, image: photos.filterCoffee, filterKaapi: true },
      { name: "Strong Filter Kaapi – Large", price: 399, image: photos.filterCoffee, filterKaapi: true },
      { name: "Bellam Kaapi (Jaggery)", price: 379, image: photos.bellam, filterKaapi: true },
      { name: "Cardamom Filter Kaapi", price: 399, image: photos.cardamom, filterKaapi: true },
      { name: "Iced Filter Kaapi", price: 399, image: photos.coldCoffee, filterKaapi: true },
      { name: "Saffron Kaapi", price: 599, image: photos.saffron, filterKaapi: true },
      { name: "Pistachio Kaapi", price: 549, image: photos.pistachio, filterKaapi: true },
      { name: "Coconut Cream Kaapi", price: 449, image: photos.coconutCream, filterKaapi: true },
    ],
  },
  {
    category: "Coffee That's Usual",
    shortCategory: "Everyday Coffee",
    products: [
      { name: "Cappuccino", price: 349, image: photos.cappuccino },
      { name: "Café Mocha", price: 399, image: photos.mocha },
      { name: "Americano", price: 299, image: photos.americano },
      { name: "Cold Coffee", price: 399, image: photos.coldCoffee },
    ],
  },
  {
    category: "Tea & Non-Coffee Beverages",
    shortCategory: "Other Beverages",
    products: [
      { name: "Vanilla Bean Steamer", price: 349, image: photos.vanilla },
      { name: "Hot Chocolate", price: 399, image: photos.chocolate },
      { name: "Fresh Lemon Soda", price: 299, image: photos.lemonade },
      { name: "Carbonated Coffee", price: null, image: photos.carbonated, packaging: true },
    ],
  },
  {
    category: "Snacks & Desserts",
    shortCategory: "Snacks & Desserts",
    products: [
      { name: "Filter Coffee Tiramisu", price: 599, image: photos.tiramisu },
      { name: "Filter Coffee Brownie", price: 399, image: photos.brownie },
      { name: "Mysore Pak Cheesecake", price: 599, image: photos.cheesecake },
      { name: "Pazham Pori (Banana Fritters)", price: 349, image: photos.bananaFritters },
      { name: "Croissant", price: 399, image: photos.croissant },
    ],
  },
];

function ProductCard({ product, onAdd }) {
  const [service, setService] = useState("Dining");
  const [packaging, setPackaging] = useState("Paper Cup");
  const [quantity, setQuantity] = useState(1);
  const [notice, setNotice] = useState("");

  function addSelection() {
    onAdd({
      name: product.name,
      price: product.price,
      service: product.filterKaapi ? "Dining" : service,
      packaging: product.packaging ? packaging : null,
      quantity,
    });
    setNotice("Added to your demo selection.");
  }

  return (
    <article className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} loading="lazy" />
        {product.packaging && (
          <span className="product-badge">Packaging options</span>
        )}
      </div>

      <div className="product-info">
        <p className="product-category">
          {product.filterKaapi
            ? "SOUTH INDIAN FILTER COFFEE"
            : product.packaging
              ? "CARBONATED BEVERAGE"
              : "KAPI KULTURE MENU"}
        </p>

        <h3>{product.name}</h3>

        <p className="product-price">
          {product.price == null
            ? "Price to be announced"
            : `₹${product.price}`}
        </p>

        {product.filterKaapi ? (
          <div className="service-note">
            <span>✓</span> Dining only
            <small>Takeaway is not available for filter kaapi.</small>
          </div>
        ) : (
          <div className="choice-group">
            <span className="choice-label">How would you like it?</span>
            <div className="choice-buttons">
              {["Dining", "Takeaway"].map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`choice-button ${service === option ? "selected" : ""}`}
                  onClick={() => setService(option)}
                  aria-pressed={service === option}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {product.packaging && (
          <div className="choice-group">
            <span className="choice-label">Choose packaging</span>
            <div className="choice-buttons">
              {["Paper Cup", "Can"].map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`choice-button ${packaging === option ? "selected" : ""}`}
                  onClick={() => setPackaging(option)}
                  aria-pressed={packaging === option}
                >
                  {option}
                </button>
              ))}
            </div>
            <small className="price-note">
              Paper cup and can prices are awaiting confirmation.
            </small>
          </div>
        )}

        <div className="product-actions">
          <div className="quantity-control">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              aria-label={`Decrease ${product.name} quantity`}
            >
              −
            </button>
            <span>{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.min(20, q + 1))}
              aria-label={`Increase ${product.name} quantity`}
            >
              +
            </button>
          </div>

          <button
            type="button"
            className="add-button"
            onClick={addSelection}
          >
            Add to selection
          </button>
        </div>

        {notice && <p className="selection-notice" role="status">{notice}</p>}
      </div>
    </article>
  );
}

function App() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selections, setSelections] = useState([]);

  const categories = ["All", ...menu.map((section) => section.shortCategory)];

  const visibleSections =
    activeCategory === "All"
      ? menu
      : menu.filter((section) => section.shortCategory === activeCategory);

  function addToSelection(item) {
    setSelections((previous) => [
      ...previous,
      { ...item, id: Date.now() + Math.random() },
    ]);
  }

  function removeSelection(id) {
    setSelections((previous) => previous.filter((item) => item.id !== id));
  }

  const pricedTotal = selections.reduce(
    (sum, item) => sum + (item.price ?? 0) * item.quantity,
    0
  );

  const hasUnpricedItems = selections.some((item) => item.price == null);

  return (
    <div className="site-shell" id="home">
      <header className="navbar">
        <a href="#home" className="brand" aria-label="Kapi Kulture home">
          {logo && <img className="brand-logo" src={logo} alt="Kapi Kulture logo" />}
          <span className="brand-name">
            KAPI KULTURE
            <small>ROOTED IN TRADITION</small>
          </span>
        </a>

        <nav className="nav-links" aria-label="Main navigation">
          <a href="#home">Home</a>
          <a href="#menu">Menu</a>
          <a href="#story">Our Story</a>
          <a href="#contact">Contact</a>
        </nav>

        <a className="nav-cta" href="#menu">EXPLORE MENU ↗</a>
      </header>

      <main>
        <section className="hero">
          <div className="hero-content">
            <p className="eyebrow">A NEW CHAPTER IN SOUTH INDIAN COFFEE</p>
            <h1>
              Rooted in tradition.
              <br />
              <em>Brewed for today.</em>
            </h1>
            <p className="hero-description">
              Discover the comforting character of South Indian kaapi,
              reimagined with a contemporary café spirit.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#menu">
                EXPLORE OUR MENU <span>↗</span>
              </a>
              <a className="text-link" href="#story">Discover our story ↗</a>
            </div>
            <p className="hero-note">SOUTH INDIAN SOUL · CONTEMPORARY CULTURE</p>
          </div>

          <div className="hero-visual">
            <img src={photos.hero} alt="Coffee prepared for serving" />
            <div className="hero-image-caption">
              <span>THE ART OF KAAPI</span>
              <span>EST. WITH CULTURE</span>
            </div>
          </div>
        </section>

        <section className="menu-section section-padding" id="menu">
          <div className="section-heading">
            <p className="eyebrow">THE KAPI KULTURE EXPERIENCE</p>
            <h2>A menu with <em>character.</em></h2>
            <p>
              From traditional filter kaapi to familiar café favourites,
              discover something worth slowing down for.
            </p>
          </div>

          <div className="category-filters" aria-label="Filter menu by category">
            {categories.map((category) => (
              <button
                type="button"
                key={category}
                className={`filter-button ${activeCategory === category ? "active" : ""}`}
                onClick={() => setActiveCategory(category)}
                aria-pressed={activeCategory === category}
              >
                {category}
              </button>
            ))}
          </div>

          {visibleSections.map((section) => (
            <div className="menu-category" key={section.category}>
              <div className="category-heading">
                <div>
                  <span className="category-number">
                    {String(menu.indexOf(section) + 1).padStart(2, "0")}
                  </span>
                  <h3>{section.category}</h3>
                </div>
                <span className="item-count">{section.products.length} ITEMS</span>
              </div>

              <div className="product-grid">
                {section.products.map((product) => (
                  <ProductCard
                    key={product.name}
                    product={product}
                    onAdd={addToSelection}
                  />
                ))}
              </div>
            </div>
          ))}

          <p className="menu-disclaimer">
            Prices shown are proposed prices and remain subject to confirmation.
            Carbonated Coffee prices are pending. This is a demonstration website,
            not a live ordering service.
          </p>
        </section>

        <section className="story-section section-padding" id="story">
          <div className="story-visual">
            <img src={photos.filterCoffee} alt="South Indian filter coffee" />
          </div>

          <div className="story-content">
            <p className="eyebrow">MORE THAN A CUP</p>
            <h2>Tradition in every pour. <em>Culture in every cup.</em></h2>
            <p>
              Kapi Kulture brings the familiar warmth of South Indian coffee
              into a modern café experience. From a classic filter kaapi to
              inventive flavours, every cup is an invitation to pause and connect.
            </p>
            <p className="story-draft">
              Brand story shown for demonstration. Final brand messaging to be
              confirmed by the Kapi Kulture team.
            </p>
            <a className="text-link" href="#menu">Find your favourite ↗</a>
          </div>
        </section>

        <section className="selection-section section-padding" id="selection">
          <div className="section-heading">
            <p className="eyebrow">YOUR DEMO SELECTION</p>
            <h2>A little taste of <em>Kapi Kulture.</em></h2>
            <p>
              Add items above to see your selections here. This is a preview only;
              nothing will be ordered or paid for.
            </p>
          </div>

          {selections.length === 0 ? (
            <p className="empty-selection">Your selection is empty for now.</p>
          ) : (
            <>
              <div className="selection-list">
                {selections.map((item) => (
                  <div className="selection-row" key={item.id}>
                    <div>
                      <strong>{item.name}</strong>
                      <p>
                        {item.quantity} × {item.service}
                        {item.packaging ? ` · ${item.packaging}` : ""}
                      </p>
                    </div>
                    <div className="selection-price">
                      <strong>
                        {item.price == null
                          ? "Price pending"
                          : `₹${item.price * item.quantity}`}
                      </strong>
                      <button type="button" onClick={() => removeSelection(item.id)}>
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="selection-total">
                <span>
                  {hasUnpricedItems ? "Subtotal for priced items" : "Proposed subtotal"}
                </span>
                <strong>₹{pricedTotal}</strong>
              </div>

              {hasUnpricedItems && (
                <p className="price-note">
                  The total excludes items whose prices have not yet been announced.
                </p>
              )}
            </>
          )}
        </section>

        <section className="contact-section" id="contact">
          <div>
            <p className="eyebrow">COME, MAKE YOURSELF AT HOME</p>
            <h2>Good coffee. Good company. <em>Great culture.</em></h2>
            <p>
              Kapi Kulture is taking shape. Stay tuned as the menu and brand
              experience come together.
            </p>
          </div>
          <a className="button button-light" href="#home">BACK TO TOP ↑</a>
        </section>
      </main>

      <footer className="footer">
        <a href="#home" className="footer-brand">
          {logo && <img src={logo} alt="" />}
          <span>KAPI KULTURE</span>
        </a>
        <p>Rooted in tradition. Brewed for today.</p>
        <span className="footer-note">WEBSITE DEMO · 2026</span>
      </footer>
    </div>
  );
}

export default App;