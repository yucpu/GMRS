import {React, useMemo} from 'react'
import { useData } from '../util/data'

export default function Store() {
    const context = useData()

    return useMemo(()=>{
        return (
            <div id='store'>
                Implement Store at here
            </div>
        )
    },[context.user])
}
