import Header from "./components/Header";
import Slider from "./components/Slider";
import Latestnews from "./components/Latestnews";
import About from "./components/About";
import Services from "./components/Services";
import Punchline from "./components/Punchline";
import Footer from "./components/Footer";

function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Slider />
         <Latestnews />
        <About />
        <Services />
        <Punchline />
      </main>
      <Footer />
    </>
  );
}

export default Home;
