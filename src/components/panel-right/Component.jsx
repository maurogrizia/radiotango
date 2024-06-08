import {  useContext,
          useState }        from 'react';

import {  Button, 
          Card, 
          ListGroup}        from 'react-bootstrap';
import {  FaRegWindowClose,
          FaCaretUp,
          FaCaretDown,
          FaVolumeUp}       from 'react-icons/fa';
import    YouTube           from 'react-youtube';

import    ContentContext    from 'context/content/Context';

import {  Tooltip }         from 'react-tooltip';

import './styles.css';

const PanelRight = (props) => {
  const { isClosedRight, contentRight, player, changeIsClosedRight, changeIsPlaying, changePlayer, changeIdxPlayer, isAutoplay } = useContext(ContentContext);
  const [isClosedUp, setIsClosedUp] = useState(true);

  const togglePanel = () => {
    const panel = document.querySelector('#panel-right');
    
    if (panel.classList.contains('open')) {
      panel.classList.remove('open');
      panel.classList.add('close');
    } else {
      panel.classList.remove('close');
      panel.classList.add('open');
    }
  };

  const toggleButton = () => {
    const butClose = document.querySelector('#but-slide-panel');
    const panel = document.querySelector('#panel-right');

    if (panel.classList.contains('open')) {
      butClose.textContent = '>';
      butClose.dataset['tooltipContent'] = "Cerrar";
      butClose.classList.remove('close');
      butClose.classList.add('open');
    } else {
      butClose.textContent = '<';
      butClose.dataset['tooltipContent'] = "Abrir";
      butClose.classList.remove('open');
      butClose.classList.add('close');
    }
  };

  const toggleCard = () => {
    const cardFirst = document.querySelector('#panel-right .card-first .card-body');
    const cardSecond = document.querySelector('#panel-right .card-second');

    if (cardFirst.classList.contains('open')) {
      cardFirst.classList.remove('open');
      cardFirst.classList.add('close');

      cardSecond.classList.remove('close');
      cardSecond.classList.add('open');
      setIsClosedUp(false);
    } else {
      cardFirst.classList.remove('close');
      cardFirst.classList.add('open');

      cardSecond.classList.remove('open');
      cardSecond.classList.add('close');
      setIsClosedUp(true);
    }
  };

  const toggleLI = (e) => {
    const target = e.currentTarget;
    const siblings = target.parentElement.childNodes;

    siblings.forEach((s) => {
      s.classList.remove('act');
    })
    target.classList.toggle('act');
  };

  const chooseSong = (instruction) => {
    const playlist = [...contentRight.playlist];
    const chooseNewIdx = {
      next: (idx) => {
        return (idx + 1) % playlist.length;
      },
      prev: (idx) => {
        return (idx - 1 + playlist.length) % playlist.length;
      },
      random: () => {
        return Math.floor(Math.random() * playlist.length);
      }
    };

    let newSong = instruction.song;

    if (!newSong) {
      const newIdx = chooseNewIdx[instruction.go](player.idx || 0);
      
      newSong = {...playlist[newIdx], idx: newIdx};
    } else {
      newSong.idx = instruction.idx;
    }

    changePlayer(newSong);
  };
  
  return (
    <>
    {isClosedRight
      ? <Button 
          id="but-slide-panel"
          bg="primary"
          className="m-0 close"
          data-tooltip-id="tt-slide-panel"
          data-tooltip-content="Open"
          data-tooltip-place="left"
          onClick={() => {changeIsClosedRight(false); togglePanel(); toggleButton();}}
        >
          &lt;
        </Button>
      : <Button 
          id="but-slide-panel"
          bg="primary"
          className="m-0 open"
          data-tooltip-id="tt-slide-panel"
          data-tooltip-content="Close"
          data-tooltip-place="left"
          onClick={() => {changeIsClosedRight(true); togglePanel(); toggleButton();}}
        >
          &gt;
        </Button>
    }
    <Tooltip id="tt-slide-panel" />

    <section id="panel-right" className={isClosedRight? "close" : "open"}>
        <div className="but-close" onClick={() => {changeIsClosedRight(true); togglePanel(); toggleButton();}}>
          <FaRegWindowClose/>
        </div>
        {props.content}
        
        <Card className="mb-0 card-first">
          <Card.Header>
            <h1 title={contentRight.title}>
              {contentRight.title}
            </h1>
          </Card.Header>
          <Card.Body className='open'>
              {contentRight.body}
          </Card.Body>
        </Card>

        <Button 
          id="but-playlist"
          className='m-0'
          onClick={toggleCard}
        >
          <FaVolumeUp id="icon-abs"/>
          {isClosedUp
            ? <FaCaretUp/>
            : <FaCaretDown/>}
          Playlist
        </Button>

        <Card className="m-0 card-second close">
          <Card.Body>
            <ListGroup as="ol" numbered className="mb-2" variant="secondary">
              {contentRight.playlist.map((song, idx) => {
                const label = `${song.artist} - ${song.song}`;

                return (
                  <ListGroup.Item
                    action
                    className={song.artist === player.artist && song.song === player.song? "act" : ""}
                    variant="secondary"
                    key={label}
                    onClick={(e) => {toggleLI(e); chooseSong({song, idx})}}>
                    {label}
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
            
            <YouTube
              className="text-center"
              videoId={player.yt}
              title={`${player.artist} - ${player.song}`}
              onPlay={() => {changeIsPlaying(true)}}
              onPause={() => {changeIsPlaying(false)}}
              onEnd={() => {chooseSong({go: 'next'})}}
              //onEnd={() => {changeIdxPlayer((idxPlayer + 1) % contentRight.playlist.length)}}
              opts={{width: "100%", height: "auto", playerVars: {autoplay: isAutoplay}}}
            />
          </Card.Body>
        </Card>
    </section>
    </>
    
  );
}

export default PanelRight;