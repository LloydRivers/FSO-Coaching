type CoursePart = {
  name: string;
  exercises: number;
  id: number;
};

type Course = {
  name: string;
  id: number;
  parts: CoursePart[];
};

const Course = ({ courses }: { courses: Course[] }) => {
  const name = courses[0].name;

  return (
    <div>
      <h1>{name}</h1>
      {courses.map((course) => {
        return (
          <div key={course.id}>
            <h2>{course.name}</h2>
            <ul>
              {course.parts.map((part) => {
                return (
                  <li key={part.id}>
                    {part.name} {part.exercises}
                  </li>
                );
              })}
            </ul>
            <p>
              total of&nbsp;
              {course.parts.reduce((carry, part) => carry + part.exercises, 0)}
              &nbsp;exercises
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Course;
