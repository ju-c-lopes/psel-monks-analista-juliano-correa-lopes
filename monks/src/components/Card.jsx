import PropTypes from 'prop-types';

const Card = ({ linkNumber, classType, title, description, image, cardButton, cardLink }) => {
    return (
        <div className={classType || "card"}>
            {image && <div className="card_image">
                <img
                    src={image}
                    alt={
                        description.length > 120
                            ? description.slice(0, 120) + "..."
                            : description
                    }
                />
            </div>}
            <h3 dangerouslySetInnerHTML={{ __html: title }} />
            <p dangerouslySetInnerHTML={{ __html: description }} />
            {cardButton && cardLink && <button className="card_button" target="_blank"><a href={cardLink || "#link" + linkNumber} rel="noopener noreferrer">{cardButton}</a></button>}
        </div>
    );
};

Card.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string,
    cardButton: PropTypes.string,
    cardLink: PropTypes.string,
    linkNumber: PropTypes.number,
    classType: PropTypes.string,
};

export default Card;
