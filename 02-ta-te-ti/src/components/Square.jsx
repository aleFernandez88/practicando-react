/* eslint-disable react/prop-types */
export const Square = ({ children, isSelected, updateBoard, index }) => {

    const className = `square${isSelected ? " is-selected" : ""}`
    const handleClick = () => {
      updateBoard(index)
    }
    return (
      // cuando hagan click en algún cuadrado (div square), va a ejecutar el handleClick que ejecuta a updateBoard que hace un toggle entre X y O.
      <div
        className={className}
        onClick={handleClick}
      >
        {children}
      </div>
    )
  }