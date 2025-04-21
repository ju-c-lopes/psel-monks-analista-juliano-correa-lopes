export const fetchProjetos = async () => {
    try {
        const response = await fetch(
            "http://localhost:8000/wp-json/wp/v2/projetos"
        );
        if (!response.ok) {
            throw new Error("Erro ao buscar os projetos");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao buscar projetos:", error);
        return [];
    }
};
