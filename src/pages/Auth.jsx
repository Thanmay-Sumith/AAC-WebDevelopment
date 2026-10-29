import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Leaf,
  Mail,
  Lock,
  User,
} from "lucide-react";

function Auth() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("signin");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "vendor",
    remember: false,
    terms: false,
  });

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  }
function handleSubmit(event) {
  event.preventDefault();

  if (mode === "signup") {
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (!formData.terms) {
      alert("Please accept the Terms and Conditions.");
      return;
    }
  }

  if (formData.role === "vendor") {
    navigate("/vendor");
  } else {
    alert("Buyer dashboard will be connected later.");
  }
}


  return (
    <div className="auth-page">

      {/* LEFT SIDE */}
      <section className="auth-left">

        <a href="/" className="brand auth-brand">
          <span className="brand-mark">
            <Leaf size={24} strokeWidth={2.2} />
          </span>

          <span>ColdShelf</span>
        </a>

        <div className="auth-copy">
          <p className="eyebrow">
            SMARTER INVENTORY <span>•</span> LESS WASTE
          </p>

          <h1>
            Keep food
            <em>fresher.</em>
          </h1>

          <p>
            Track your inventory, understand spoilage risk, and make
            smarter decisions before valuable food goes to waste.
          </p>

          <div className="auth-highlights">

            <div>
              <span>
                <Leaf size={20} />
              </span>

              <strong>Reduce Waste</strong>

              <small>
                Identify high-risk stock before it becomes a loss.
              </small>
            </div>

            <div>
              <span>
                <Lock size={19} />
              </span>

              <strong>Simple & Secure</strong>

              <small>
                Your inventory information stays protected.
              </small>
            </div>

          </div>
        </div>

        <div className="auth-produce">
          <span className="produce produce-one">🥬</span>
          <span className="produce produce-two">🍅</span>
          <span className="produce produce-three">🥕</span>
          <span className="produce produce-four">🍎</span>

          <div className="produce-caption">
            Freshness starts<br />
            with better decisions.
          </div>
        </div>

      </section>


      {/* RIGHT SIDE */}
      <section className="auth-right">

        <div className="auth-card">

          {/* SIGN IN / SIGN UP TABS */}
          <div className="auth-tabs">

            <button
              type="button"
              className={mode === "signin" ? "active" : ""}
              onClick={() => setMode("signin")}
            >
              Sign In
            </button>

            <button
              type="button"
              className={mode === "signup" ? "active" : ""}
              onClick={() => setMode("signup")}
            >
              Sign Up
            </button>

          </div>


          <form onSubmit={handleSubmit}>

            {/* FULL NAME - ONLY FOR SIGN UP */}
            {mode === "signup" && (
              <label className="field">

                <span>Full Name</span>

                <div className="input-wrap">
                  <User size={17} />

                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

              </label>
            )}


            {/* EMAIL */}
            <label className="field">

              <span>Email Address</span>

              <div className="input-wrap">
                <Mail size={17} />

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

            </label>


            {/* PASSWORD */}
            <label className="field">

              <span>Password</span>

              <div className="input-wrap">

                <Lock size={17} />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <button
                  type="button"
                  className="icon-btn"
                  onClick={() =>
                    setShowPassword((previous) => !previous)
                  }
                  aria-label="Show or hide password"
                >
                  {showPassword ? (
                    <EyeOff size={17} />
                  ) : (
                    <Eye size={17} />
                  )}
                </button>

              </div>

            </label>


            {/* CONFIRM PASSWORD - ONLY FOR SIGN UP */}
            {mode === "signup" && (
              <label className="field">

                <span>Confirm Password</span>

                <div className="input-wrap">

                  <Lock size={17} />

                  <input
                    type={
                      showConfirmPassword ? "text" : "password"
                    }
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />

                  <button
                    type="button"
                    className="icon-btn"
                    onClick={() =>
                      setShowConfirmPassword(
                        (previous) => !previous
                      )
                    }
                    aria-label="Show or hide confirm password"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>

                </div>

              </label>
            )}


            {/* VENDOR / BUYER */}
            {mode === "signup" && (
              <div className="field">

                <span>Account Type</span>

                <div className="role-grid">

                  <button
                    type="button"
                    className={`role-card ${
                      formData.role === "vendor"
                        ? "selected"
                        : ""
                    }`}
                    onClick={() =>
                      setFormData((previous) => ({
                        ...previous,
                        role: "vendor",
                      }))
                    }
                  >
                    <i></i>

                    <span>
                      <strong>Vendor</strong>
                      <small>
                        Manage your inventory
                      </small>
                    </span>
                  </button>


                  <button
                    type="button"
                    className={`role-card ${
                      formData.role === "buyer"
                        ? "selected"
                        : ""
                    }`}
                    onClick={() =>
                      setFormData((previous) => ({
                        ...previous,
                        role: "buyer",
                      }))
                    }
                  >
                    <i></i>

                    <span>
                      <strong>Buyer</strong>
                      <small>
                        Find available stock
                      </small>
                    </span>
                  </button>

                </div>

              </div>
            )}


            {/* SIGN UP TERMS */}
            {mode === "signup" && (
              <label className="terms">

                <input
                  type="checkbox"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                />

                <span>
                  I agree to the <b>Terms and Conditions</b> and
                  understand how ColdShelf uses my information.
                </span>

              </label>
            )}


            {/* SIGN IN OPTIONS */}
            {mode === "signin" && (
              <div className="form-row">

                <label className="remember">

                  <input
                    type="checkbox"
                    name="remember"
                    checked={formData.remember}
                    onChange={handleChange}
                  />

                  <span>Remember me</span>

                </label>

                <button
                  type="button"
                  className="forgot"
                  onClick={() =>
                    alert(
                      "Password recovery will be connected to the backend later."
                    )
                  }
                >
                  Forgot password?
                </button>

              </div>
            )}


            {/* SUBMIT */}
            <button type="submit" className="submit-btn">
              {mode === "signin" ? "Sign In" : "Create Account"}

              <ArrowLeft
                size={16}
                style={{ transform: "rotate(180deg)" }}
              />
            </button>

          </form>


          {/* SWITCH BETWEEN SIGN IN / SIGN UP */}
          <p className="switch-text">

            {mode === "signin"
              ? "Don't have an account?"
              : "Already have an account?"}

            <button
              type="button"
              onClick={() =>
                setMode(
                  mode === "signin" ? "signup" : "signin"
                )
              }
            >
              {mode === "signin" ? "Sign Up" : "Sign In"}
            </button>

          </p>


          {/* BACK TO HOME */}
          <a href="/" className="back-home">
            ← Back to ColdShelf
          </a>

        </div>

      </section>

    </div>
  );
}

export default Auth;
