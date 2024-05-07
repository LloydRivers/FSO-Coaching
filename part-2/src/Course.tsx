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
  const total = course.parts.reduce((sum, part) => sum + part.exercises, 0);
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
      <p>
        <strong>total of {total} exercises</strong>
      </p>
    </div>
  );
};

export default Course;
