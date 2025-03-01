import React from 'react';

interface IconFontProps {
    type: string;
    text?: string;
    style?: React.CSSProperties;
    onClick?: () => void;
    className?: string;
    title?: string;
    animation?: string;
}

const IconFont = (props: IconFontProps) => {
    const {
        type,
        text,
        style,
        onClick,
        className = "",
        title,
        animation
    } = props;
    return (
        <i onClick={onClick} title={title} className={`iconfont ${type} ${className} ${animation}`} style={style}>
            {text}
        </i>
    )
}

export default IconFont