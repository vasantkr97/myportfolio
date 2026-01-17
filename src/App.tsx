import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import BlogList from './pages/BlogList'
import BlogPost from './pages/BlogPost'
import Socials from './pages/Socials'
import Uses from './pages/Uses'
import NotFound from './pages/NotFound'
import ProjectsList from './pages/ProjectsList'
import ProjectPage from './pages/ProjectPage'
import ComingSoon from './pages/ComingSoon'

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blogs" element={<BlogList />} />
            <Route path="/blogs/:slug" element={<BlogPost />} />
            <Route path="/projects" element={<ProjectsList />} />
            <Route path="/projects/:slug" element={<ProjectPage />} />
            <Route path="/socials" element={<Socials />} />
            <Route path="/uses" element={<Uses />} />
            <Route path="/coming-soon" element={<ComingSoon />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default App
