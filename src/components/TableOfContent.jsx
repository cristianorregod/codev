'use client'
import React, { useEffect, useState } from 'react'

const TableOfContents = () => {
    const [headings, setHeadings] = useState([])

    useEffect(() => {
        // Obtener todas las etiquetas h2 del artículo
        const h2Elements = document.querySelectorAll('article h2[id]')

        const headingData = Array.from(h2Elements).map((heading) => ({
            id: heading.id,
            title: heading.innerText,
        }))

        setHeadings(headingData)
    }, [])

    return (
        <nav className="hidden lg:block lg:sticky lg:top-24 self-auto min-w-80 rounded-lg shadow-sm shadow-slate-500 p-4 text-[15px]">
            <h2 className="text-crusta-800 dark:text-crusta-300 font-bold mb-4">Tabla de Contenidos</h2>
            <ol>
                {headings.map((heading) => (
                    <li key={heading.id} className="mb-2">
                        <a className="hover:underline text-dark-700 dark:text-dark-200" href={`#${heading.id}`}>
                            # {heading.title}
                        </a>
                    </li>
                ))}
            </ol>
        </nav>
    )
}

export default TableOfContents
