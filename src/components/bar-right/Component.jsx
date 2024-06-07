import Social             from 'components/social/Component';

//import {  FaPlusCircle,
//          FaMinusCircle } from 'react-icons/fa';

import { //Button,
        Stack }           from 'react-bootstrap';

import './styles.css';

const BarRight = () => {
  // Map zoom
  /*<div className="stack-section text-center">
                <hr/>
                <Button variant="primary">
                  <FaPlusCircle/>
                </Button>
                <Button variant="primary">
                  <FaMinusCircle/>
                </Button>
            </div>*/

  return (
    <div className="stack-container right">
        <Stack gap={2} className="col-md-5 mx-auto stack-right" style={{justifyContent: "space-between"}}>
            <div className="stack-section text-center vh100">
              <Social/>
            </div>
        </Stack>
    </div>
  );
}

export default BarRight;