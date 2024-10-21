const subjectsBySemester = {
    1: [
        { name: 'Calculus I', credits: 3 },
        { name: 'Digital Logic', credits: 3 },
        { name: 'Programming in C', credits: 3 },
        { name: 'Basic Electrical Engineering', credits: 3 },
        { name: 'Computer Workshop', credits: 1 },
        { name: 'Communication Technique', credits: 1 },
        { name: 'Electronics Devices & Circuits', credits: 3 }
    ],
    2: [
        { name: 'Algebra & Geometry', credits: 3 },
        { name: 'Applied Physics', credits: 3 },
        { name: 'Applied Chemistry', credits: 2 },
        { name: 'Basic Engineering Drawing', credits: 1 },
        { name: 'Object Oriented Programming in C++', credits: 3 },
        { name: 'Instrumentation', credits: 3 },
        { name: 'Data Structure & Algorithm', credits: 3 }
    ],
    3: [
        { name: 'Calculus II', credits: 3 },
        { name: 'Database Management System', credits: 3 },
        { name: 'Operating Systems', credits: 3 },
        { name: 'Microprocessor & Assembly Programming', credits: 3 },
        { name: 'Computer Graphics', credits: 3 },
        { name: 'Data Communication', credits: 3 }
    ],
    4: [
        { name: 'Applied Mathematics', credits: 3 },
        { name: 'Numerical Methods', credits: 2 },
        { name: 'Advanced Programming with Java', credits: 3 },
        { name: 'Theory of Computation', credits: 3 },
        { name: 'Computer Architecture', credits: 3 },
        { name: 'Research Fundamentals', credits: 2 }
    ],
    5: [
        { name: 'Probability & Statistics', credits: 3 },
        { name: 'Embedded Systems', credits: 3 },
        { name: 'Engineering Management', credits: 3 },
        { name: 'Artificial Intelligence', credits: 3 },
        { name: 'Digital Signal Analysis Processing', credits: 3 },
        { name: 'Software Engineering', credits: 3 }
    ],
    6: [
        { name: 'Image Processing & Pattern Recognition', credits: 3 },
        { name: 'Machine Learning', credits: 3 },
        { name: 'Compiler Design', credits: 2 },
        { name: 'Computer Networks', credits: 3 },
        { name: 'Simulation & Modeling', credits: 3 },
        { name: 'Project I', credits: 2 }
    ],
    7: [
        { name: 'Entrepreneurship & Professional Practice', credits: 2 },
        { name: 'Engineering Economics', credits: 3 },
        { name: 'Network & Cyber Security', credits: 3 },
        { name: 'Cloud Computing & Virtualization', credits: 3 },
        { name: 'Data Science & Analytics', credits: 3 },
        { name: 'Elective II', credits: 3 }
    ],
    8: [
        { name: 'Elective III', credits: 3 },
        { name: 'Internship', credits: 2 },
        { name: 'Project II', credits: 3 }
    ]
};

// Grade points based on average score
function getGradePoints(score) {
    if (score >= 90) return 4.0; // A
    else if (score >= 85) return 3.7; // A-
    else if (score >= 80) return 3.3; // B+
    else if (score >= 75) return 3.0; // B
    else if (score >= 70) return 2.7; // B-
    else if (score >= 65) return 2.3; // C+
    else if (score >= 60) return 2.0; // C
    else if (score >= 55) return 1.7; // D+
    else if (score >= 50) return 1.0; // D
    else return 0.0; // F
}

// Dynamically add subjects based on selected semester
document.getElementById('semester').addEventListener('change', function() {
    const semester = parseInt(this.value);
    const subjectsSection = document.getElementById('subjectsSection');
    subjectsSection.innerHTML = ''; // Clear previous subjects

    if (subjectsBySemester[semester]) {
        subjectsBySemester[semester].forEach((subject, index) => {
            const subjectLabel = document.createElement('label');
            subjectLabel.setAttribute('for', `subject${index + 1}`);
            subjectLabel.textContent = `${subject.name} (${subject.credits} credits):`;

            const subjectInput = document.createElement('input');
            subjectInput.setAttribute('type', 'number');
            subjectInput.setAttribute('id', `subject${index + 1}`);
            subjectInput.setAttribute('min', '0');
            subjectInput.setAttribute('max', '100');
            subjectInput.setAttribute('placeholder', `Enter score for ${subject.name}`);
            subjectInput.required = true;

            subjectsSection.appendChild(subjectLabel);
            subjectsSection.appendChild(subjectInput);
        });
    }
});

document.getElementById('evaluationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const studentName = document.getElementById('studentName').value;
    const rollNo = document.getElementById('rollNo').value;
    const semester = document.getElementById('semester').value;

    const subjectInputs = document.querySelectorAll('#subjectsSection input');
    let totalScore = 0;
    let totalCredits = 0;
    let totalGradePoints = 0;
    let passCount = 0;
    let failCount = 0;

    subjectInputs.forEach((input, index) => {
        const score = parseInt(input.value);
        const credits = subjectsBySemester[semester][index].credits;
        const gradePoints = getGradePoints(score);

        totalScore += score;
        totalCredits += credits;
        totalGradePoints += gradePoints * credits;

        if (score >= 45) {
            passCount++;
        } else {
            failCount++;
        }
    });

    const averageScore = totalScore / subjectInputs.length;
    const passFailRatio = `${passCount}:${failCount}`;
    const gpa = totalGradePoints / totalCredits;

    // Determine grade based on average score
    let grade = '';
    if (averageScore >= 90) {
        grade = 'A';
    } else if (averageScore >= 85) {
        grade = 'A-';
    } else if (averageScore >= 80) {
        grade = 'B+';
    } else if (averageScore >= 75) {
        grade = 'B';
    } else if (averageScore >= 70) {
        grade = 'B-';
    } else if (averageScore >= 65) {
        grade = 'C+';
    } else if (averageScore >= 60) {
        grade = 'C';
    } else if (averageScore >= 55) {
        grade = 'D+';
    } else if (averageScore >= 50) {
        grade = 'D';
    } else {
        grade = 'F';
    }

    // Display results
    document.getElementById('studentInfo').innerHTML = `Student: ${studentName} (Roll No: ${rollNo})`;
    document.getElementById('semesterInfo').innerHTML = `Semester: ${semester}`;
    document.getElementById('averageScore').innerHTML = `Average Score: ${averageScore.toFixed(2)}`;
    document.getElementById('gpa').innerHTML = `GPA: ${gpa.toFixed(2)}`;
    document.getElementById('grade').innerHTML = `Grade: ${grade}`;
    document.getElementById('passFail').innerHTML = `Status: ${failCount === 0 ? 'Pass' : 'Fail'}`;
    document.getElementById('passFailCount').innerHTML = `Passed Subjects: ${passCount}, Failed Subjects: ${failCount}`;
    document.getElementById('passFailRatio').innerHTML = `Pass/Fail Ratio: ${passFailRatio}`;

    document.getElementById('resultSection').classList.remove('hidden');
});
