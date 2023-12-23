const Button = (props) => {
    const { children = "...", classname = "bg-red-700", onClick=()=>{}, type = "button" } = props;
    return (
        <button className={`${classname} text-white rounded p-2`} type={type} onClick={onClick}>{children}</button>
    )
}

export default Button;