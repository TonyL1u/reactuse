import { Route, Routes } from 'react-router-dom';
import { create } from './create';
import HomePage from '../HomePage';

const DefineRoute = create(({ key, name, element }) => <Route key={key} path={name} element={element} />);

export default () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />}></Route>
            {DefineRoute}
        </Routes>
    );
};
