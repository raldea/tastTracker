import PropTypes from 'prop-types';
import Button from './Button';
import { useLocation } from "react-router-dom";

const Header = ({ title, onShowAddTask, showAddTaskValue }) => {
    const location = useLocation();

    return (
        <header className='header' >
            <h1>{title}</h1>

            {location.pathname === '/' && (
                <Button onClick={onShowAddTask} color={showAddTaskValue ? 'red': 'green'} text={showAddTaskValue ? 'close' : 'add'} />
            )}
        </header>
    );
};

Header.defaultProps = {
    title: 'Task Tracker'
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

export default Header;
