import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { toast } from "react-toastify";

function Card({ course, setLikedCourses, likedCourses }) {
  let likedCourse = likedCourses;
  let setLikedCourse = setLikedCourses;

  function likeHandler() {
    if (likedCourse.includes(course.id)) {
      // Courses which are already Liked
      setLikedCourse((prev) => prev.filter((cid) => cid !== course.id));
      toast.warning("Liked-removed!");
    } else {
      // Course which are not liked
      // Then we have to insert in likedCourses
      if (likedCourse.length === 0) {
        // There is already nothing
        setLikedCourse([course.id]);
      } else {
        // there is some course already inside...then we've to push that & new also
        setLikedCourse((prev) => [...prev, course.id]);
      }
      toast.success("Liked Successfully!");
    }
  }
  return (
    <div className="w-[300px] bg-slate-900 bg-opacity-90 rounded-md overflow-hidden">
      <div className="relative ">
        {/* Check if 'course.img.url' exists before using it */}
        {course.image.url && <img src={course.image.url} alt="img" />}
        <div
          className="w-[40px] h-[40px] bg-white rounded-full absolute right-2 bottom-[-15px] 
        grid place-items-center"
        >
          <button onClick={likeHandler}>
            {!likedCourse.includes(course.id) ? (
              <FcLikePlaceholder fontSize="1.75rem" />
            ) : (
              <FcLike fontSize="1.75rem" />
            )}
          </button>
        </div>
      </div>

      <div className="p-4">
        <p className="text-white font-semibold text-lg leading-6">
          {course.title}
        </p>
        <p className="text-white mt-2 ">
          {course.description.length > 100
            ? course.description.substr(0, 100) + "..."
            : course.description}
        </p>
      </div>
    </div>
  );
}

export default Card;
