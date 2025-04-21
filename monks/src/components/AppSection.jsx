import { useEffect, useState } from 'react';

const AppSection = () => {
    const [app, setApp] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/wp-json/wp/v2/app_store")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Erro ao buscar os apps");
                }
                return response.json();
            })
            .then((data) => {
                if (data.length === 0) {
                    throw new Error("Nenhum app encontrado");
                }
                setApp(data);
            })
            .catch((error) => {
                console.error("Erro ao buscar apps:", error);
            });
    }, []);

    return (
        <section className="app-section">
            <div className="app-section--content">
                <h2 className="app-section--title">Lorem ipsum dolor sit amet consectetur</h2>
                <p className="app-section--description">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem sapiente dignissimos quibusdam voluptate corrupti, mollitia voluptas deserunt.
                </p>
            </div>
            <div className="app-section--image">
                {app.map((item) => (
                    <img
                        key={item.id}
                        src={item.acf?.imagem}
                        alt={item.acf?.descricao.length > 120
                            ? item.acf.descricao.slice(0, 120) + "..."
                            : item.acf.descricao ?? `App ${item.id}`}
                        className="app-section--image-item"
                    />
                ))}
            </div>
        </section>
    );
};

export default AppSection;