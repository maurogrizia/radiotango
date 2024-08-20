import { 	Stack } 			from 'react-bootstrap';

import 		Social 				from 'components/social/Component';
import		LanguageSelector	from 'components/languageSelector/Component';

import './styles.css';

const BarRight = () => {

  return (
    <div className="stack-container right">
        <Stack 
			gap={2} 
			className="col-md-5 mx-auto stack-right" 
			style={{justifyContent: "space-between"}}
		>
			<div className="stack-section text-center vh100">
				<LanguageSelector/>
			</div>
            <div className="stack-section text-center vh100">
              	<Social/>
            </div>
        </Stack>
    </div>
  );
}

export default BarRight;