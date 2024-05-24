import './LoaderButton.scss';

const LoaderButton = ({color}) => {
    return (
        <div style={{borderColor: `${color}`}} class="loaderButton"></div>
    )
};

export default LoaderButton;