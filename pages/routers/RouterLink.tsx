import { NavLink } from 'react-router-dom';
import { create } from './create';
import type { ReactElement } from 'react';
import type { Category } from './create';

const DefineMenu = create(({ key, name, category }) => {
    return {
        category,
        name,
        element: (
            <li key={key} className="menu-item">
                <NavLink to={name} style={({ isActive }) => (isActive ? { color: '#2b8844' } : {})}>
                    {name}
                </NavLink>
            </li>
        )
    };
});

export const Categories: Record<Category, ReactElement[]> = {
    browser: [],
    effect: [],
    elements: [],
    sensor: [],
    shared: [],
    state: [],
    utilities: []
};

for (const { category, element } of DefineMenu) {
    Categories[category].push(element);
}

export default () => {
    return (
        <>
            {Object.entries(Categories).map(([category, elements]) => {
                return (
                    <div key={category} className="tw-mt-3">
                        <div className="tw-h-8 tw-leading-8 tw-text-sm tw-text-gray-500 tw-capitalize">{category}</div>
                        <ul className="tw-list-none tw-space-y-2 tw-m-0 tw-p-0">{elements}</ul>
                    </div>
                );
            })}
        </>
    );
};
