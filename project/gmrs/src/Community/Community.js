import {React, useMemo} from 'react'
import { useData } from '../util/data'


export default function Community() {
    const context = useData()

    return useMemo(()=>{
        return (
            <div id="community">
                Implement Community at here
            </div>
        )
    },[context.user])
}
