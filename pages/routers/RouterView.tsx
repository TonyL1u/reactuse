import { Route, Routes } from 'react-router-dom';
import { create } from './create';

const DefineRoute = create(({ key, name, element }) => <Route key={key} path={name} element={element} />);

export default () => {
    return <Routes>{DefineRoute}</Routes>;
};
