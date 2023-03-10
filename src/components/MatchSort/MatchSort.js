import React, { useEffect } from 'react';
import { matchSorter } from 'match-sorter'

const MatchSort = () => {

    useEffect(() => {
        const list = ['hi', 'hey', 'hello', 'sup', 'yo']
        alert(matchSorter(list, 'h')) // ['hello', 'hey', 'hi']
        matchSorter(list, 'y') // ['yo', 'hey']
        matchSorter(list, 'z') // []
    }, [])
    return (
        <div>

        </div>
    );
};

export default MatchSort;