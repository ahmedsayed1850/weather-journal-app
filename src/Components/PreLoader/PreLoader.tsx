import "./PreLoader..css";

const Loader = () => {
  return (
    // pre loader when it fetch api is true (Loading)
    <div className="loader">
      <div className="pre-dot">
        <div className="pre-dot-ck"></div>
        <div className="pre-dot-ck"></div>
        <div className="pre-dot-ck"></div>
        <div className="pre-dot-ck"></div>
        <div className="pre-dot-ck"></div>
        <div className="pre-dot-ck"></div>
      </div>
    </div>
  );
};

export default Loader;
