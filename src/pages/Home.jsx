import {
  ArrowRight,
  CloudSun,
  QrCode,
  Brain,
  Thermometer,
  BarChart3,
  Leaf,
  ShieldCheck,
} from "lucide-react";

export default function Home() {
  return (
    <div className="site">

      {/* ================= NAVBAR ================= */}
      <header className="navbar">
        <div className="container nav-inner">

          <a href="/" className="brand">
            <div className="brand-logo">
              <Leaf size={22} />
            </div>

            <span>Cold<span className="brand-green">Shelf</span></span>
          </a>

          <nav className="nav-links">
            <a href="#home">Home</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#features">Features</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>

          <a href="/auth" className="nav-button">
            Get Started
            <ArrowRight size={17} />
          </a>

        </div>
      </header>


      {/* ================= HERO ================= */}
      <main>

        <section id="home" className="hero">
          <div className="container hero-grid">

            <div className="hero-content">

              <div className="hero-badge">
                <ShieldCheck size={16} />
                Smarter Perishable Inventory
              </div>

              <h1>
                Predict.
                <br />
                <span>Prevent.</span>
                <br />
                Protect.
              </h1>

              <p className="hero-description">
                Smarter insights for perishable inventory loss
                and better food safety.
              </p>

              <div className="hero-actions">

                <a href="/auth" className="primary-button">
                  Get Started
                  <ArrowRight size={18} />
                </a>

                <a href="#how-it-works" className="secondary-button">
                  See How It Works
                </a>

              </div>

              <div className="hero-note">
                Built for vendors, retailers and food businesses.
              </div>

            </div>


            {/* HERO VISUAL */}
            <div className="hero-visual">

              <div className="hero-image-wrapper">

                <img
                  src="/src/assets/coldshelf-hero.jpg"
                  alt="Market vendor handling fresh produce"
                  className="hero-image"
                />

                <div className="risk-card">

                  <div className="risk-card-top">
                    <span>Batch #47</span>
                    <span className="risk-warning">Take Action</span>
                  </div>

                  <div className="risk-product">
                    <div className="milk-icon">🥛</div>

                    <div>
                      <strong>Milk</strong>
                      <small>&lt; 24 hrs</small>
                    </div>
                  </div>

                  <div className="risk-score">
                    <div>
                      <small>Waste Risk</small>
                      <strong>78%</strong>
                    </div>

                    <div className="risk-bar">
                      <div className="risk-bar-fill"></div>
                    </div>
                  </div>

                </div>

              </div>

            </div>

          </div>
        </section>


        {/* ================= FEATURES ================= */}
        <section id="features" className="features-section">

          <div className="container">

            <div className="section-heading">
              <span>KEY FEATURES</span>

              <h2>
                Intelligence behind
                <br />
                every fresh product.
              </h2>

              <p>
                ColdShelf combines real-world storage conditions,
                weather data and intelligent models to help reduce
                avoidable food waste.
              </p>
            </div>


            <div className="feature-grid">

              <FeatureCard
                icon={<QrCode />}
                title="QR Scan"
                description="Quickly register incoming batches and connect every product with its inventory record."
              />

              <FeatureCard
                icon={<CloudSun />}
                title="Weather + Storage"
                description="Use local weather conditions and storage profiles to understand environmental risk."
              />

              <FeatureCard
                icon={<Brain />}
                title="ML Risk Model"
                description="Predict potential spoilage risk using product and environmental information."
              />

              <FeatureCard
                icon={<Thermometer />}
                title="Thermal Simulation"
                description="Estimate temperature exposure and its effect on perishable product freshness."
              />

              <FeatureCard
                icon={<BarChart3 />}
                title="Risk Dashboard"
                description="Turn complex data into clear actions such as normal, warning and take action."
              />

            </div>

          </div>

        </section>


        {/* ================= HOW IT WORKS ================= */}
        <section id="how-it-works" className="how-section">

          <div className="container">

            <div className="section-heading centered">

              <span>HOW IT WORKS</span>

              <h2>
                From delivery to
                <br />
                smarter decisions.
              </h2>

            </div>


            <div className="steps-grid">

              <Step
                number="01"
                title="Scan"
                text="Scan the QR code when a new batch arrives."
              />

              <Step
                number="02"
                title="Analyze"
                text="ColdShelf combines product, weather and storage information."
              />

              <Step
                number="03"
                title="Predict"
                text="The system calculates a dynamic spoilage risk."
              />

              <Step
                number="04"
                title="Act"
                text="Use the risk score to prioritize, discount or sell stock."
              />

            </div>

          </div>

        </section>


        {/* ================= ABOUT ================= */}
        <section id="about" className="about-section">

          <div className="container about-box">

            <div>
              <span className="section-label">ABOUT COLDSHELF</span>

              <h2>
                Less waste.
                <br />
                More freshness.
              </h2>
            </div>

            <p>
              ColdShelf is designed to help small retailers and
              food businesses make better decisions about
              perishable inventory before products become waste.
            </p>

          </div>

        </section>


        {/* ================= CTA ================= */}
        <section id="contact" className="cta-section">

          <div className="container cta-box">

            <div>
              <span>START SMARTER</span>

              <h2>
                Protect your inventory
                <br />
                before it becomes waste.
              </h2>
            </div>

            <a href="/auth" className="primary-button light-button">
              Get Started
              <ArrowRight size={18} />
            </a>

          </div>

        </section>

      </main>


      {/* ================= FOOTER ================= */}
      <footer className="footer">

        <div className="container footer-inner">

          <div className="brand footer-brand">
            <div className="brand-logo">
              <Leaf size={22} />
            </div>

            <span>Cold<span className="brand-green">Shelf</span></span>
          </div>

          <p>
            Predict. Prevent. Protect.
          </p>

          <span>
            © 2026 ColdShelf
          </span>

        </div>

      </footer>

    </div>
  );
}


/* ================= REUSABLE FEATURE CARD ================= */

function FeatureCard({ icon, title, description }) {
  return (
    <div className="feature-card">

      <div className="feature-icon">
        {icon}
      </div>

      <h3>{title}</h3>

      <p>{description}</p>

      <ArrowRight className="feature-arrow" size={18} />

    </div>
  );
}


/* ================= REUSABLE STEP ================= */

function Step({ number, title, text }) {
  return (
    <div className="step-card">

      <span className="step-number">{number}</span>

      <h3>{title}</h3>

      <p>{text}</p>

    </div>
  );
}