import ExperienceCard from './ExperienceCard';
import ProjectCard from './ProjectsCard';
import EducationCard from './EducationCard';
import JourneyGame from './JourneyGame';

const RightSection = () => {
    return (
        <div className="right-section">
            <JourneyGame />
            <h2>Experience</h2>
            <ExperienceCard />
            <h2>Education</h2>
            <EducationCard />
            <h2>Projects</h2>
            <ProjectCard />
        </div>
    )
}

export default RightSection;