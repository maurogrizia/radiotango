import { forwardRef } from 'react';

import { Form } from 'react-bootstrap';

import './styles.css';

const ToggleSwitch = forwardRef(({ id, label, className, ...rest }, ref) => {
	return (
		<Form.Check
			ref={ref}
			type="switch"
			id={id}
			label={label}
			className={`toggle-switch${className? ` ${className}` : ''}`}
			{...rest}
		/>
	);
});

export default ToggleSwitch;
