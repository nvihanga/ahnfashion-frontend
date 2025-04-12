
const LoadingSpinner = ({ fullScreen = false }) => (
    <div className={`loading-spinner ${fullScreen ? 'full-screen' : ''}`}>
      <div className="spinner"></div>
    </div>
  );
  
  export default LoadingSpinner;