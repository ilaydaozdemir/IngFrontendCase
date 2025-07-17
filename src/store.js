// basit in-memory store
let employees = [
  { id: 1, firstName: 'Ahmet', lastName: 'Sourtimes', hireDate: '2022-09-23', dob: '1990-01-12', phone: '+90 532 111 11 11', email: 'ahmet@example.com', dept: 'Analytics', position: 'Junior' },
  { id: 2, firstName: 'Ayşe', lastName: 'Kara', hireDate: '2021-05-14', dob: '1988-03-22', phone: '+90 532 222 22 22', email: 'ayse@example.com', dept: 'Engineering', position: 'Senior' },
  { id: 3, firstName: 'Mehmet', lastName: 'Yıldız', hireDate: '2020-11-30', dob: '1992-07-08', phone: '+90 532 333 33 33', email: 'mehmet@example.com', dept: 'Sales', position: 'Manager' },
  { id: 4, firstName: 'Elif', lastName: 'Demir', hireDate: '2019-02-18', dob: '1995-12-15', phone: '+90 532 444 44 44', email: 'elif@example.com', dept: 'Analytics', position: 'Analyst' },
  { id: 5, firstName: 'Can', lastName: 'Aydın', hireDate: '2023-01-10', dob: '1998-09-05', phone: '+90 532 555 55 55', email: 'can@example.com', dept: 'Engineering', position: 'Intern' },
  { id: 6, firstName: 'Zeynep', lastName: 'Çelik', hireDate: '2022-03-12', dob: '1991-04-17', phone: '+90 532 666 66 66', email: 'zeynep@example.com', dept: 'HR', position: 'Specialist' },
  { id: 7, firstName: 'Burak', lastName: 'Şahin', hireDate: '2020-07-19', dob: '1987-11-23', phone: '+90 532 777 77 77', email: 'burak@example.com', dept: 'Finance', position: 'Accountant' },
  { id: 8, firstName: 'Derya', lastName: 'Polat', hireDate: '2018-12-01', dob: '1993-06-30', phone: '+90 532 888 88 88', email: 'derya@example.com', dept: 'Marketing', position: 'Coordinator' },
  { id: 9, firstName: 'Emre', lastName: 'Koç', hireDate: '2021-08-25', dob: '1990-10-10', phone: '+90 532 999 99 99', email: 'emre@example.com', dept: 'IT', position: 'Developer' },
  { id: 10, firstName: 'Fatma', lastName: 'Güneş', hireDate: '2017-05-05', dob: '1989-02-14', phone: '+90 532 101 01 01', email: 'fatma@example.com', dept: 'Support', position: 'Agent' },
  { id: 11, firstName: 'Hakan', lastName: 'Öztürk', hireDate: '2016-09-09', dob: '1985-08-19', phone: '+90 532 202 02 02', email: 'hakan@example.com', dept: 'Engineering', position: 'Lead' },
  { id: 12, firstName: 'İrem', lastName: 'Aksu', hireDate: '2019-11-11', dob: '1994-03-27', phone: '+90 532 303 03 03', email: 'irem@example.com', dept: 'Analytics', position: 'Analyst' },
  { id: 13, firstName: 'Kaan', lastName: 'Yılmaz', hireDate: '2020-02-20', dob: '1992-12-12', phone: '+90 532 404 04 04', email: 'kaan@example.com', dept: 'Sales', position: 'Executive' },
  { id: 14, firstName: 'Lale', lastName: 'Ersoy', hireDate: '2018-04-14', dob: '1996-07-21', phone: '+90 532 505 05 05', email: 'lale@example.com', dept: 'HR', position: 'Manager' },
  { id: 15, firstName: 'Mert', lastName: 'Kurt', hireDate: '2021-06-16', dob: '1993-09-09', phone: '+90 532 606 06 06', email: 'mert@example.com', dept: 'Finance', position: 'Analyst' },
  { id: 16, firstName: 'Nazan', lastName: 'Çetin', hireDate: '2017-08-18', dob: '1990-05-05', phone: '+90 532 707 07 07', email: 'nazan@example.com', dept: 'Marketing', position: 'Director' },
  { id: 17, firstName: 'Onur', lastName: 'Arslan', hireDate: '2019-10-20', dob: '1988-11-11', phone: '+90 532 808 08 08', email: 'onur@example.com', dept: 'IT', position: 'SysAdmin' },
  { id: 18, firstName: 'Pelin', lastName: 'Yavuz', hireDate: '2022-12-22', dob: '1997-01-01', phone: '+90 532 909 09 09', email: 'pelin@example.com', dept: 'Support', position: 'Agent' },
  { id: 19, firstName: 'Rıza', lastName: 'Kaya', hireDate: '2018-03-03', dob: '1986-06-06', phone: '+90 532 111 12 12', email: 'riza@example.com', dept: 'Engineering', position: 'Developer' },
  { id: 20, firstName: 'Seda', lastName: 'Uçar', hireDate: '2020-05-05', dob: '1995-02-02', phone: '+90 532 212 13 13', email: 'seda@example.com', dept: 'Analytics', position: 'Specialist' },
  { id: 21, firstName: 'Tuna', lastName: 'Bilgin', hireDate: '2017-07-07', dob: '1991-03-03', phone: '+90 532 313 14 14', email: 'tuna@example.com', dept: 'Sales', position: 'Manager' },
  { id: 22, firstName: 'Umut', lastName: 'Duman', hireDate: '2019-09-09', dob: '1992-04-04', phone: '+90 532 414 15 15', email: 'umut@example.com', dept: 'HR', position: 'Specialist' },
  { id: 23, firstName: 'Veli', lastName: 'Güler', hireDate: '2021-11-11', dob: '1989-05-05', phone: '+90 532 515 16 16', email: 'veli@example.com', dept: 'Finance', position: 'Accountant' },
  { id: 24, firstName: 'Yasemin', lastName: 'Öz', hireDate: '2018-01-01', dob: '1994-06-06', phone: '+90 532 616 17 17', email: 'yasemin@example.com', dept: 'Marketing', position: 'Coordinator' },
  { id: 25, firstName: 'Zeki', lastName: 'Baran', hireDate: '2020-03-03', dob: '1990-07-07', phone: '+90 532 717 18 18', email: 'zeki@example.com', dept: 'IT', position: 'Developer' },
  { id: 26, firstName: 'Aylin', lastName: 'Kurtuluş', hireDate: '2019-05-05', dob: '1993-08-08', phone: '+90 532 818 19 19', email: 'aylin@example.com', dept: 'Support', position: 'Agent' },
  { id: 27, firstName: 'Barış', lastName: 'Ergin', hireDate: '2017-09-09', dob: '1987-09-09', phone: '+90 532 919 20 20', email: 'baris@example.com', dept: 'Engineering', position: 'Lead' },
  { id: 28, firstName: 'Cansu', lastName: 'Özdemir', hireDate: '2021-02-02', dob: '1996-10-10', phone: '+90 532 121 21 21', email: 'cansu@example.com', dept: 'Analytics', position: 'Analyst' },
  { id: 29, firstName: 'Deniz', lastName: 'Kaya', hireDate: '2018-04-04', dob: '1992-11-11', phone: '+90 532 222 22 23', email: 'deniz@example.com', dept: 'Sales', position: 'Executive' },
  { id: 30, firstName: 'Ece', lastName: 'Gül', hireDate: '2020-06-06', dob: '1995-12-12', phone: '+90 532 323 23 24', email: 'ece@example.com', dept: 'HR', position: 'Manager' },
  { id: 31, firstName: 'Furkan', lastName: 'Acar', hireDate: '2019-08-08', dob: '1991-01-01', phone: '+90 532 424 24 25', email: 'furkan@example.com', dept: 'Finance', position: 'Analyst' },
  { id: 32, firstName: 'Gizem', lastName: 'Şimşek', hireDate: '2017-10-10', dob: '1994-02-02', phone: '+90 532 525 25 26', email: 'gizem@example.com', dept: 'Marketing', position: 'Director' },
  { id: 33, firstName: 'Halil', lastName: 'Kara', hireDate: '2021-12-12', dob: '1988-03-03', phone: '+90 532 626 26 27', email: 'halil@example.com', dept: 'IT', position: 'SysAdmin' },
  { id: 34, firstName: 'Işıl', lastName: 'Yıldırım', hireDate: '2018-02-02', dob: '1997-04-04', phone: '+90 532 727 27 28', email: 'isil@example.com', dept: 'Support', position: 'Agent' },
  { id: 35, firstName: 'Kemal', lastName: 'Çakır', hireDate: '2020-04-04', dob: '1990-05-05', phone: '+90 532 828 28 29', email: 'kemal@example.com', dept: 'Engineering', position: 'Developer' },
  { id: 36, firstName: 'Leyla', lastName: 'Öztürk', hireDate: '2019-06-06', dob: '1995-06-06', phone: '+90 532 929 29 30', email: 'leyla@example.com', dept: 'Analytics', position: 'Specialist' },
  { id: 37, firstName: 'Musa', lastName: 'Gök', hireDate: '2017-08-08', dob: '1991-07-07', phone: '+90 532 131 31 31', email: 'musa@example.com', dept: 'Sales', position: 'Manager' },
  { id: 38, firstName: 'Nisa', lastName: 'Kılıç', hireDate: '2019-10-10', dob: '1992-08-08', phone: '+90 532 232 32 32', email: 'nisa@example.com', dept: 'HR', position: 'Specialist' },
  { id: 39, firstName: 'Okan', lastName: 'Yavuz', hireDate: '2021-01-01', dob: '1989-09-09', phone: '+90 532 333 33 33', email: 'okan@example.com', dept: 'Finance', position: 'Accountant' },
  { id: 40, firstName: 'Pınar', lastName: 'Demir', hireDate: '2018-03-03', dob: '1994-10-10', phone: '+90 532 434 34 34', email: 'pinar@example.com', dept: 'Marketing', position: 'Coordinator' },
  { id: 41, firstName: 'Ramazan', lastName: 'Aydın', hireDate: '2020-05-05', dob: '1990-11-11', phone: '+90 532 535 35 35', email: 'ramazan@example.com', dept: 'IT', position: 'Developer' },
  { id: 42, firstName: 'Sibel', lastName: 'Güler', hireDate: '2019-07-07', dob: '1993-12-12', phone: '+90 532 636 36 36', email: 'sibel@example.com', dept: 'Support', position: 'Agent' },
  { id: 43, firstName: 'Tamer', lastName: 'Baran', hireDate: '2017-09-09', dob: '1987-01-01', phone: '+90 532 737 37 37', email: 'tamer@example.com', dept: 'Engineering', position: 'Lead' },
  { id: 44, firstName: 'Ufuk', lastName: 'Kurtuluş', hireDate: '2021-11-11', dob: '1996-02-02', phone: '+90 532 838 38 38', email: 'ufuk@example.com', dept: 'Analytics', position: 'Analyst' },
  { id: 45, firstName: 'Vildan', lastName: 'Ergin', hireDate: '2018-01-01', dob: '1992-03-03', phone: '+90 532 939 39 39', email: 'vildan@example.com', dept: 'Sales', position: 'Executive' },
  { id: 46, firstName: 'Yusuf', lastName: 'Özdemir', hireDate: '2020-03-03', dob: '1995-04-04', phone: '+90 532 141 41 41', email: 'yusuf@example.com', dept: 'HR', position: 'Manager' },
  { id: 47, firstName: 'Zara', lastName: 'Kaya', hireDate: '2019-05-05', dob: '1991-05-05', phone: '+90 532 242 42 42', email: 'zara@example.com', dept: 'Finance', position: 'Analyst' },
  { id: 48, firstName: 'Alp', lastName: 'Gül', hireDate: '2017-07-07', dob: '1994-06-06', phone: '+90 532 343 43 43', email: 'alp@example.com', dept: 'Marketing', position: 'Director' },
  { id: 49, firstName: 'Buse', lastName: 'Kara', hireDate: '2021-09-09', dob: '1988-07-07', phone: '+90 532 444 44 44', email: 'buse@example.com', dept: 'IT', position: 'SysAdmin' },
  { id: 50, firstName: 'Cem', lastName: 'Yıldırım', hireDate: '2018-11-11', dob: '1997-08-08', phone: '+90 532 545 45 45', email: 'cem@example.com', dept: 'Support', position: 'Agent' },
];

export function getEmployees() {
  // her seferinde yeni bir dizi döneriz ki Lit property değişikliği tetiklensin
  return [...employees];
}

export function addEmployee(data) {
  const id = Date.now();
  employees.push({ id, ...data });
}

export function updateEmployee(id, data) {
  employees = employees.map(emp =>
    emp.id === id ? { ...emp, ...data } : emp
  );
}

export function deleteEmployee(id) {
  employees = employees.filter(emp => emp.id !== id);
}

// --- Localization State ---
let lang = localStorage.getItem('lang') || 'en';

export function getLang() {
  return lang;
}

export function setLang(newLang) {
  lang = newLang;
  localStorage.setItem('lang', newLang);
  window.dispatchEvent(new CustomEvent('lang-changed', { detail: { lang: newLang } }));
}
  