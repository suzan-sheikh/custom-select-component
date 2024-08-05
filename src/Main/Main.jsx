import toast from "react-hot-toast";

const Main = () => {

    const value = true;

    const handleClick = () => {
        if (value) {
            toast.success('Successfully toasted!');
        }
    };

    return (
        <div>
            <button onClick={handleClick}>Project Start</button>
        </div>
    );
};

export default Main;
