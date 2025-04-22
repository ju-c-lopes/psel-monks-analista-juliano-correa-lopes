import { useState, useEffect } from "react";
import logoHero from "../assets/images/logo.png";
import dnaMonks from "../assets/images/Image.png";
import Scroll from "../assets/images/Scroll.png";
import ScrollBack from "../assets/images/Scroll-back.png";

const Hero = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen((prev) => !prev);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setMenuOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <section className="hero">
            <div className={menuOpen ? "hero_nav__box ativo" : "hero_nav__box"}>

                <div className="hero_top">
                    <nav className="hero__nav">
                        <div className={menuOpen ? "hero__logo ativo" : "hero__logo"}>
                            <img src={logoHero} alt="Logo" />
                        </div>
                        <ul className={menuOpen ? "ativo" : ""}>
                            <li><a href="#catalogo1">Catálogo 1</a></li>
                            <li><a href="#catalogo2">Catálogo 2</a></li>
                            <li><a href="#catalogo3">Catálogo 3</a></li>
                            <li><a href="#catalogo4">Catálogo 4</a></li>
                        </ul>
                        <img className={menuOpen ? "back ativo" : "back"} src={ScrollBack} alt="" />
                    </nav>
                    <div className="hero__menu-toggle" onClick={toggleMenu}>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                    </div>
                </div>

                <div className={menuOpen ? "hero_box ativo" : "hero_box"}>
                    <div className="hero_title">
                        <h1>Lorem, ipsum dolor sit amet consectetur</h1>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate cumque qui sit illum, nostrum maiores.</p>
                    </div>
                    <div className="hero_box__image">
                        <img src={Scroll} alt="Scroll Icon" />
                    </div>
                </div>
            </div>

            <div className="hero_image__right">
                <img className={menuOpen ? "ativo" : ""} src={dnaMonks} alt="DNA Monks" />
            </div>
        </section>
    );
};

export default Hero;
