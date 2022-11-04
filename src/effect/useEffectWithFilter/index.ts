import { useEffect, useState } from 'react';
import type { EffectCallback, DependencyList } from 'react';
import type { EventFilter } from '../../helper';

export function useEffectWithFilter(callback: EffectCallback, deps: DependencyList, eventFilter?: EventFilter) {}
