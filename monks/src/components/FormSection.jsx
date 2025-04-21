import { useEffect, useState } from "react";
import formImage from "../assets/images/form-ilustration.png";

const FormSection = () => {
    const [numero1, setNumero1] = useState(0);
    const [numero2, setNumero2] = useState(0);
    const [resultado, setResultado] = useState("");
    const [formData, setFormData] = useState({
        categoria1: "",
        categoria2: "",
        categoria3: "",
        categoria4: "",
    });
    const [status, setStatus] = useState("idle");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        gerarNovosNumeros();
    }, []);

    const gerarNovosNumeros = () => {
        const n1 = Math.floor(100 + Math.random() * 900);
        const n2 = Math.floor(100 + Math.random() * 900);
        setNumero1(n1);
        setNumero2(n2);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validarCampos = () => {
        const novosErros = {};

        if (!formData.categoria1.trim())
            novosErros.categoria1 = "Campo obrigatório";
        if (!formData.categoria2.trim())
            novosErros.categoria2 = "Campo obrigatório";
        if (!resultado.trim()) novosErros.resultado = "Campo obrigatório";
        else if (isNaN(resultado))
            novosErros.resultado = "Digite um número válido";

        setErrors(novosErros);
        return Object.keys(novosErros).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validarCampos()) return;

        const soma = numero1 + numero2;
        if (parseInt(resultado) !== soma) {
            setErrors({
                resultado: "Resultado incorreto da verificação de segurança",
            });
            return;
        }

        setStatus("loading");

        try {
            const response = await fetch(
                "http://localhost:8000/wp-json/custom/v1/enviar-formulario",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        categoria1: formData.categoria1,
                        categoria2: formData.categoria2,
                        categoria3: formData.categoria3,
                        categoria4: formData.categoria4,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Erro ao enviar formulário");
            }

            setStatus("success");
            alert("Formulário enviado com sucesso!");

            setFormData({
                categoria1: "",
                categoria2: "",
                categoria3: "",
                categoria4: "",
            });
            setResultado("");
            gerarNovosNumeros();
        } catch (error) {
            console.error("Erro ao enviar o formulário:", error);
            setStatus("error");
            alert("Erro ao enviar o formulário. Tente novamente.");
        } finally {
            setStatus("idle");
        }
    };

    return (
        <section className="form-section">
            <div className="form-image">
                <img
                    src={formImage}
                    alt="Esboço usuário trabalhando com comunicação"
                />
            </div>

            <form className="form-content" onSubmit={handleSubmit}>
                <h2>Lorem ipsum dolor sit amet</h2>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Assumenda officia laudantium, dicta illum delectus sunt
                    minima mollitia consequuntur.
                </p>
                <small>*Lorem ipsum dolor sit amet consectetur</small>

                <div className="form-group">
                    <input
                        type="text"
                        name="categoria1"
                        placeholder={
                            errors.categoria1 ? errors.categoria1 : "Categoria*"
                        }
                        value={formData.categoria1}
                        onChange={handleChange}
                        className={errors.categoria1 ? "input-error" : ""}
                    />

                    <input
                        type="text"
                        name="categoria2"
                        placeholder={
                            errors.categoria2 ? errors.categoria2 : "Categoria*"
                        }
                        value={formData.categoria2}
                        onChange={handleChange}
                        className={errors.categoria2 ? "input-error" : ""}
                    />

                    <input
                        type="text"
                        name="categoria3"
                        placeholder="Categoria"
                        value={formData.categoria3}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="categoria4"
                        placeholder="Categoria"
                        value={formData.categoria4}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-security">
                    <h3>Verificação de Segurança</h3>
                    <span className="calculate">
                        {numero1} + {numero2}
                    </span>
                    <span>=</span>
                    <input
                        type="text"
                        name="resultado"
                        className={errors.resultado ? "input-error" : ""}
                        placeholder={
                            errors.resultado ? errors.resultado : "Resultado*"
                        }
                        value={resultado}
                        onChange={(e) => setResultado(e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    disabled={status === "loading"}
                    className={status === "loading" ? "loading" : ""}
                >
                    {status === "loading" ? "Enviando..." : "Lorem ipsum"}
                </button>
            </form>
        </section>
    );
};

export default FormSection;
