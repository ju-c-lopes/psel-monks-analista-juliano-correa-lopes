import PropTypes from "prop-types";

const GalleryCard = ({ item }) => {
    const { acf, image } = item;

    return (
        <div className="gallery-card">
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

GalleryCard.propTypes = {
    item: PropTypes.shape({
        acf: PropTypes.shape({
            descricao: PropTypes.string.isRequired,
        }),
        image: PropTypes.shape({
            source_url: PropTypes.string,
        }),
    }).isRequired,
};

export default GalleryCard;
