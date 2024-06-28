import './LoaderButton.scss';

const LoaderButton = ({color}) => {
    return (
        <div style={{borderColor: `${color}`}} class="loader_client"></div>
    )
};

export default LoaderButton;