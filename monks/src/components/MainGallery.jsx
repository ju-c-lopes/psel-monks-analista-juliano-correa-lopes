import PropTypes from "prop-types";

const MainGallery = ({ item }) => {
    const { title, acf, image } = item;

    return (
        <div className="main-gallery">
            <h2>{title.rendered}</h2>
            <p>{acf?.descricao}</p>
            <img
                src={image?.source_url}
                alt={
                    acf.descricao.length > 120
                        ? acf.descricao.slice(0, 120) + "..."
                        : acf.descricao
                }
            />
        </div>
    );
};

MainGallery.propTypes = {
    item: PropTypes.shape({
        title: PropTypes.shape({
            rendered: PropTypes.string.isRequired,
        }).isRequired,
        acf: PropTypes.shape({
            descricao: PropTypes.string,
        }),
        image: PropTypes.shape({
            source_url: PropTypes.string,
        }),
    }).isRequired,
};

export default MainGallery;
