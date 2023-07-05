import { About } from '@/components/Home/About'
import { Articles } from '@/components/Home/Articles'
import { Banner } from '@/components/Home/Banner'
import { Projects } from '@/components/Home/Projects'

export default function Home() {
    return (
        <>
            <Banner />
            <About />
            <Projects />
            <Articles />
        </>
    )
}
