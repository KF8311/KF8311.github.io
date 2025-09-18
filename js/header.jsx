const domNode = document.getElementById('app2');
function Header(props) {
    console.log(props);
    return <h1>Title</h1>;
}

function Body({ person }) {
    function handleClick() {
        console.log('increment like count');
        setLikes(likes + 1);
    }
    const gods = ['HT', 'Raydio', 'Q'];
    const [likes, setLikes] = React.useState(0);
    return (
        <div>
            <p>{person ? `Worship ${person}` : `Worship`}</p>
            <ul>
                {gods.map((god) => (
                    <li key={god}>{god}</li>
                ))}
            </ul>
            <button onClick={handleClick}>Like ({likes})</button>
        </div>
    )
}
const root = ReactDOM.createRoot(domNode);
root.render(
    <>
        <Header title="react" />
        <Body person="HT" />
    </>
);