import { useEffect, useState } from "react";
import GalleryCard from "./GalleryCard";
import MainGallery from "./MainGallery";

const SimpleGallery = () => {
    const [galleries, setGalleries] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/wp-json/wp/v2/gallery?_embed")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Erro ao buscar as galerias");
                }
                return response.json();
            })
            .then((data) => {
                if (data.length === 0) {
                    throw new Error("Nenhuma galeria encontrada");
                }
                const enriched = data
                    .sort((a, b) => a.acf.order - b.acf.order)
                    .map((item) => ({
                        ...item,
                        image:
                            item._embedded?.["wp:featuredmedia"]?.[0] || null,
                        order: Number(item.acf.order) || 0,
                    }));

                setGalleries(enriched);
            })
            .catch((error) => {
                console.error("Erro ao buscar galerias:", error);
            });
    }, []);

    const mainItem = galleries.find((gallery) => gallery.order === 1);
    const secondaryItems = galleries.filter(
        (gallery) => gallery.order !== 1
    );

    return (
        <section className="gallery">
            <div className="gallery_list">
                {mainItem && <MainGallery item={mainItem} />}
                <div className="gallery_list--cards">
                    {secondaryItems.map((item) => (
                        <GalleryCard key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SimpleGallery;
