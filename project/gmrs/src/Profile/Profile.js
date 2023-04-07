import {React, useMemo} from 'react'
import { useData } from '../util/data'

export default function Profile() {
    const context = useData()

    return useMemo(()=>{
        return (
            <div id='profile'>
                Implement Profile at here
            </div>
        )
    },[context.user])
}
