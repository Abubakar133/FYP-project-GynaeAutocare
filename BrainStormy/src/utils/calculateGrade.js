const calculateGrade = score => {
  if (score === null || score === undefined || typeof score !== 'number') {
    return null;
  }

  const percentage = parseInt(score);

  let grade = null;
  let messages = [];

  if (percentage >= 97) {
    grade = 'A+';
    messages = [
      "“The future belongs to those who believe in the beauty of their dreams.” - Eleanor Roosevelt",
      "“Success is not final, failure is not fatal: It is the courage to continue that counts.” - Winston Churchill",
      "“Believe you can and you're halfway there.” - Theodore Roosevelt",
      "“The only limit to our realization of tomorrow will be our doubts of today.” - Franklin D. Roosevelt",
      "“The secret of getting ahead is getting started.” - Mark Twain",
    ];
  } else if (percentage >= 93 && percentage <= 96) {
    grade = 'A';
    messages = [
      "“Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.” - Albert Schweitzer",
      "“Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work. And the only way to do great work is to love what you do.” - Steve Jobs",
      "“Hardships often prepare ordinary people for an extraordinary destiny.” - C.S. Lewis",
      "“The only way to do great work is to love what you do.” - Steve Jobs",
      "“You are never too old to set another goal or to dream a new dream.” - C.S. Lewis",
    ];
  } else if (percentage >= 90 && percentage <= 92) {
    grade = 'A-';
    messages = [
      "“The future belongs to those who believe in the beauty of their dreams.” - Eleanor Roosevelt",
      "“You are never too old to set another goal or to dream a new dream.” - C.S. Lewis",
      "“Believe you can and you're halfway there.” - Theodore Roosevelt",
      "“The only limit to our realization of tomorrow will be our doubts of today.” - Franklin D. Roosevelt",
      "“The secret of getting ahead is getting started.” - Mark Twain",
    ];
  } else if (percentage >= 87 && percentage <= 89) {
    grade = 'B+';
    messages = [
      "“Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.” - Albert Schweitzer",
      "“Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work. And the only way to do great work is to love what you do.” - Steve Jobs",
      "“Hardships often prepare ordinary people for an extraordinary destiny.” - C.S. Lewis",
      "“The only way to do great work is to love what you do.” - Steve Jobs",
      "“You are never too old to set another goal or to dream a new dream.” - C.S. Lewis",
    ];
  } else if (percentage >= 83 && percentage <= 86) {
    grade = 'B';
    messages = [
      "“Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.” - Albert Schweitzer",
      "“Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work. And the only way to do great work is to love what you do.” - Steve Jobs",
      "“Hardships often prepare ordinary people for an extraordinary destiny.” - C.S. Lewis",
      "“The only way to do great work is to love what you do.” - Steve Jobs",
      "“You are never too old to set another goal or to dream a new dream.” - C.S. Lewis",
    ];
  } else if (percentage >= 80 && percentage <= 82) {
    grade = 'B-';
    messages = [
      "“The future belongs to those who believe in the beauty of their dreams.” - Eleanor Roosevelt",
      "“You are never too old to set another goal or to dream a new dream.” - C.S. Lewis",
      "“Believe you can and you're halfway there.” - Theodore Roosevelt",
      "“The only limit to our realization of tomorrow will be our doubts of today.” - Franklin D. Roosevelt",
      "“The secret of getting ahead is getting started.” - Mark Twain",
    ];
  } else if (percentage >= 77 && percentage <= 79) {
    grade = 'C+';
    messages = [
      "“Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.” - Albert Schweitzer",
      "“Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work. And the only way to do great work is to love what you do.” - Steve Jobs",
      "“Hardships often prepare ordinary people for an extraordinary destiny.” - C.S. Lewis",
      "“The only way to do great work is to love what you do.” - Steve Jobs",
      "“You are never too old to set another goal or to dream a new dream.” - C.S. Lewis",
    ];
  } else if (percentage >= 73 && percentage <= 76) {
    grade = 'C';
    messages = [
      "“The future belongs to those who believe in the beauty of their dreams.” - Eleanor Roosevelt",
      "“You are never too old to set another goal or to dream a new dream.” - C.S. Lewis",
      "“Believe you can and you're halfway there.” - Theodore Roosevelt",
      "“The only limit to our realization of tomorrow will be our doubts of today.” - Franklin D. Roosevelt",
      "“The secret of getting ahead is getting started.” - Mark Twain",
    ];
  } else if (percentage >= 70 && percentage <= 72) {
    grade = 'C-';
    messages = [
      "“Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.” - Albert Schweitzer",
      "“Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work. And the only way to do great work is to love what you do.” - Steve Jobs",
      "“Hardships often prepare ordinary people for an extraordinary destiny.” - C.S. Lewis",
      "“The only way to do great work is to love what you do.” - Steve Jobs",
      "“You are never too old to set another goal or to dream a new dream.” - C.S. Lewis",
    ];
  } else if (percentage >= 67 && percentage <= 69) {
    grade = 'D+';
    messages = [
      "“The future belongs to those who believe in the beauty of their dreams.” - Eleanor Roosevelt",
      "“You are never too old to set another goal or to dream a new dream.” - C.S. Lewis",
      "“Believe you can and you're halfway there.” - Theodore Roosevelt",
      "“The only limit to our realization of tomorrow will be our doubts of today.” - Franklin D. Roosevelt",
      "“The secret of getting ahead is getting started.” - Mark Twain",
    ];
  } else if (percentage >= 63 && percentage <= 66) {
    grade = 'D';
    messages = [
      "“Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.” - Albert Schweitzer",
      "“Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work. And the only way to do great work is to love what you do.” - Steve Jobs",
      "“Hardships often prepare ordinary people for an extraordinary destiny.” - C.S. Lewis",
      "“The only way to do great work is to love what you do.” - Steve Jobs",
      "“You are never too old to set another goal or to dream a new dream.” - C.S. Lewis",
    ];
  } else if (percentage >= 60 && percentage <= 62) {
    grade = 'D-';
    messages = [
      "“The future belongs to those who believe in the beauty of their dreams.” - Eleanor Roosevelt",
      "“You are never too old to set another goal or to dream a new dream.” - C.S. Lewis",
      "“Believe you can and you're halfway there.” - Theodore Roosevelt",
      "“The only limit to our realization of tomorrow will be our doubts of today.” - Franklin D. Roosevelt",
      "“The secret of getting ahead is getting started.” - Mark Twain",
    ];
  } else if (percentage < 60) {
    grade = 'F';
    messages = [
      "“Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.” - Albert Schweitzer",
      "“Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work. And the only way to do great work is to love what you do.” - Steve Jobs",
      "“Hardships often prepare ordinary people for an extraordinary destiny.” - C.S. Lewis",
      "“The only way to do great work is to love what you do.” - Steve Jobs",
      "“You are never too old to set another goal or to dream a new dream.” - C.S. Lewis",
    ];
  }

  return {
    grade,
    messages,
  };
};

export default calculateGrade;
