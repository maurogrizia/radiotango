import { useContext, useState, useRef } from 'react';
import ContentContext from 'context/content/Context';

import { Form, ListGroup } from "react-bootstrap";

const Component = () => {
    const [search, setSearch] = useState('');
    const ref = useRef(null);
    const { changeContentRight, changeIsClosedRight } = useContext(ContentContext);
    const entries = [
        {
            date: '2024/06/06',
            name: 'Electrotango Chill Instrumental',
            href: 'ChillIns1',
        },
        {
            date: '2024/06/09',
            name: 'Lofi Tango',
            href: 'Lofi1',
        },
        {
            date: '2024/06/09',
            name: 'Tango de orquesta',
            href: 'Orquesta1',
        },
        {
            date: '2024/06/09',
            name: 'Mujeres en el tango',
            href: 'Women1',
        },
        {
            date: '2024/06/09',
            name: 'Tango Nuevo',
            href: 'Nuevo1',
        },
    ];
    const filtered = search === ''? entries : entries.filter((x) => {return x.name.toLowerCase().includes(search)});
    const ordered = filtered.sort((a,b) => {return a.date > b.date;});

    const handleClick = (event) => {
        const target = event.currentTarget;
        const idxContentRight = target.dataset.href;

        changeContentRight(idxContentRight);
        changeIsClosedRight(false);
    };

    return (
        <>
        <p>
            Acá les traigo mis selecciones de tango curadas para distintos momentos de la vida:
        </p>
        <Form.Control
          autoFocus
          className="my-2"
          onChange={(e) => {setSearch(e.currentTarget.value.toLowerCase())}}
          ref={ref}
        />
        <ListGroup as="ul" variant="secondary">
            {ordered.map((artist) => {
                const label = artist.name;
                const href = artist.href;

                return (
                    <ListGroup.Item action variant="secondary" key={label} as="li" onClick={handleClick} data-href={href}>
                        {label}
                    </ListGroup.Item>
                );
            })}
        </ListGroup>
        </>
    );
};

const data = {
    title: 'Special',
    body: <Component/>
};

export default data;