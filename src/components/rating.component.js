import { useState } from "react";

function Rating(props) {
    const [isHovered, setisHovered] = useState(false);

    const handleHover = () => {
        setisHovered(true);
    };

    const handleOut = () => {
        setisHovered(false);
    };

    const getClassName = () => {
        const { isRated } = props;
        let className = isRated ? "bi bi-star-fill" : "bi bi-star";
        className += isHovered ? " text-primary" : "";
        return className;
    };
    const { handleToggleRating, rank } = props;

    return (
        <>
            <i
                onMouseOver={handleHover}
                onMouseOut={handleOut}
                onClick={() => handleToggleRating(rank)}
                className={getClassName()}
            ></i>
        </>
    );
}

export default Rating;
