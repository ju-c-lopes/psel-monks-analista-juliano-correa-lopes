import { useEffect, useState } from "react";
import Card from "./Card";

const Products = () => {
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/wp-json/wp/v2/produtos")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Erro ao buscar os produtos");
                }
                return response.json();
            })
            .then((data) => {
                if (data.length === 0) {
                    throw new Error("Nenhum produto encontrado");
                }
                setProdutos(data);
            })
            .catch((error) => {
                console.error("Erro ao buscar produtos:", error);
            });
    }, []);

    return (
        <section className="products">
            <div className="products_title">
                <h2>Lorem ipsum dolor sit amet consectetur</h2>
                <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex
                    maiores cupiditate aliquam. Voluptatum excepturi ipsa ad sit
                    quos quaerat, voluptatibus eius, nisi corrupti consequatur,
                    dolore unde doloremque aliquam! Magni, mollitia.
                </p>
            </div>
            <div className="products_list">
                {produtos.map((produto) => (
                    <Card
                        key={produto.id}
                        title={produto.title?.rendered.split(" ").slice(0, 3).join(" ") ?? `Produto ${produto.id}`}
                        description={produto.acf?.descricao.split(" ").slice(0, 6).join(" ") + "."}
                        image={produto.acf?.imagem}
                    />
                ))}
            </div>
        </section>
    );
};

export default Products;
