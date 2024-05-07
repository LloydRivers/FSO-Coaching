type Part = {
  name: string;
  exercises: number;
  id: number;
};

type CourseProps = {
  id: number;
  name: string;
  parts: Part[];
};

const Course = ({ course }: { course: CourseProps }) => {
  return (
    <div>
      <h1>{course.name}</h1>
      <ul>
        {course.parts.map((part) => (
          <li key={part.id}>
            {part.name} {part.exercises}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Course;
