import React, { useState } from "react";
import "../Landing/landingPage.scss";
import axios from "axios";
import { login } from "../util/Auth";

export default function LandingPage() {

    const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

 const doLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login(username, password);
      console.log("Login success, access token:", res.token);
      window.location.href = "/dashboard"; // redirect
    } catch (err) {
      console.log("Login error:", err);
      alert("Login failed");
    }
  };
  return (
    <div className="landing-wrapper">
      {/* HEADER */}
      <header>
        <div className="nav">
          <div className="brand">
            <img src="/img/logo1.png" />
            <div>
              <h1>e-Aushadhi</h1>
              <p>Government of Andhra Pradesh</p>
            </div>
          </div>

          <div className="menu">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#login">Login</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section id="home" className="hero">
        <h2>Andhra Pradesh Drug Supply Chain System</h2>
        <p>
          Ensuring timely procurement, storage, and distribution of essential
          medicines across all health facilities in Andhra Pradesh.
        </p>
      </section>
       {/* LOGIN */}
      <section id="login" className="login-section">
        <div className="login-box">
          <h3>Login</h3>

          <form onSubmit={doLogin}>
            <label>Username</label>
            <input type="text" placeholder="Enter username"  value={username}
        onChange={(e) => setUsername(e.target.value)}/>

            <label>Password</label>
            <input type="password" placeholder="Enter password"  value={password}
        onChange={(e) => setPassword(e.target.value)}/>

            <button type="submit">Login</button>
          </form>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="services">
        <h3>Our Services</h3>

        <div className="cards">
          <div className="card">
            <h4>Drug Warehouse</h4>
            <p>
              Central & district warehouses that handle the storage of medicines.
            </p>
          </div>

          <div className="card">
            <h4>Dashboard</h4>
            <p>
              Real-time monitoring of stock availability and drug movement.
            </p>
          </div>

          <div className="card">
            <h4>Procurement</h4>
            <p>
              Efficient procurement management with transparent workflows.
            </p>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="about">
        <h3>About</h3>
        <p>
          e-Aushadhi AP manages procurement, storage, and quality control of
          medicines ensuring uninterrupted supply to hospitals and health centers.
        </p>
      </section>

     

      {/* CONTACT */}
      <section id="contact" className="contact">
        <h3>Contact Us</h3>
        <p>For queries, reach out to APMSIDC support.</p>
      </section>

      {/* FOOTER */}
      <footer>
        © {new Date().getFullYear()} Government of Andhra Pradesh | Drug Supply Chain System
      </footer>
    </div>
  );
}
