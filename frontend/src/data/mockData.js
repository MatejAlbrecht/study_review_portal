export const courses = [
  {
    id: 1,
    name: "Introduction to Computer Science",
    code: "CS 101",
    department: "Computer Science",
    professor: "Dr. Sarah Chen",
    description:
      "A broad introduction to computer science covering algorithms, data structures, programming fundamentals, and computational thinking.",
    semester: "Fall 2025",
    credits: 3,
  },
  {
    id: 2,
    name: "Calculus I",
    code: "MATH 201",
    department: "Mathematics",
    professor: "Dr. James Miller",
    description:
      "Limits, derivatives, and integrals of single-variable functions. Applications to physics and engineering.",
    semester: "Fall 2025",
    credits: 4,
  },
  {
    id: 3,
    name: "Organic Chemistry",
    code: "CHEM 301",
    department: "Chemistry",
    professor: "Dr. Maria Gonzalez",
    description:
      "Structure, properties, and reactions of organic compounds. Laboratory techniques for synthesis and analysis.",
    semester: "Spring 2025",
    credits: 4,
  },
  {
    id: 4,
    name: "Modern American Literature",
    code: "ENG 215",
    department: "English",
    professor: "Prof. David Park",
    description:
      "Survey of American literature from the 20th century to the present, exploring themes of identity, culture, and social change.",
    semester: "Fall 2025",
    credits: 3,
  },
  {
    id: 5,
    name: "Data Structures and Algorithms",
    code: "CS 250",
    department: "Computer Science",
    professor: "Dr. Alan Torres",
    description:
      "In-depth study of data structures including trees, graphs, hash tables, and heaps. Algorithm design and analysis techniques.",
    semester: "Spring 2025",
    credits: 3,
  },
  {
    id: 6,
    name: "Introduction to Psychology",
    code: "PSY 100",
    department: "Psychology",
    professor: "Dr. Emily Watson",
    description:
      "Overview of psychological science including cognition, development, social behavior, and mental health.",
    semester: "Fall 2025",
    credits: 3,
  },
  {
    id: 7,
    name: "Microeconomics",
    code: "ECON 101",
    department: "Economics",
    professor: "Dr. Robert Kim",
    description:
      "Principles of microeconomics including supply and demand, market structures, and consumer behavior.",
    semester: "Spring 2025",
    credits: 3,
  },
  {
    id: 8,
    name: "Linear Algebra",
    code: "MATH 220",
    department: "Mathematics",
    professor: "Dr. Lisa Chang",
    description:
      "Vector spaces, linear transformations, matrices, determinants, eigenvalues, and applications.",
    semester: "Fall 2025",
    credits: 3,
  },
];

export const reviews = [
  {
    id: 1,
    courseId: 1,
    author: "Alex M.",
    rating: 5,
    difficulty: 2,
    wouldTakeAgain: true,
    date: "2025-12-15",
    comment:
      "Amazing intro course! Dr. Chen explains complex topics in a very approachable way. The projects are fun and the workload is manageable.",
    semester: "Fall 2025",
  },
  {
    id: 2,
    courseId: 1,
    author: "Jordan R.",
    rating: 4,
    difficulty: 3,
    wouldTakeAgain: true,
    date: "2025-12-10",
    comment:
      "Solid course. Learned a lot about programming fundamentals. Some of the later assignments were challenging but rewarding.",
    semester: "Fall 2025",
  },
  {
    id: 3,
    courseId: 1,
    author: "Sam K.",
    rating: 4,
    difficulty: 2,
    wouldTakeAgain: true,
    date: "2025-11-20",
    comment:
      "Great for beginners. The professor is patient and the TAs are very helpful during office hours.",
    semester: "Fall 2025",
  },
  {
    id: 4,
    courseId: 2,
    author: "Morgan T.",
    rating: 3,
    difficulty: 4,
    wouldTakeAgain: false,
    date: "2025-12-18",
    comment:
      "The material is tough but Dr. Miller is a decent lecturer. Make sure you stay on top of the homework or you'll fall behind fast.",
    semester: "Fall 2025",
  },
  {
    id: 5,
    courseId: 2,
    author: "Casey L.",
    rating: 4,
    difficulty: 4,
    wouldTakeAgain: true,
    date: "2025-12-12",
    comment:
      "Challenging but rewarding. The textbook is excellent and the practice problems really help. Attend every lecture!",
    semester: "Fall 2025",
  },
  {
    id: 6,
    courseId: 3,
    author: "Riley B.",
    rating: 2,
    difficulty: 5,
    wouldTakeAgain: false,
    date: "2025-06-01",
    comment:
      "Extremely hard class. The labs are time-consuming and the exams are brutal. Study groups are essential.",
    semester: "Spring 2025",
  },
  {
    id: 7,
    courseId: 3,
    author: "Taylor S.",
    rating: 3,
    difficulty: 5,
    wouldTakeAgain: false,
    date: "2025-05-20",
    comment:
      "Dr. Gonzalez knows the material well but the pace is very fast. Start studying early for exams.",
    semester: "Spring 2025",
  },
  {
    id: 8,
    courseId: 4,
    author: "Jamie P.",
    rating: 5,
    difficulty: 2,
    wouldTakeAgain: true,
    date: "2025-12-14",
    comment:
      "One of my favorite classes! Prof. Park leads engaging discussions and the reading list is fantastic.",
    semester: "Fall 2025",
  },
  {
    id: 9,
    courseId: 4,
    author: "Quinn D.",
    rating: 5,
    difficulty: 1,
    wouldTakeAgain: true,
    date: "2025-12-08",
    comment:
      "Easy A if you do the readings. The essays are interesting to write and the professor gives great feedback.",
    semester: "Fall 2025",
  },
  {
    id: 10,
    courseId: 5,
    author: "Avery H.",
    rating: 4,
    difficulty: 4,
    wouldTakeAgain: true,
    date: "2025-05-28",
    comment:
      "Tough but essential for any CS major. Dr. Torres is brilliant and the problem sets really prepare you for interviews.",
    semester: "Spring 2025",
  },
  {
    id: 11,
    courseId: 5,
    author: "Drew N.",
    rating: 3,
    difficulty: 5,
    wouldTakeAgain: true,
    date: "2025-05-15",
    comment:
      "Very challenging course. The algorithms section was particularly difficult. Make sure you have a strong math background.",
    semester: "Spring 2025",
  },
  {
    id: 12,
    courseId: 6,
    author: "Reese C.",
    rating: 5,
    difficulty: 1,
    wouldTakeAgain: true,
    date: "2025-12-16",
    comment:
      "Fascinating subject and Dr. Watson makes it even more interesting. Super easy workload too.",
    semester: "Fall 2025",
  },
  {
    id: 13,
    courseId: 6,
    author: "Skyler J.",
    rating: 4,
    difficulty: 2,
    wouldTakeAgain: true,
    date: "2025-12-05",
    comment:
      "Really enjoyed this course. The experiments we discussed in class were mind-blowing. Light reading load.",
    semester: "Fall 2025",
  },
  {
    id: 14,
    courseId: 7,
    author: "Dakota W.",
    rating: 3,
    difficulty: 3,
    wouldTakeAgain: true,
    date: "2025-05-22",
    comment:
      "Standard econ class. Nothing too exciting but Dr. Kim is a clear lecturer. The problem sets are straightforward.",
    semester: "Spring 2025",
  },
  {
    id: 15,
    courseId: 8,
    author: "Rowan F.",
    rating: 4,
    difficulty: 4,
    wouldTakeAgain: true,
    date: "2025-12-19",
    comment:
      "Great class if you like math. Dr. Chang explains proofs very well. The homework is time-consuming but helpful.",
    semester: "Fall 2025",
  },
  {
    id: 16,
    courseId: 8,
    author: "Parker G.",
    rating: 2,
    difficulty: 5,
    wouldTakeAgain: false,
    date: "2025-12-11",
    comment:
      "Really struggled with this one. The abstract concepts were hard to grasp without more concrete examples.",
    semester: "Fall 2025",
  },
];

export function getCourse(id) {
  return courses.find((c) => c.id === id);
}

export function getReviewsForCourse(courseId) {
  return reviews.filter((r) => r.courseId === courseId);
}

export function getAverageRating(courseId) {
  const courseReviews = getReviewsForCourse(courseId);
  if (courseReviews.length === 0) return 0;
  const sum = courseReviews.reduce((acc, r) => acc + r.rating, 0);
  return sum / courseReviews.length;
}

export function getAverageDifficulty(courseId) {
  const courseReviews = getReviewsForCourse(courseId);
  if (courseReviews.length === 0) return 0;
  const sum = courseReviews.reduce((acc, r) => acc + r.difficulty, 0);
  return sum / courseReviews.length;
}

export function getDepartments() {
  return [...new Set(courses.map((c) => c.department))].sort();
}
