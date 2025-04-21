import { useEffect, useState } from "react";

const TagBox = () => {
    const [tags, setTags] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/wp-json/wp/v2/produto_tags?per_page=50")
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((tags) => {
                setTags(tags);
            })
            .catch(error => console.error('Error fetching tags:', error));
    }, []);

    return (
        <section className="tags-section">
            <h2>Lorem ipsum dolor sit amet consectetur</h2>
            <div className="tags-container">
                {tags.map((tag) => (
                    <a href={tag.link} className="tag" key={tag.id}>
                        {tag.name}
                    </a>
                ))}
            </div>
        </section>
    );
};

export default TagBox;
