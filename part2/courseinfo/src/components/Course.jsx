import Header from './Header'
import Content from './Content'
import Total from './Total'

const Course = ({ course }) => {
    const total = course.parts.reduce((currentValue, part) => currentValue + part.exercises, 0)
    console.log(total)
    return (
        <div>
            <Header course={course} />
            <Content parts={course.parts} />
            <Total sum={total} />
        </div>
    )
}

export default Course