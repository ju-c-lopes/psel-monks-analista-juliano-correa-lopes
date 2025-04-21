import { useEffect, useState } from "react";
import Card from "./Card";

const CardSection = () => {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/wp-json/wp/v2/produtos?per_page=3")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Erro ao buscar os cards");
                }
                return response.json();
            })
            .then((data) => {
                if (data.length === 0) {
                    throw new Error("Nenhum card encontrado");
                }
                setCards(data);
            })
            .catch((error) => {
                console.error("Erro ao buscar cards:", error);
            });
    }, []);

    return (
        <section className="card-section">
            <div className="card-container">
                {cards.map((card) => (
                    <Card
                        key={card.id}
                        linkNumber={card.id}
                        classType="card-section--card"
                        title={card.title.rendered.split(" ").slice(0, 5).join(" ")}
                        description={card.acf?.descricao.split(" ").slice(0, 20).join(" ")}
                        cardButton={card.acf?.botao_texto}
                        cardLink={card.acf?.botao_link}
                    />
                ))}
            </div>
        </section>
    );
};

export default CardSection;
