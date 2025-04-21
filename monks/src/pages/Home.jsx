import Header from "../layouts/Header";
import Products from "../components/Products";
import SimpleGallery from "../components/SimpleGallery";
import AppSection from "../components/AppSection";
import TagBox from "../components/TagBox";
import CardSection from "../components/CardSection";
import FormSection from "../components/FormSection";
import Footer from "../components/Footer";

const Home = () => {
    return (
        <>
            <Header />
            <Products />
            <SimpleGallery />
            <AppSection />
            <TagBox />
            <CardSection />
            <FormSection />
            <div className="divisor">
                <hr />
            </div>
            <Footer />
        </>
    )
}

export default Home;
