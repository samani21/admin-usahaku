import React from 'react'

type Props = {
    className: string;
    htmlContent: string;
}

const ExpendDescription = ({ className, htmlContent }: Props) => {
    return (
        <div
            className={className}
            dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
    )
}

export default ExpendDescription