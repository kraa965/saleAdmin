import './LoaderButton.scss';

const LoaderButton = ({color}) => {
    return (
        <div style={{borderColor: `${color}`}} class="loaderPurchases"></div>
    )
};

export default LoaderButton;