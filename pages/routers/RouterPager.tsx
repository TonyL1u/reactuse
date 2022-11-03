import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { create } from './create';
import type { FC } from 'react';

const links = create(({ name }) => `/${name}`);

const PagerItem: FC<{ type: 'prev' | 'next'; path: string }> = ({ type, path }) => {
    const navigate = useNavigate();

    return path ? (
        <div className="tw-flex tw-flex-col tw-items-start tw-cursor-pointer" style={{ alignItems: type === 'prev' ? 'flex-start' : 'flex-end' }} onClick={() => navigate(path)}>
            {type === 'prev' ? 'Previous' : 'Next'}
            <span className=" tw-text-[#22c55e] tw-mt-1">{path.slice(1)}</span>
        </div>
    ) : null;
};

export default () => {
    const { pathname } = useLocation();
    const index = useMemo(() => links.indexOf(pathname), [pathname]);
    const prev = useMemo(() => links[index - 1], [index]);
    const next = useMemo(() => links[index + 1], [index]);

    return (
        <div className="pager-navigator tw-flex tw-justify-between tw-text-sm tw-pt-10 tw-pb-6 tw-px-[18px]" style={{ justifyContent: !prev ? 'flex-end' : !next ? 'flex-start' : '' }}>
            <PagerItem type="prev" path={prev} />
            <PagerItem type="next" path={next} />
        </div>
    );
};
