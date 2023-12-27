import { useState } from "react";
import Card from "./Card";

function Cards({ courses, category }) {
  const [likedCourses, setLikedCourses] = useState([]);

  let allCourses = [];
  // Here we've have take out all data from the Api to the array allCourse
  const getCourses = () => {
    if (category === "All" && courses) {
      Object.values(courses).forEach((courseCategory) => {
        courseCategory.forEach((course) => {
          allCourses.push(course);
        });
      });
      return allCourses;
    } else if (courses && courses[category]) {
      return courses[category];
    } else {
      return [];
    }
  };

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-4">
      {getCourses().map((course) => {
        return (
          <Card
            key={course.id}
            course={course}
            likedCourses={likedCourses}
            setLikedCourses={setLikedCourses}
          ></Card>
        );
      })}
    </div>
  );
}

export default Cards;
