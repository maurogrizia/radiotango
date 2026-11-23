import './styles.css';

const Component = () => {
    return (
        <>
        <h1>Shop</h1>
        </>
    );
};

const data = {
    title: {
        ES: "Tienda",
        EN: "Shop"
    },
    description: {
        ES: "Tienda de Radio Tango.",
        EN: "Radio Tango shop."
    },
    noindex: true,
    href: 'shop',
    body: <Component/>,
}

export default data;