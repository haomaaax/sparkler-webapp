const GenerateButton = ({isGenerating, onClick}) => {
    return (
        <div className="prompt-buttons">
            <a
            className={
                isGenerating ? "generate-button loading" : "generate-button"
            }
            onClick={onClick}
            >
            <div className="generate">
                {isGenerating ? (
                <span className="loader"></span>
                ) : (
                <p>Generate</p>
                )}
            </div>
            </a>
        </div>
    )
}

export default GenerateButton