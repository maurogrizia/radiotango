const followLink = (e, changePlayer, changeContentRight) => {
    const followLinkFuncs = {
        song: (data) => {
            changePlayer(data);
        },
        article: (data) => {
            changeContentRight(data.href);
        }
    };
    const target = e.currentTarget;
    const dataset = target.dataset;

    if (followLinkFuncs[dataset.type]) {
        followLinkFuncs[dataset.type]({...dataset});
    }
};
const handleClick = (e) => {
    const target = e.currentTarget;
    const dataset = target.dataset;

    followLink(e);

    const iconAbs = document.getElementById('icon-abs');

    console.log(dataset)
    if (dataset.type === 'song') {
        iconAbs.classList.add('show');
        setTimeout(() => {
            iconAbs.classList.remove('show');
        }, 2500);
    }
}

export {handleClick};