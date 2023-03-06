/**
 * @desc   Recipe instructions component
 * @param  {array} instructions - Array of instructions objects
 * @return {component} - The recipe instructions
 */
const Instructions = ({ instructions }) => {
    const instructionList = instructions.steps.map(step => {
        return (
            <li key={step.number}>
                {step.step}
            </li>
        )
    })

    return (
        <div className="instructions__container">
            <h2>Instructions</h2>
            <ol id="instructions">
                {instructionList}
            </ol>
        </div>
    )
}

export default Instructions